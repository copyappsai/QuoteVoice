import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Video, CheckCircle2, AlertTriangle, FileText, Share2, RotateCcw, Lock } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const RentProofApp: React.FC = () => {
  const [screen, setScreen] = useState<'walkthrough' | 'report'>('walkthrough');
  const [damagesFound, setDamagesFound] = useState(3);

  const generateVaultReport = () => {
    sounds.playSuccessDing();
    setScreen('report');
  };

  return (
    <div className="w-full h-full bg-[#0b0c10] text-slate-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-slate-600 font-sans">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-slate-600/10 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {screen === 'walkthrough' && (
          <motion.div
            key="walkthrough"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold text-white tracking-tight">RentProof</h1>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Deposit Vault Audit</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Timestamped
                </span>
              </div>

              {/* 360 Walkthrough Viewfinder Simulation */}
              <div className="relative w-full aspect-[4/3] bg-neutral-950 border border-slate-800 rounded-3xl overflow-hidden my-3 flex flex-col justify-between p-3 shadow-xl">
                <div className="flex items-center justify-between text-xs text-rose-400 font-bold">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> REC 00:42</span>
                  <span className="text-neutral-400 font-mono">GPS: 40.7128° N, 74.0060° W</span>
                </div>

                {/* Detected Damage Markers */}
                <div className="space-y-1.5 my-auto">
                  <div className="bg-black/70 border border-rose-500/60 p-2 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300">🚨 Hardwood Scratch (Living Room)</span>
                    <span className="text-[9px] bg-rose-500 text-black font-black px-1.5 py-0.5 rounded">Pre-existing</span>
                  </div>
                  <div className="bg-black/70 border border-amber-500/60 p-2 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">⚠️ Baseboard Paint Chip</span>
                    <span className="text-[9px] bg-amber-500 text-black font-black px-1.5 py-0.5 rounded">Pre-existing</span>
                  </div>
                </div>

                <p className="text-[10px] text-center text-slate-400">Cryptographically signed on device hardware</p>
              </div>

              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 my-2">
                <p className="text-xs font-bold text-white">Security Deposit Shield</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Prevents landlords from withholding your $2,400 deposit when moving out.</p>
              </div>
            </div>

            <button
              onClick={generateVaultReport}
              className="w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-2xl font-bold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 uppercase tracking-wider"
            >
              <FileText className="w-4 h-4" />
              <span>Seal Timestamped Audit Report 🔒</span>
            </button>
          </motion.div>
        )}

        {screen === 'report' && (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="text-center my-2">
                <span className="text-3xl">📜</span>
                <h2 className="text-lg font-black text-white mt-1">Proof Vault Sealed</h2>
                <p className="text-xs text-neutral-400">SHA-256 Hash Generated • 3 Defects Documented</p>
              </div>

              <div className="bg-neutral-950 border border-slate-800 rounded-3xl p-4 my-3 text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Certified Tenant Packet</span>
                  <span className="text-emerald-400">Court Admissible</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono space-y-1 bg-neutral-900 p-2.5 rounded-xl">
                  <p>Hash: e3b0c44298fc1c149afbf4c8996fb924</p>
                  <p>Timestamp: 2026-11-26 08:44:12 UTC</p>
                  <p>Defects: 3 Photos + 42s 4K Video Logged</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => sounds.playSuccessDing()}
                className="w-full py-3.5 bg-white text-black rounded-2xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Send Certified PDF to Landlord</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setScreen('walkthrough');
                }}
                className="w-full py-2.5 bg-neutral-900 text-neutral-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Record Another Room</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
