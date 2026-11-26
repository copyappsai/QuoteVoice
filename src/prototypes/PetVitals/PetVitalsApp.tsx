import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2, 
  Search, 
  Camera, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  MapPin
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const PetVitalsApp: React.FC = () => {
  const [screen, setScreen] = useState<'hub' | 'scan' | 'emergency'>('hub');
  const [selectedItem, setSelectedItem] = useState('Dark Chocolate');

  const startScanner = (item: string) => {
    sounds.playAlert();
    setSelectedItem(item);
    setScreen('scan');
  };

  const openEmergencyPlan = () => {
    sounds.playTap();
    setScreen('emergency');
  };

  return (
    <div className="w-full h-full bg-[#120a0d] text-slate-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-rose-500">
      
      {/* Background ambient red glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-600/15 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* SCREEN 1: PET PASSPORT & EMERGENCY TOXICITY RADAR */}
        {screen === 'hub' && (
          <motion.div
            key="hub"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold tracking-tight">PetVitals</h1>
                    <p className="text-[10px] text-rose-400 font-semibold uppercase tracking-wider">Toxicity & Vet Radar</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Vaccines Active</span>
                </div>
              </div>

              {/* Pet Profile Card */}
              <div className="bg-gradient-to-r from-rose-950/60 to-neutral-900 border border-rose-800/40 rounded-2xl p-3.5 my-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🐕</span>
                    <div>
                      <h2 className="text-sm font-black text-white">Milo • Golden Retriever</h2>
                      <p className="text-[10px] text-neutral-300">2 Years • 31 kg (Healthy weight)</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full">
                    Chip #8492
                  </span>
                </div>
              </div>

              {/* Instant Toxicity Lookups */}
              <div className="my-2 space-y-2">
                <p className="text-xs font-extrabold text-slate-300">Quick Toxicity Checks:</p>

                <button
                  onClick={() => startScanner('Dark Chocolate')}
                  className="w-full bg-neutral-900/90 hover:bg-neutral-850 border border-rose-900/50 rounded-xl p-2.5 flex items-center justify-between text-left cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🍫</span>
                    <div>
                      <p className="text-xs font-bold text-white">Dark Chocolate / Cocoa</p>
                      <p className="text-[10px] text-neutral-400">Theobromine cardiac toxin</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-500/20 text-rose-400 font-extrabold px-2 py-0.5 rounded">Check Risk</span>
                </button>

                <button
                  onClick={() => startScanner('Grapes & Raisins')}
                  className="w-full bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between text-left cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🍇</span>
                    <div>
                      <p className="text-xs font-bold text-white">Grapes & Raisins</p>
                      <p className="text-[10px] text-neutral-400">Acute renal failure risk</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-neutral-800 text-neutral-300 font-bold px-2 py-0.5 rounded">Check Risk</span>
                </button>

                <button
                  onClick={() => startScanner('Monstera Houseplant')}
                  className="w-full bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between text-left cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🪴</span>
                    <div>
                      <p className="text-xs font-bold text-white">Monstera Deliciosa</p>
                      <p className="text-[10px] text-neutral-400">Calcium oxalate crystals</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-neutral-800 text-neutral-300 font-bold px-2 py-0.5 rounded">Check Risk</span>
                </button>
              </div>
            </div>

            {/* Bottom 24/7 Hotline & Camera Scan */}
            <div className="pt-2">
              <button
                onClick={() => startScanner('Dark Chocolate')}
                className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Camera className="w-4 h-4" />
                <span>Camera Food / Plant Scanner 🔍</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 2: TOXICITY VERDICT & SEVERITY */}
        {screen === 'scan' && (
          <motion.div
            key="scan"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col justify-between py-2 text-center"
          >
            <div>
              {/* Alert Status Banner */}
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-500 my-2 animate-pulse">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-black uppercase tracking-wider bg-rose-500 text-neutral-950 px-2.5 py-0.5 rounded-full">
                CRITICAL WARNING
              </span>

              <h2 className="text-lg font-black text-white mt-1">HIGHLY TOXIC TO DOGS</h2>
              <p className="text-xs text-rose-300 font-medium">Scanned: {selectedItem}</p>

              {/* Toxic Dosage Calculation */}
              <div className="bg-neutral-900/90 border border-rose-900/60 rounded-xl p-3 my-3 text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Toxin: Theobromine & Caffeine</span>
                  <span className="text-rose-400">Danger: Grade A</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  For Milo's weight (31 kg), even 25g of dark baking chocolate can trigger severe tachycardia, tremors, and internal distress.
                </p>

                <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800 text-[10px] text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>DO NOT induce vomiting without consulting an emergency veterinarian.</span>
                </div>
              </div>
            </div>

            {/* Emergency Action CTA */}
            <div className="space-y-2 pt-2">
              <button
                onClick={openEmergencyPlan}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white rounded-xl font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Open 24/7 Vet SOS & Clinic Route 🚨</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setScreen('hub');
                }}
                className="w-full py-2 bg-neutral-900 text-neutral-400 rounded-xl text-xs font-semibold"
              >
                Back to Hub
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: 24/7 VETERINARY DISPATCH & CLINIC ROUTE */}
        {screen === 'emergency' && (
          <motion.div
            key="emergency"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
                  Nearest 24/7 ER Clinic
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                  OPEN NOW
                </span>
              </div>

              {/* Vet Clinic Card */}
              <div className="bg-gradient-to-br from-rose-950/40 to-neutral-900 border border-rose-800/40 rounded-2xl p-3.5 my-2">
                <h3 className="text-sm font-black text-white">Central Animal Emergency Hospital</h3>
                <p className="text-[11px] text-neutral-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  1.2 miles away • 4 min drive
                </p>

                <div className="mt-3 bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800 text-[11px] text-slate-200">
                  <span className="font-bold text-rose-300">Automated Intake Packet Sent:</span>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    Milo (31kg) • Suspected Dark Chocolate ingestion • Toxin report transferred to ER desk.
                  </p>
                </div>
              </div>

              {/* Step-by-Step ER protocol */}
              <div className="space-y-1.5 my-2 text-xs">
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-[10px]">1</span>
                  <span className="text-slate-200 text-[11px]">Keep dog calm and in cool room</span>
                </div>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-[10px]">2</span>
                  <span className="text-slate-200 text-[11px]">Bring packaging/wrapper to vet clinic</span>
                </div>
              </div>
            </div>

            {/* Direct Call & Navigation CTA */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => sounds.playSuccessDing()}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white rounded-xl font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency Vet (+1 800-222-1222)</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setScreen('hub');
                }}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Pet Hub</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
