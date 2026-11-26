import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Layers, Sparkles, Brain, CheckCircle2, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const MemoryPalaceApp: React.FC = () => {
  const [screen, setScreen] = useState<'room' | 'card'>('room');
  const [locusPoint, setLocusPoint] = useState('Coffee Table');

  const openLocus = (locus: string) => {
    sounds.playTap();
    setLocusPoint(locus);
    setScreen('card');
  };

  return (
    <div className="w-full h-full bg-[#100814] text-pink-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-pink-600 font-sans">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-600/15 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {screen === 'room' && (
          <motion.div
            key="room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold text-white tracking-tight">MemoryPalace</h1>
                    <p className="text-[10px] text-pink-400 font-semibold uppercase tracking-wider">Spatial AR Loci Recall</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-pink-300 bg-pink-950/70 border border-pink-800/40 px-2.5 py-0.5 rounded-full">
                  12 Loci Anchored
                </span>
              </div>

              {/* Spatial AR Room Visualizer */}
              <div className="relative w-full aspect-[4/3] bg-neutral-950 border border-pink-900/40 rounded-3xl overflow-hidden my-3 flex flex-col justify-between p-3 shadow-xl">
                <div className="flex items-center justify-between text-xs text-pink-400 font-bold">
                  <span>Room: Living Room</span>
                  <span>Deck: MCAT Biochemistry</span>
                </div>

                <div className="space-y-2 my-auto">
                  <button
                    onClick={() => openLocus('Living Room Sofa')}
                    className="w-full bg-pink-950/60 border border-pink-500/40 p-2 rounded-xl flex items-center justify-between text-left cursor-pointer hover:bg-pink-900/50"
                  >
                    <span className="text-xs font-bold text-white">🛋️ Sofa: Krebs Cycle Enzymes</span>
                    <span className="text-[9px] bg-pink-500 text-black font-bold px-1.5 py-0.5 rounded">Recall</span>
                  </button>

                  <button
                    onClick={() => openLocus('Bookshelf')}
                    className="w-full bg-pink-950/60 border border-pink-500/40 p-2 rounded-xl flex items-center justify-between text-left cursor-pointer hover:bg-pink-900/50"
                  >
                    <span className="text-xs font-bold text-white">📚 Bookshelf: DNA Polymerase III</span>
                    <span className="text-[9px] bg-pink-500 text-black font-bold px-1.5 py-0.5 rounded">Recall</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-neutral-400">Spatial anchoring triggers ancient navigation memory</p>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 my-2">
                <p className="text-xs font-bold text-white">10x Retention vs Quizlet</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Anchored to spatial physical objects in your home.</p>
              </div>
            </div>

            <button
              onClick={() => openLocus('Coffee Table')}
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 text-white rounded-2xl font-bold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Brain className="w-4 h-4" />
              <span>Enter Spatial Palace Walk 🧠</span>
            </button>
          </motion.div>
        )}

        {screen === 'card' && (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="text-center my-2">
                <span className="text-[10px] uppercase font-bold text-pink-400">ANCHORED AT {locusPoint}</span>
                <h2 className="text-lg font-black text-white mt-1">Krebs Cycle: Citrate Synthase</h2>
                <p className="text-xs text-neutral-400">Acetyl-CoA + Oxaloacetate → Citrate</p>
              </div>

              <div className="bg-neutral-900/90 border border-pink-800/40 rounded-3xl p-4 my-4 text-left space-y-2">
                <span className="text-xs font-bold text-pink-300">Spatial Mental Hook:</span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Imagine pouring giant golden lemons (Citrate) onto your actual sofa cushion while steam (CoA) hisses out.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  sounds.playSuccessDing();
                  setScreen('room');
                }}
                className="w-full py-3.5 bg-pink-500 text-black rounded-2xl font-bold text-xs shadow-lg uppercase tracking-wider cursor-pointer"
              >
                Mark Mastered ✓
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
