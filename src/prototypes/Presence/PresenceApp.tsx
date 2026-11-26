import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  RotateCcw, 
  Lock, 
  Share2, 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  ArrowUpRight,
  EyeOff,
  Clock,
  Compass
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const PresenceApp: React.FC = () => {
  const [screen, setScreen] = useState<'dashboard' | 'session' | 'summary'>('dashboard');
  const [secondsUntouched, setSecondsUntouched] = useState(10034); // ~2h 47m 14s
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  // Timer in session mode
  useEffect(() => {
    let interval: any = null;
    if (screen === 'session') {
      interval = setInterval(() => {
        setSecondsUntouched((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [screen]);

  // Hold-to-unlock friction mechanism
  useEffect(() => {
    let timer: any = null;
    if (isHolding) {
      timer = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            sounds.playSuccessDing();
            setScreen('summary');
            return 0;
          }
          return prev + 5;
        });
      }, 50);
    } else {
      setHoldProgress(0);
    }
    return () => clearInterval(timer);
  }, [isHolding]);

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return {
      hrs: String(hrs).padStart(2, '0'),
      mins: String(mins).padStart(2, '0'),
      secs: String(secs).padStart(2, '0'),
    };
  };

  const time = formatTime(secondsUntouched);

  const startPresence = () => {
    sounds.playTap();
    setScreen('session');
  };

  return (
    <div className="w-full h-full bg-[#000000] text-neutral-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-neutral-700 font-sans">
      
      {/* Subtle Apple OLED Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-neutral-800/20 rounded-full blur-[100px] pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* SCREEN 1: PRESENCE DASHBOARD (Apple Minimalist Aesthetic) */}
        {screen === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">PRESENCE</span>
                  <h1 className="text-xl font-extrabold text-white tracking-tight">Stillness</h1>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-xs font-semibold text-neutral-300">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>6 Day Streak</span>
                </div>
              </div>

              {/* Main Circular Untouched Counter */}
              <div className="bg-neutral-950/80 border border-neutral-850/60 rounded-3xl p-5 text-center relative overflow-hidden my-2 shadow-2xl backdrop-blur-xl">
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Phone Untouched Today</p>
                
                <div className="my-4 flex items-baseline justify-center gap-1.5">
                  <span className="text-5xl font-extrabold tracking-tighter text-white">4</span>
                  <span className="text-sm font-bold text-neutral-400 mr-2">h</span>
                  <span className="text-5xl font-extrabold tracking-tighter text-white">28</span>
                  <span className="text-sm font-bold text-neutral-400">m</span>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 px-3 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+1h 40m more presence than yesterday</span>
                </div>
              </div>

              {/* Life Reclaimed Section */}
              <div className="my-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">What You Reclaimed</span>
                  <span>Zero Doomscrolling</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-neutral-950/70 border border-neutral-900 rounded-2xl p-3">
                    <span className="text-base">📖</span>
                    <p className="text-xs font-bold text-white mt-1">42 Pages Read</p>
                    <p className="text-[10px] text-neutral-500">Instead of TikTok</p>
                  </div>
                  <div className="bg-neutral-950/70 border border-neutral-900 rounded-2xl p-3">
                    <span className="text-base">☕</span>
                    <p className="text-xs font-bold text-white mt-1">Deep Connection</p>
                    <p className="text-[10px] text-neutral-500">Uninterrupted presence</p>
                  </div>
                </div>

                <div className="bg-neutral-950/70 border border-neutral-900 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <EyeOff className="w-4 h-4 text-neutral-400" />
                    <div>
                      <p className="text-xs font-bold text-white">Dopamine Reset</p>
                      <p className="text-[10px] text-neutral-500">Cortisol dropped 24%</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">Optimal</span>
                </div>
              </div>
            </div>

            {/* Start Stillness Session Button */}
            <div className="pt-2">
              <button
                onClick={startPresence}
                className="w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
              >
                <Compass className="w-4 h-4" />
                <span>Begin Stillness (Flip to Unplug)</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 2: STANDBY / AMBIENT STILLNESS (OLED Luxury Watch Face) */}
        {screen === 'session' && (
          <motion.div
            key="session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between py-4 text-center select-none"
          >
            <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-widest px-2">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Phone Asleep
              </span>
              <span>Face Down Mode</span>
            </div>

            {/* Glowing Minimal Stopwatch Face */}
            <div className="my-auto">
              <p className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-2">
                UNTOUCHED TIME
              </p>
              
              <div className="text-5xl font-light tracking-tighter text-white font-mono flex items-center justify-center gap-1">
                <span>{time.hrs}</span>
                <span className="text-neutral-600 animate-pulse">:</span>
                <span>{time.mins}</span>
                <span className="text-neutral-600 animate-pulse">:</span>
                <span>{time.secs}</span>
              </div>

              {/* Breathing Zen Circle */}
              <div className="relative w-36 h-36 mx-auto my-8 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.4, 0.15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-neutral-200 rounded-full blur-xl"
                />
                <div className="w-28 h-28 rounded-full border border-neutral-800 flex items-center justify-center bg-neutral-950/60 backdrop-blur-md">
                  <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    Breathe
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 italic max-w-[220px] mx-auto">
                "Life is what happens while you are looking at your phone."
              </p>
            </div>

            {/* Friction Unlock Mechanism: Hold 2s to break silence */}
            <div className="pt-2 px-2">
              <button
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
                className="w-full relative overflow-hidden py-3.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-2xl text-xs font-bold transition-all cursor-pointer select-none active:scale-[0.98]"
              >
                {/* Hold Progress Fill */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-white/20 transition-all duration-75"
                  style={{ width: `${holdProgress}%` }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-neutral-400" />
                  {isHolding ? `Hold to Unlock (${Math.round(holdProgress)}%)` : 'Hold to End Stillness'}
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: LIFE RECLAIMED CERTIFICATE */}
        {screen === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="text-center my-2">
                <span className="text-3xl">✨</span>
                <h2 className="text-lg font-black text-white mt-1">Session Complete</h2>
                <p className="text-xs text-neutral-400">You reclaimed 2 hours 47 minutes today.</p>
              </div>

              {/* Shareable Card (Instagram Story Style) */}
              <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-5 my-3 shadow-2xl relative">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase tracking-widest mb-3">
                  <span>PRESENCE RECORD</span>
                  <span>TODAY</span>
                </div>

                <div className="text-center my-3">
                  <p className="text-4xl font-extrabold text-white tracking-tight">2h 47m</p>
                  <p className="text-xs text-neutral-400 mt-1 font-medium">Consecutive Real-World Life</p>
                </div>

                <div className="border-t border-neutral-850 pt-3 mt-3 space-y-1.5 text-xs text-neutral-300">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Social Apps Ignored:</span>
                    <span className="font-bold text-white">18 pickups prevented</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Mindfulness Gain:</span>
                    <span className="font-bold text-emerald-400">+94% Deep Calm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => sounds.playSuccessDing()}
                className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 rounded-2xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Presence to Stories</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setScreen('dashboard');
                }}
                className="w-full py-2.5 bg-neutral-900 text-neutral-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Dashboard</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
