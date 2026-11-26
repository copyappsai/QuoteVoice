import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldAlert, 
  Volume2, 
  Sparkles, 
  Check, 
  RotateCcw,
  Copy,
  Car,
  FileCheck,
  TrendingDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

export const FairMechanicApp: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'recording' | 'processing' | 'ready'>('home');
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const fullTranscript = "Mechanic says my front brake rotors are warped and wants 650 for parts plus 750 labor. Total is 1400 dollars. Is this a rip-off?";
  const words = fullTranscript.split(' ');

  useEffect(() => {
    if (screen !== 'recording') return;

    let wordIdx = 0;
    const intervalTime = 1900 / words.length;

    const timer = setInterval(() => {
      wordIdx++;
      setDisplayedWords(words.slice(0, wordIdx));
      if (wordIdx % 4 === 0) sounds.playTap();

      if (wordIdx >= words.length) {
        clearInterval(timer);
        setTimeout(() => {
          setScreen('processing');
          sounds.playAiProcessing();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'processing') return;

    const start = Date.now();
    const duration = 1200;

    const pTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(pTimer);
        setTimeout(() => setScreen('ready'), 120);
      }
    }, 40);

    return () => clearInterval(pTimer);
  }, [screen]);

  const handleCopyScript = () => {
    sounds.playSuccessDing();
    setCopiedScript(true);
    setShowToast(true);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.72 }, colors: ['#f59e0b', '#10b981', '#3b82f6'] });
    } catch {}

    setTimeout(() => setShowToast(false), 3500);
  };

  const waveHeights = [20, 50, 90, 60, 100, 80, 45, 90, 85, 70, 95, 55, 75, 85, 50, 80, 65, 40, 70, 45];

  return (
    <div className="flex flex-col h-full justify-between px-4 pb-2 relative">
      {/* SCREEN 1: HOME */}
      {screen === 'home' && (
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col h-full justify-between"
        >
          <div className="space-y-3 pt-1">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  FairMechanic AI
                </span>
                <h1 className="text-lg font-extrabold text-slate-900 mt-1">Car Repair Auditor</h1>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                <Car className="w-4 h-4 text-amber-700" />
              </div>
            </div>

            {/* Vehicle Profile Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 p-4 text-white shadow-lg shadow-amber-600/25">
              <div className="flex items-center justify-between text-xs text-amber-100 font-medium">
                <span>Active Vehicle</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">2021 Ford F-150</span>
              </div>

              <div className="mt-2">
                <div className="text-xl font-extrabold tracking-tight">Front Rotors & Pads Quote</div>
                <p className="text-[11px] text-amber-100 mt-0.5">Shop quoted: <strong className="text-white font-mono text-sm">$1,400.00</strong></p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-amber-100">
                <span className="flex items-center gap-1 text-yellow-200 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" /> High Quote Detected
                </span>
                <span className="font-bold text-white">Tap to Audit</span>
              </div>
            </div>

            {/* Community Savings Stats */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-xs font-bold text-slate-800">Recent Quote Audits Near You</h3>
              {[
                { job: 'Alternator Replacement (2018 Honda Civic)', shopPrice: '$890', fairPrice: '$510', saved: 'Saved $380' },
                { job: 'Synthetic Oil & Cabin Filter (Toyota RAV4)', shopPrice: '$240', fairPrice: '$95', saved: 'Saved $145' },
                { job: 'AC Compressor Clutch (Chevy Silverado)', shopPrice: '$1,650', fairPrice: '$1,100', saved: 'Saved $550' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.job}</p>
                    <p className="text-[9.5px] text-slate-400">Shop: {item.shopPrice} • Fair: {item.fairPrice}</p>
                  </div>
                  <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.saved}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Dock */}
          <div className="pb-1 pt-2 flex flex-col items-center shrink-0">
            <div className="mb-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10.5px] font-medium shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Speak mechanic quote or record noise</span>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 rounded-full bg-amber-500/20 animate-ping opacity-75 pointer-events-none" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  sounds.playMicStart();
                  setScreen('recording');
                }}
                className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/40 border-2 border-white/40 cursor-pointer"
              >
                <Wrench className="w-6 h-6 text-white drop-shadow" />
              </motion.button>
            </div>

            <p className="mt-2 text-xs font-bold text-slate-900">Hold to Audit Mechanic Quote</p>
            <p className="text-[9.5px] text-slate-400">"Mechanic wants 650 parts plus 750 labor..."</p>
          </div>
        </motion.div>
      )}

      {/* SCREEN 2: RECORDING & AI AUDITING */}
      {(screen === 'recording' || screen === 'processing') && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col h-full justify-between pt-1"
        >
          <div className="flex items-center justify-between">
            <button onClick={() => setScreen('home')} className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {screen === 'recording' ? 'Listening to Quote...' : 'Auditing Parts & Labor...'}
            </span>
            <button onClick={() => setScreen('ready')} className="text-xs font-bold text-amber-700">Skip &gt;</button>
          </div>

          <div className="my-auto space-y-3">
            {screen === 'recording' ? (
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-2.5 text-slate-500 text-[11px] font-medium">
                    <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                    <span>Quote Audio Stream • 44.1 kHz</span>
                  </div>
                  <div className="h-16 flex items-center justify-center gap-[3.5px] px-1 overflow-hidden">
                    {waveHeights.map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [`${h * 0.2}%`, `${h}%`, `${h * 0.35}%`] }}
                        transition={{ duration: 0.5 + (i % 5) * 0.08, repeat: Infinity, repeatType: 'reverse' }}
                        className="w-[4px] rounded-full bg-gradient-to-t from-amber-600 to-orange-400"
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-amber-100 shadow-sm min-h-[125px]">
                  <div className="flex justify-between text-[9.5px] font-bold text-amber-700 mb-1 border-b border-slate-100 pb-1">
                    <span>LIVE MECHANIC QUOTE TRANSCRIPT</span>
                    <span className="text-slate-400">0:02</span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed min-h-[55px]">
                    {displayedWords.map((w, i) => (
                      <span key={i} className="inline-block mr-1 text-slate-800">{w}</span>
                    ))}
                    <span className="inline-block w-1.5 h-3.5 bg-amber-600 animate-pulse align-middle" />
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-3 text-white shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
                      <span className="text-xs font-bold">Cross-checking 12,000 regional repair shops...</span>
                    </div>
                    <span className="text-xs font-mono font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-1.5 text-xs">
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase">OEM Database Benchmark</p>
                  <div className="flex justify-between p-1.5 rounded bg-amber-50 text-slate-800">
                    <span>Motorcraft OEM Rotors & Ceramic Pads:</span>
                    <span className="font-bold font-mono">$240.00 (Fair)</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-amber-50 text-slate-800">
                    <span>Labor (Standard 2.2 book hours @ $140/hr):</span>
                    <span className="font-bold font-mono">$308.00 (Fair)</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-red-50 text-red-800 font-bold">
                    <span>Shop Markup vs Fair Market:</span>
                    <span className="font-mono text-red-600">+$548 Overcharge</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center pb-1 text-[10px] text-slate-400">
            ASE Certified Repair Database • Ford F-150
          </div>
        </motion.div>
      )}

      {/* SCREEN 3: VERDICT CARD & NEGOTIATION SCRIPT */}
      {screen === 'ready' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col h-full justify-between pt-1 relative"
        >
          <div className="flex items-center justify-between pb-1">
            <button onClick={() => setScreen('home')} className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <span className="text-xs font-bold text-slate-800 font-mono">Audit #FM-8821</span>
            <button onClick={() => setScreen('home')} className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Verdict Box */}
          <div className="bg-white rounded-2xl border border-red-200 p-3 shadow-md space-y-2">
            <div className="flex items-start justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-red-600">Overcharge Detected</h3>
                  <p className="text-[9.5px] text-slate-500">2021 Ford F-150 Front Brakes</p>
                </div>
              </div>
              <span className="text-xs font-mono font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                +$480.00 Over
              </span>
            </div>

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-1.5 text-center text-xs">
              <div className="bg-red-50 p-2 rounded-xl border border-red-100">
                <p className="text-[9px] uppercase font-bold text-red-700">Shop Quote</p>
                <p className="text-base font-extrabold text-red-600 font-mono">$1,400.00</p>
                <p className="text-[9px] text-red-500 mt-0.5">High parts & labor markups</p>
              </div>
              <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                <p className="text-[9px] uppercase font-bold text-emerald-700">Fair Price</p>
                <p className="text-base font-extrabold text-emerald-700 font-mono">$850 - $920</p>
                <p className="text-[9px] text-emerald-600 mt-0.5">Based on 12 local shops</p>
              </div>
            </div>

            {/* Script preview */}
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-slate-700 text-[10px] space-y-1">
              <p className="font-bold text-slate-900 flex items-center gap-1">
                <FileCheck className="w-3 h-3 text-blue-600" /> What to tell your mechanic:
              </p>
              <p className="italic bg-white p-1.5 rounded border border-slate-200 text-slate-600">
                "I checked standard book labor time for the F-150 rotors (2.2 hrs) and OEM parts cost ($240). $1,400 seems about $500 high. Can you match $880 or should I take it elsewhere?"
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-1.5 shrink-0">
            <button
              onClick={handleCopyScript}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedScript ? 'Script Copied to Clipboard!' : 'Copy Mechanic Negotiation Script'}</span>
            </button>
            <button
              onClick={() => sounds.playTap()}
              className="w-full py-2 px-3 rounded-xl bg-white text-slate-800 font-bold text-xs border border-slate-300 flex items-center justify-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              <span>Find 3 Certified Fair Shops Nearby</span>
            </button>
          </div>

          {/* Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-24 left-2 right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-xl border border-amber-500/40 flex items-center gap-2.5 z-50"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Script Copied!</h4>
                  <p className="text-[10px] text-amber-300">Ready to text or read to your service advisor</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
