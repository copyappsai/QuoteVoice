import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Compass, Wind, ShieldCheck, Heart, AlertCircle, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const FlightPulseApp: React.FC = () => {
  const [screen, setScreen] = useState<'radar' | 'reassurance'>('radar');
  const [flightNo, setFlightNo] = useState('LH 410');

  const checkTurbulence = () => {
    sounds.playTap();
    setScreen('reassurance');
  };

  return (
    <div className="w-full h-full bg-[#060b14] text-sky-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-sky-600 font-sans">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {screen === 'radar' && (
          <motion.div
            key="radar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold text-white tracking-tight">FlightPulse</h1>
                    <p className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">Aviation Calm Co-Pilot</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-sky-300 bg-sky-950/70 border border-sky-800/40 px-2.5 py-0.5 rounded-full">
                  FL370 • 37,000 FT
                </span>
              </div>

              {/* Avionics Horizon Simulation */}
              <div className="bg-gradient-to-b from-sky-950/40 to-neutral-900 border border-sky-800/40 rounded-3xl p-5 text-center relative overflow-hidden my-3 shadow-xl">
                <p className="text-[10px] font-bold text-sky-300 uppercase tracking-widest">LIVE ATMOSPHERIC STABILITY</p>
                <div className="my-3 flex items-center justify-center gap-3">
                  <Plane className="w-8 h-8 text-sky-400 rotate-12 transition-transform" />
                  <span className="text-2xl font-black text-white">Smooth Skies Ahead</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-neutral-950/80 border border-sky-900 px-3 py-1 rounded-full text-xs text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Turbulence Risk: 0.2 / 10 (Negligible)</span>
                </div>
              </div>

              {/* 30-Minute Forward Forecast */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 my-2 space-y-2">
                <p className="text-xs font-bold text-white">Flight Horizon Timeline:</p>
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span>Next 15 mins:</span>
                  <span className="text-emerald-400 font-bold">Glass Smooth Air</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span>At 03:45 PM (Over Alps):</span>
                  <span className="text-amber-400 font-bold">Minor Light Ripple (2 mins)</span>
                </div>
              </div>
            </div>

            <button
              onClick={checkTurbulence}
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl font-bold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 uppercase tracking-wider"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Nervous Flyer Audio Co-Pilot 🎧</span>
            </button>
          </motion.div>
        )}

        {screen === 'reassurance' && (
          <motion.div
            key="reassurance"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between text-center"
          >
            <div>
              <div className="text-4xl my-2">✈️</div>
              <h2 className="text-lg font-black text-white">Airplane Wings are Elastic</h2>
              <p className="text-xs text-neutral-300">Commercial wings can bend over 5 meters without damage.</p>

              <div className="bg-neutral-900/90 border border-sky-800/40 rounded-3xl p-4 my-3 text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-sky-300">
                  <span>Physics Reassurance</span>
                  <span className="text-emerald-400">100% Structurally Safe</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Turbulence is just waves in the air, exactly like bumps on a paved road. The plane cannot fall out of the sky. Breathe slowly.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playTap();
                setScreen('radar');
              }}
              className="w-full py-3 bg-neutral-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Return to Flight Radar</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
