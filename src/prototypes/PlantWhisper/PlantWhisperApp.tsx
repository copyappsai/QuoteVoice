import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sun, Droplets, Camera, CheckCircle2, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const PlantWhisperApp: React.FC = () => {
  const [screen, setScreen] = useState<'diagnostic' | 'result'>('diagnostic');
  const [lux, setLux] = useState(240); // ambient light

  const scanLeaf = () => {
    sounds.playAiProcessing();
    setScreen('result');
  };

  return (
    <div className="w-full h-full bg-[#0a110c] text-emerald-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-lime-600 font-sans">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-600/15 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {screen === 'diagnostic' && (
          <motion.div
            key="diagnostic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-lime-500/20 border border-lime-500/30 flex items-center justify-center text-lime-400">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold text-white tracking-tight">PlantWhisper</h1>
                    <p className="text-[10px] text-lime-400 font-semibold uppercase tracking-wider">Botanical Micro-Climate</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                  <Sun className="w-3.5 h-3.5" />
                  <span>{lux} Lux</span>
                </div>
              </div>

              {/* Plant Viewfinder Simulation */}
              <div className="relative w-full aspect-[4/3] bg-neutral-950 border border-lime-800/40 rounded-3xl overflow-hidden my-3 flex flex-col justify-between p-3 shadow-xl">
                <div className="flex items-center justify-between text-xs text-lime-400 font-bold">
                  <span>Leaf Chlorophyll Scan</span>
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
                </div>
                <div className="my-auto text-center">
                  <span className="text-5xl">🪴</span>
                  <p className="text-xs font-bold text-white mt-2">Monstera Deliciosa</p>
                </div>
                <p className="text-[10px] text-neutral-400 text-center">Measures ambient light & soil hydration schedule</p>
              </div>

              <div className="grid grid-cols-2 gap-2 my-2">
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-bold">
                    <Sun className="w-3 h-3 text-amber-400" />
                    LIGHT HEALTH
                  </div>
                  <p className="text-xs font-bold text-amber-400 mt-1">Needs +300 Lux</p>
                  <p className="text-[9px] text-neutral-500">Move closer to window</p>
                </div>

                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-bold">
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    SOIL MOISTURE
                  </div>
                  <p className="text-xs font-bold text-emerald-400 mt-1">Water in 2 Days</p>
                  <p className="text-[9px] text-neutral-500">Topsoil 65% damp</p>
                </div>
              </div>
            </div>

            <button
              onClick={scanLeaf}
              className="w-full py-4 bg-gradient-to-r from-lime-500 via-emerald-500 to-green-600 text-neutral-950 rounded-2xl font-black text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Camera className="w-4 h-4" />
              <span>Analyze Leaf Health & Chlorophyll 🌿</span>
            </button>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between text-center"
          >
            <div>
              <div className="text-4xl my-2">🌱</div>
              <h2 className="text-lg font-black text-white">Healthy Root & Leaf Tissue</h2>
              <p className="text-xs text-neutral-300">Zero root rot or fungal spore infestation.</p>

              <div className="bg-neutral-900/90 border border-lime-800/40 rounded-3xl p-4 my-3 text-left space-y-2">
                <span className="text-xs font-bold text-lime-400">Botanical Prescription:</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rotate pot 45° clockwise for uniform growth. Mist leaves tomorrow morning; next watering due on Friday with 250ml room-temp filtered water.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playTap();
                setScreen('diagnostic');
              }}
              className="w-full py-3 bg-neutral-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Check Another Plant</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
