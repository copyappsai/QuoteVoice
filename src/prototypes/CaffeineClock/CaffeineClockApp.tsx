import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Moon, TrendingDown, Clock, AlertTriangle, ShieldCheck, Plus, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const CaffeineClockApp: React.FC = () => {
  const [caffeineLevel, setCaffeineLevel] = useState(140); // mg in blood
  const [lastDoseTime, setLastDoseTime] = useState('11:30 AM');
  const [screen, setScreen] = useState<'dashboard' | 'timeline'>('dashboard');

  const addEspresso = () => {
    sounds.playTap();
    setCaffeineLevel((prev) => prev + 65);
  };

  return (
    <div className="w-full h-full bg-[#0a0806] text-amber-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-amber-700 font-sans">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-700/15 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {screen === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-600/20 border border-amber-600/30 flex items-center justify-center text-amber-500">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold text-white tracking-tight">CaffeineClock</h1>
                    <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Biohack Half-Life</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full text-xs font-bold text-amber-300">
                  <Moon className="w-3.5 h-3.5 text-purple-400" />
                  <span>Bedtime 11:00 PM</span>
                </div>
              </div>

              {/* Main Gauge */}
              <div className="bg-gradient-to-b from-amber-950/40 to-neutral-900/80 border border-amber-800/40 rounded-3xl p-5 text-center relative overflow-hidden my-2 shadow-2xl">
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">ACTIVE BLOOD CAFFEINE</p>
                <div className="my-3 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-black text-white tracking-tighter">{caffeineLevel}</span>
                  <span className="text-sm font-bold text-amber-400">mg</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-neutral-950/80 border border-neutral-800 px-3 py-1 rounded-full text-xs text-amber-300 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>5.5h Half-Life • Clears by 10:15 PM</span>
                </div>
              </div>

              {/* Cutoff Warning Card */}
              <div className="bg-neutral-900/90 border border-amber-900/50 rounded-2xl p-3 my-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
                  <span className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Caffeine Cutoff Window</span>
                  <span className="text-white font-mono">02:30 PM</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Consuming coffee after 2:30 PM reduces deep Stage 4 restorative sleep by 28%. Adenosine receptors blocked.
                </p>
              </div>

              {/* Quick Log Presets */}
              <div className="my-2 space-y-1.5">
                <p className="text-xs font-bold text-slate-300">Quick Log Beverage:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={addEspresso}
                    className="bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">Double Espresso</p>
                      <p className="text-[10px] text-neutral-400">+65mg</p>
                    </div>
                    <Plus className="w-4 h-4 text-amber-400" />
                  </button>

                  <button
                    onClick={() => {
                      sounds.playTap();
                      setCaffeineLevel((prev) => prev + 35);
                    }}
                    className="bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">Matcha Green Tea</p>
                      <p className="text-[10px] text-neutral-400">+35mg</p>
                    </div>
                    <Plus className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playSuccessDing();
                setScreen('timeline');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 text-white rounded-2xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Moon className="w-4 h-4" />
              <span>Simulate Tonight's Sleep Quality 💤</span>
            </button>
          </motion.div>
        )}

        {screen === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="text-center my-2">
                <span className="text-3xl">☕</span>
                <h2 className="text-lg font-black text-white mt-1">Adenosine Curve Safe</h2>
                <p className="text-xs text-neutral-400">At 11:00 PM, only 14mg caffeine remains in blood.</p>
              </div>

              <div className="bg-neutral-900/90 border border-amber-900/40 rounded-3xl p-4 my-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span>Deep Sleep Readiness</span>
                  <span className="text-emerald-400">96% Optimal</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-950 rounded-full overflow-hidden">
                  <div className="w-[96%] h-full bg-emerald-500 rounded-full" />
                </div>
                <p className="text-[11px] text-neutral-300 pt-1">
                  You stopped caffeine intake early enough. Zero insomnia or nocturnal heart racing predicted.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playTap();
                setScreen('dashboard');
              }}
              className="w-full py-3 bg-neutral-800 text-neutral-300 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Caffeine Radar</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
