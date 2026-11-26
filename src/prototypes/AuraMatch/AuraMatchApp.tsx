import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, Check, Palette, RotateCcw, Share2, Compass, Layers } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const AuraMatchApp: React.FC = () => {
  const [screen, setScreen] = useState<'scan' | 'result' | 'drape'>('scan');
  const [selectedSeason, setSelectedSeason] = useState('True Autumn');

  const startAnalysis = () => {
    sounds.playAiProcessing();
    setScreen('result');
  };

  return (
    <div className="w-full h-full bg-[#0d0c0e] text-[#f4efe8] flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-amber-600 font-serif">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-800/10 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {screen === 'scan' && (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300/80 font-sans font-bold">AURA STUDIO PARIS</span>
                <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-200 px-2.5 py-0.5 rounded-full font-sans">AI Chromatics</span>
              </div>

              <h1 className="text-2xl font-light tracking-tight text-white leading-tight font-serif">
                Seasonal Color <br /><span className="italic text-amber-200 font-normal">Aura Analysis</span>
              </h1>
              <p className="text-xs text-neutral-400 mt-2 font-sans font-light leading-relaxed">
                Calibrated optical undertone detection. Reveals the 12 harmonic shades that elevate your natural complexion.
              </p>

              {/* Viewfinder Mockup */}
              <div className="relative w-full aspect-[4/5] bg-neutral-900 border border-amber-500/20 rounded-3xl overflow-hidden my-4 flex flex-col items-center justify-center shadow-2xl">
                <div className="w-40 h-52 rounded-full border border-amber-300/40 border-dashed flex items-center justify-center relative">
                  <div className="text-4xl">✨</div>
                  <div className="absolute -bottom-3 bg-neutral-950 px-2 py-0.5 rounded text-[9px] font-sans text-amber-200 font-bold tracking-wider">
                    ALIGN FACE HERE
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/5 flex items-center justify-between text-[10px] font-sans text-neutral-300">
                  <span>Daylight Balanced (5500K)</span>
                  <span className="text-emerald-400 font-semibold">Ready</span>
                </div>
              </div>
            </div>

            <button
              onClick={startAnalysis}
              className="w-full py-4 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 text-neutral-950 rounded-2xl font-sans font-bold text-xs shadow-xl tracking-wider uppercase cursor-pointer transition-all active:scale-95"
            >
              Analyze Skin Undertone 🪞
            </button>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between font-sans"
          >
            <div>
              <div className="text-center my-2">
                <span className="text-[10px] uppercase tracking-widest text-amber-300/90 font-bold">Your Palette Identity</span>
                <h2 className="text-2xl font-serif font-light text-white mt-0.5 italic">{selectedSeason}</h2>
                <p className="text-xs text-neutral-400 mt-0.5 font-light">Warm Undertone • Rich Earth Density</p>
              </div>

              {/* Harmonic Palette Swatches */}
              <div className="bg-neutral-950/80 border border-amber-500/20 rounded-3xl p-4 my-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-amber-200 mb-2.5">Signature Capsule Shades:</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Terracotta', color: '#c85a32' },
                    { name: 'Warm Olive', color: '#556b2f' },
                    { name: 'Spiced Gold', color: '#d4af37' },
                    { name: 'Burnt Rust', color: '#8b3a1a' },
                    { name: 'Espresso', color: '#3d2b1f' },
                    { name: 'Forest Teal', color: '#1f4e5b' },
                    { name: 'Warm Cream', color: '#fff8dc' },
                    { name: 'Copper Wine', color: '#722f37' },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="w-full h-10 rounded-xl shadow-inner border border-white/10" style={{ backgroundColor: s.color }} />
                      <span className="text-[9px] text-neutral-400 mt-1 block truncate font-medium">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garment Drape Compatibility Test */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white font-sans">Garment Scanner Active</p>
                  <p className="text-[10px] text-neutral-400">Point at clothes to see compatibility rating</p>
                </div>
                <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">98% Match</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  sounds.playSuccessDing();
                  setScreen('scan');
                }}
                className="w-full py-3.5 bg-amber-200 text-neutral-950 rounded-2xl font-bold text-xs tracking-wider uppercase cursor-pointer"
              >
                Save to Wardrobe Wallet 🏷️
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
