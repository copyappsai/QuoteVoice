import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Play, Pause, RotateCcw, Zap, Sliders, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const SpeedReadApp: React.FC = () => {
  const words = [
    'Knowledge', 'is', 'the', 'ultimate', 'leverage', 'in', 'the', 'modern',
    'world.', 'By', 'eliminating', 'eye', 'saccades', 'and', 'subvocalization,',
    'your', 'brain', 'processes', 'concepts', 'at', 'pure', 'optical', 'bandwidth.'
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(650);

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      const delay = (60 / wpm) * 1000;
      timer = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
      }, delay);
    }
    return () => clearInterval(timer);
  }, [isPlaying, wpm]);

  const togglePlay = () => {
    sounds.playTap();
    setIsPlaying(!isPlaying);
  };

  const currentWord = words[wordIndex];
  // Optimal recognition point (ORP) - highlight letter near middle in red
  const midIndex = Math.floor(currentWord.length / 2);
  const prefix = currentWord.slice(0, midIndex);
  const anchorLetter = currentWord[midIndex] || '';
  const suffix = currentWord.slice(midIndex + 1);

  return (
    <div className="w-full h-full bg-[#050505] text-white flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-rose-600 font-mono">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-500 font-bold">
              B
            </div>
            <div>
              <h1 className="text-xs font-bold uppercase tracking-widest text-neutral-300">SpeedRead</h1>
              <p className="text-[9px] text-neutral-500">Bionic RSVP Engine</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full text-rose-400">
            {wpm} WPM
          </span>
        </div>

        {/* Optical RSVP Viewport */}
        <div className="relative w-full aspect-[4/3] bg-neutral-950 border border-neutral-800 rounded-3xl my-6 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
          {/* Subtle Top & Bottom Red Optical Target Guides */}
          <div className="absolute top-6 w-1 h-3 bg-rose-500 rounded-full" />
          <div className="absolute bottom-6 w-1 h-3 bg-rose-500 rounded-full" />

          {/* Word display with Red ORP Anchor */}
          <div className="text-3xl font-bold tracking-normal flex items-center justify-center font-sans">
            <span className="text-neutral-400">{prefix}</span>
            <span className="text-rose-500 font-black">{anchorLetter}</span>
            <span className="text-white">{suffix}</span>
          </div>

          <p className="absolute bottom-2 text-[10px] text-neutral-600 font-mono">
            {wordIndex + 1} / {words.length} words
          </p>
        </div>

        {/* Speed Adjustment Slider */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3 my-2 font-sans">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5 font-bold">
            <span>Reading Velocity</span>
            <span className="text-rose-400 font-mono">{wpm} WPM (3.2x normal)</span>
          </div>
          <input 
            type="range" 
            min="300" 
            max="950" 
            step="50"
            value={wpm} 
            onChange={(e) => setWpm(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-2 pt-2 font-sans">
        <button
          onClick={togglePlay}
          className="w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-2xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
          <span>{isPlaying ? 'Pause RSVP Flash' : 'Start 650 WPM Stream'}</span>
        </button>

        <button
          onClick={() => {
            sounds.playTap();
            setWordIndex(0);
          }}
          className="w-full py-2.5 bg-neutral-900 text-neutral-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Rewind to Beginning</span>
        </button>
      </div>
    </div>
  );
};
