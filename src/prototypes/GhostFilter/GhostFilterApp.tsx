import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOff, AlertTriangle, ShieldCheck, PhoneCall, Copy, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const GhostFilterApp: React.FC = () => {
  const [screen, setScreen] = useState<'audit' | 'verdict'>('audit');

  const analyzeScam = () => {
    sounds.playAlert();
    setScreen('verdict');
  };

  return (
    <div className="w-full h-full bg-[#0d0708] text-rose-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-rose-600 font-sans">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/15 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {screen === 'audit' && (
          <motion.div
            key="audit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold text-white tracking-tight">GhostFilter</h1>
                    <p className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">AI Scam & Phish Breaker</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                  FTC Radar Active
                </span>
              </div>

              {/* Paste Message / Audio Sample */}
              <div className="bg-neutral-900/90 border border-red-900/40 rounded-3xl p-4 my-3 space-y-2">
                <p className="text-xs font-bold text-neutral-300">Suspicious SMS / Voicemail to Check:</p>
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs text-slate-300 font-mono italic">
                  "USPS: Your parcel has an incorrect delivery address. Click here immediately to update or package is returned: http://usps-track-parcel92.com"
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 my-2">
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2.5">
                  <span className="text-[10px] text-neutral-400">Deepfake Voice Cadence</span>
                  <p className="text-xs font-bold text-red-400">AI Synthesized</p>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2.5">
                  <span className="text-[10px] text-neutral-400">Phishing Domain Risk</span>
                  <p className="text-xs font-bold text-red-400">99.8% Scam</p>
                </div>
              </div>
            </div>

            <button
              onClick={analyzeScam}
              className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-2xl font-black text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>Break Scam & Reveal Trap 🚨</span>
            </button>
          </motion.div>
        )}

        {screen === 'verdict' && (
          <motion.div
            key="verdict"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between text-center"
          >
            <div>
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 my-2">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-black text-white">CONFIRMED PHISHING FRAUD</h2>
              <p className="text-xs text-rose-300">Impersonating United States Postal Service</p>

              <div className="bg-neutral-900/90 border border-red-800/40 rounded-3xl p-4 my-3 text-left space-y-2">
                <span className="text-xs font-bold text-rose-300">The Dark Pattern Exploit:</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Domain registered 6 hours ago in Russia. Steals credit card details under guise of a "$0.30 redelivery fee". Number has victimized 4,100 people today.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playTap();
                setScreen('audit');
              }}
              className="w-full py-3 bg-neutral-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Check Another Message</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
