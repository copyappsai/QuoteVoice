import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT_MP4 = path.resolve(process.cwd(), 'QuoteVoice_Demo.mp4');
const FRAMES_DIR = path.resolve(process.cwd(), 'temp_frames');

async function record() {
  console.log('🎬 Starting QuoteVoice MP4 Recording...');

  if (fs.existsSync(FRAMES_DIR)) {
    fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--window-size=1920,1080',
      '--disable-web-security',
      '--allow-running-insecure-content',
      '--autoplay-policy=no-user-gesture-required',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:5173/?clean=true ...');
  await page.goto('http://localhost:5173/?clean=true', { waitUntil: 'networkidle0' });

  const client = await page.target().createCDPSession();

  let frameCount = 0;
  client.on('Page.screencastFrame', async ({ data, sessionId }) => {
    try {
      const buffer = Buffer.from(data, 'base64');
      const filename = path.join(FRAMES_DIR, `frame_${String(frameCount).padStart(5, '0')}.png`);
      fs.writeFileSync(filename, buffer);
      frameCount++;
      await client.send('Page.screencastFrameAck', { sessionId });
    } catch (e) {
      // ignore frame ack error
    }
  });

  console.log('🎥 Recording screencast frames at 30 fps...');
  await client.send('Page.startScreencast', {
    format: 'png',
    everyNthFrame: 1,
    maxWidth: 1920,
    maxHeight: 1080,
  });

  // Record for 15.5 seconds to capture the complete flow
  const durationMs = 15500;
  const startTime = Date.now();
  while (Date.now() - startTime < durationMs) {
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`⏹️ Stopping screencast... Captured ${frameCount} frames.`);
  await client.send('Page.stopScreencast');
  await browser.close();

  if (frameCount === 0) {
    throw new Error('No frames were captured!');
  }

  // Calculate actual frame rate from captured frames over duration
  const actualFps = Math.max(15, Math.round(frameCount / (durationMs / 1000)));
  console.log(`Rendering MP4 at ${actualFps} FPS via ffmpeg...`);

  const ffmpegCmd = `/opt/homebrew/bin/ffmpeg -y -framerate ${actualFps} -i "${FRAMES_DIR}/frame_%05d.png" -c:v libx264 -profile:v high -level 4.2 -pix_fmt yuv420p -crf 18 -preset fast -movflags +faststart "${OUTPUT_MP4}"`;

  execSync(ffmpegCmd, { stdio: 'inherit' });

  // Cleanup temp frames
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });

  const stats = fs.statSync(OUTPUT_MP4);
  console.log(`✅ Success! Video saved to: ${OUTPUT_MP4} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
}

record().catch((err) => {
  console.error('Recording failed:', err);
  process.exit(1);
});
