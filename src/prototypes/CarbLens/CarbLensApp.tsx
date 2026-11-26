import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Camera, TrendingUp, Sparkles, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const CarbLensApp: React.FC = () => {
  const [screen, setScreen] = useState<'camera' | 'analysis'>('camera');
  const [scannedFood, setScannedFood] = useState('Chipotle Steak Bowl');

  const snapFood = () => {
    sounds.playAiProcessing();
    setScreen('analysis');
  };

  return (
    <div className="w-full h-full bg-[#08120e] text-emerald-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-emerald-600 font-sans">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {screen === 'camera' && (
          <motion.div
            key="camera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold text-white tracking-tight">CarbLens</h1>
                    <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Diabetic & Keto AI</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded-full">
                  CGM Linked
                </span>
              </div>

              {/* Viewfinder */}
              <div className="relative w-full aspect-[4/3] bg-neutral-950 border-2 border-emerald-500/40 rounded-3xl overflow-hidden my-4 flex flex-col justify-between p-3">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span>Plate Scanner Active</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="my-auto text-center">
                  <span className="text-4xl">🥗</span>
                  <p className="text-xs font-bold text-white mt-2">Grilled Chicken & Avocado Bowl</p>
                </div>
                <p className="text-[10px] text-neutral-400 text-center">AI optical volume & glycemic calculation</p>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 my-2">
                <p className="text-xs font-bold text-white">Insulin Spike Prediction Engine</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Calculates exact glycemic load before you take your first bite.</p>
              </div>
            </div>

            <button
              onClick={snapFood}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-neutral-950 rounded-2xl font-black text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 uppercase tracking-wider"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Meal Carbs & Glycemic Load 📸</span>
            </button>
          </motion.div>
        )}

        {screen === 'analysis' && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="text-center my-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">METABOLIC SCAN VERDICT</span>
                <h2 className="text-xl font-black text-white mt-0.5">Low Glycemic Spike</h2>
                <p className="text-xs text-neutral-400">Safe for Keto & Type 1/2 Glucose Control</p>
              </div>

              {/* Macro Cards */}
              <div className="grid grid-cols-3 gap-2 my-3 text-center">
                <div className="bg-neutral-900/80 border border-emerald-900/40 rounded-2xl p-2.5">
                  <span className="text-[10px] text-neutral-400 font-bold">NET CARBS</span>
                  <p className="text-lg font-black text-emerald-400">12g</p>
                  <p className="text-[9px] text-neutral-500">Fiber: 8g</p>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2.5">
                  <span className="text-[10px] text-neutral-400 font-bold">PROTEIN</span>
                  <p className="text-lg font-black text-white">42g</p>
                  <p className="text-[9px] text-neutral-500">Satiety high</p>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2.5">
                  <span className="text-[10px] text-neutral-400 font-bold">GLYCEMIC</span>
                  <p className="text-lg font-black text-cyan-400">22</p>
                  <p className="text-[9px] text-neutral-500">Very Low</p>
                </div>
              </div>

              {/* Glucose Spike Prediction Graph Mock */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 my-2">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">Predicted 2-Hour Blood Glucose</span>
                  <span className="text-emerald-400">+12 mg/dL (Flat Curve)</span>
                </div>
                <div className="h-6 flex items-end gap-1">
                  {[20, 24, 30, 32, 28, 24, 22, 20].map((h, i) => (
                    <div key={i} className="flex-1 bg-emerald-500/80 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  sounds.playSuccessDing();
                  setScreen('camera');
                }}
                className="w-full py-3.5 bg-emerald-500 text-neutral-950 rounded-2xl font-black text-xs shadow-lg uppercase tracking-wider cursor-pointer"
              >
                Log to Glucose Journal ✓
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
