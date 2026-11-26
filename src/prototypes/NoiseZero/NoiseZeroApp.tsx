import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Mic, Activity, AlertCircle, ShieldCheck, RotateCcw, Share2, MapPin } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const NoiseZeroApp: React.FC = () => {
  const [screen, setScreen] = useState<'scan' | 'result'>('scan');
  const [decibels, setDecibels] = useState(38);
  const [isScanning, setIsScanning] = useState(false);

  const startAcousticScan = () => {
    sounds.playMicStart();
    setIsScanning(true);
    setTimeout(() => {
      sounds.playSuccessDing();
      setIsScanning(false);
      setScreen('result');
    }, 2500);
  };

  return (
    <div className="w-full h-full bg-[#0a0712] text-purple-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-purple-600 font-sans">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />

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
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold text-white tracking-tight">NoiseZero</h1>
                    <p className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">Acoustic Room Audit</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                  Calibrated Mic
                </span>
              </div>

              {/* Live Decibel Meter */}
              <div className="bg-gradient-to-b from-purple-950/40 to-neutral-900 border border-purple-800/40 rounded-3xl p-5 text-center relative overflow-hidden my-3 shadow-xl">
                <p className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">AMBIENT SOUND PRESSURE</p>
                
                <div className="my-3 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-black text-white tracking-tighter">{decibels}</span>
                  <span className="text-sm font-bold text-purple-400">dB</span>
                </div>

                <p className="text-xs font-semibold text-emerald-400">Library Silence • Zero Traffic Hum</p>

                {/* Animated Audio Spectrum Bars */}
                <div className="flex items-center justify-center gap-1.5 mt-4 h-10 px-4">
                  {[25, 40, 85, 30, 65, 95, 45, 70, 30, 80, 50, 90, 35, 60].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-purple-400/80 rounded-full transition-all"
                      style={{ height: isScanning ? `${Math.random() * 80 + 20}%` : `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Apartment & Hotel Audit Checklist */}
              <div className="space-y-2 my-2 text-xs">
                <p className="font-bold text-slate-300">Certified Wall Inspection:</p>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between">
                  <span>Thin Wall Resonance (STC &gt; 52)</span>
                  <span className="text-emerald-400 font-bold">Passed</span>
                </div>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between">
                  <span>Low-Freq HVAC Vibration</span>
                  <span className="text-emerald-400 font-bold">Undetected</span>
                </div>
              </div>
            </div>

            <button
              onClick={startAcousticScan}
              disabled={isScanning}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 text-white rounded-2xl font-bold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Mic className="w-4 h-4" />
              <span>{isScanning ? 'Measuring Acoustic Spectrum...' : 'Start 10s Room Sound Audit 🎙️'}</span>
            </button>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="text-center my-2">
                <span className="text-3xl">🛡️</span>
                <h2 className="text-lg font-black text-white mt-1">Certified Acoustic Safe</h2>
                <p className="text-xs text-neutral-400">Apartment #4B • 38 dB Average Sound Floor</p>
              </div>

              <div className="bg-neutral-900/90 border border-purple-800/40 rounded-3xl p-4 my-3 text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-purple-300">
                  <span>Acoustic Isolation Score</span>
                  <span className="text-emerald-400">9.4 / 10 (Whisper Quiet)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  No footsteps from upstairs neighbors, zero plumbing water hammer. Safe to sign lease without sleep disruption.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => sounds.playSuccessDing()}
                className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Export Lease Acoustic Certificate</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setScreen('scan');
                }}
                className="w-full py-2.5 bg-neutral-900 text-neutral-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Scan Another Room</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
