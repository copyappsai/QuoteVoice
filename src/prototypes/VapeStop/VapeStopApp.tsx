import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, 
  Sparkles, 
  Flame, 
  AlertCircle, 
  TrendingUp, 
  Heart, 
  Activity, 
  RotateCcw, 
  Share2, 
  ShieldCheck, 
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const VapeStopApp: React.FC = () => {
  const [screen, setScreen] = useState<'dashboard' | 'craving_sos' | 'milestone'>('dashboard');
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [cravingTimer, setCravingTimer] = useState(60);
  const [cravingsDefeated, setCravingsDefeated] = useState(24);

  // 4-7-8 Breathing simulation in SOS mode
  useEffect(() => {
    let interval: any = null;
    if (screen === 'craving_sos') {
      interval = setInterval(() => {
        setCravingTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            sounds.playSuccessDing();
            setScreen('milestone');
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [screen]);

  // Breathing cycle animation text
  useEffect(() => {
    let t: any = null;
    if (screen === 'craving_sos') {
      const cycle = () => {
        setBreathPhase('Inhale');
        t = setTimeout(() => {
          setBreathPhase('Hold');
          t = setTimeout(() => {
            setBreathPhase('Exhale');
            t = setTimeout(cycle, 5000);
          }, 4000);
        }, 3000);
      };
      cycle();
    }
    return () => clearTimeout(t);
  }, [screen]);

  const startSos = () => {
    sounds.playAlert();
    setCravingTimer(60);
    setScreen('craving_sos');
  };

  const finishCraving = () => {
    sounds.playLevelUp();
    setCravingsDefeated((prev) => prev + 1);
    setScreen('milestone');
  };

  return (
    <div className="w-full h-full bg-[#070d14] text-slate-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-cyan-500 font-sans">
      
      {/* Background ambient cyan/mint glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-4 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* SCREEN 1: VAPE FREEDOM DASHBOARD */}
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
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold tracking-tight">VapeStop</h1>
                    <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Nicotine Freedom</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full text-xs font-bold text-amber-400">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>14 Days Clean</span>
                </div>
              </div>

              {/* Main Progress Ring Card */}
              <div className="bg-gradient-to-b from-cyan-950/40 to-neutral-900/80 border border-cyan-800/40 rounded-3xl p-4 text-center relative overflow-hidden my-2 shadow-xl">
                <p className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">LUNG OXYGEN RESTORATION</p>
                
                <div className="relative w-32 h-32 mx-auto my-2 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" className="stroke-neutral-800" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="42" 
                      className="stroke-cyan-400" 
                      strokeWidth="8" 
                      strokeDasharray="264" 
                      strokeDashoffset="44" 
                      strokeLinecap="round" 
                      fill="transparent" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white">84%</span>
                    <span className="text-[10px] text-cyan-300 font-bold uppercase">Healed</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Resting heart rate down -9 bpm</span>
                </div>
              </div>

              {/* Impact Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 my-2">
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3">
                  <span className="text-xs text-neutral-400 font-semibold">💨 Puffs Avoided</span>
                  <p className="text-lg font-black text-white mt-0.5">1,850</p>
                  <p className="text-[10px] text-cyan-400 font-medium">~6 GeekBars saved</p>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3">
                  <span className="text-xs text-neutral-400 font-semibold">💰 Money Saved</span>
                  <p className="text-lg font-black text-emerald-400 mt-0.5">$118.50</p>
                  <p className="text-[10px] text-neutral-400 font-medium">In your pocket</p>
                </div>
              </div>

              {/* Nicotine Withdrawal Status Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Peak Withdrawal Defeated</p>
                    <p className="text-[10px] text-neutral-400">{cravingsDefeated} cravings resisted successfully</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full">
                  Safe
                </span>
              </div>
            </div>

            {/* Craving Panic SOS Button */}
            <div className="pt-2">
              <button
                onClick={startSos}
                className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <AlertCircle className="w-4 h-4 animate-bounce" />
                <span>Craving SOS (Fight the Urge) 🚨</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 2: 60-SECOND CRAVING SOS & 4-7-8 BREATHING */}
        {screen === 'craving_sos' && (
          <motion.div
            key="craving_sos"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col justify-between py-2 text-center"
          >
            <div>
              <div className="flex items-center justify-between text-neutral-400 text-xs px-1">
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  Urge Surfing Active
                </span>
                <span className="font-mono text-white bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full">
                  {cravingTimer}s left
                </span>
              </div>

              {/* Breathing Orb */}
              <div className="relative w-44 h-44 mx-auto my-6 flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: breathPhase === 'Inhale' ? 1.35 : breathPhase === 'Hold' ? 1.35 : 0.9,
                    opacity: breathPhase === 'Hold' ? 0.6 : 0.3
                  }}
                  transition={{ duration: breathPhase === 'Hold' ? 0.2 : 3.5, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-cyan-400 rounded-full blur-2xl"
                />
                <div className="w-32 h-32 rounded-full border-2 border-cyan-400/50 bg-cyan-950/80 flex flex-col items-center justify-center shadow-2xl relative z-10">
                  <Wind className="w-8 h-8 text-cyan-300" />
                  <span className="text-sm font-black text-white mt-1 uppercase tracking-wider">{breathPhase}</span>
                </div>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 my-2 text-left">
                <p className="text-xs font-bold text-slate-200">The 90-Second Rule:</p>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  Nicotine cravings spike rapidly, but physically subside after 90 seconds. Ride the wave; your lungs are healing right now.
                </p>
              </div>
            </div>

            {/* Defeat Craving CTA */}
            <div className="space-y-2 pt-2">
              <button
                onClick={finishCraving}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>I Beat the Craving (+50 Willpower) 🌿</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setScreen('dashboard');
                }}
                className="w-full py-2 text-neutral-400 text-xs font-semibold"
              >
                Cancel SOS
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: HEALTH MILESTONE CERTIFICATE */}
        {screen === 'milestone' && (
          <motion.div
            key="milestone"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between text-center"
          >
            <div>
              <div className="text-4xl my-2">🫁</div>
              <h2 className="text-lg font-black text-white">Craving Defeated!</h2>
              <p className="text-xs text-neutral-400">Total cravings beaten: <strong className="text-cyan-400">{cravingsDefeated}</strong></p>

              {/* Milestone Card */}
              <div className="bg-gradient-to-br from-cyan-950/60 to-neutral-950 border border-cyan-700/40 rounded-3xl p-4 my-3 text-left">
                <div className="flex items-center justify-between text-[10px] text-cyan-300 font-bold uppercase tracking-wider mb-2">
                  <span>HEALTH MILESTONE</span>
                  <span>DAY 14</span>
                </div>

                <h3 className="text-sm font-black text-white">Bronchial Cilia Regrowth</h3>
                <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">
                  Heavy metal vape aerosols have cleared from your airways. Lung cilia have begun cleaning mucus naturally.
                </p>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-neutral-800">
                  <div>
                    <span className="text-[10px] text-neutral-400">Total Money Saved</span>
                    <p className="text-sm font-black text-emerald-400">$118.50</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400">Puffs Resisted</span>
                    <p className="text-sm font-black text-cyan-400">1,850 Puffs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => sounds.playSuccessDing()}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 text-neutral-950 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Victory to Instagram Story</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setScreen('dashboard');
                }}
                className="w-full py-2.5 bg-neutral-900 text-neutral-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
