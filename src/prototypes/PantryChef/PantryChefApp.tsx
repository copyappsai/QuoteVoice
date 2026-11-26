import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Camera, 
  Sparkles, 
  Clock, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  ChefHat, 
  ArrowRight, 
  RotateCcw,
  Check
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const PantryChefApp: React.FC = () => {
  const [screen, setScreen] = useState<'inventory' | 'scanning' | 'recipe'>('inventory');
  const [cookingDone, setCookingDone] = useState(false);

  const startScan = () => {
    sounds.playTap();
    setScreen('scanning');
    setTimeout(() => {
      sounds.playSuccessDing();
      setScreen('recipe');
    }, 2800);
  };

  return (
    <div className="w-full h-full bg-[#0a120e] text-slate-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-emerald-600">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-600/10 rounded-full blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* SCREEN 1: SMART FRIDGE INVENTORY & EXPIRY RADAR */}
        {screen === 'inventory' && (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold tracking-tight">PantryChef</h1>
                    <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Zero-Waste AI Kitchen</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  4 Expiring Soon
                </span>
              </div>

              {/* Money Saved & Food Rescued Banner */}
              <div className="bg-gradient-to-r from-emerald-950/60 to-teal-950/40 border border-emerald-800/40 rounded-2xl p-3.5 my-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Monthly Food Rescued</span>
                    <p className="text-2xl font-black text-white">$142.50</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400">Waste Prevented</span>
                    <p className="text-xs font-bold text-emerald-400">14.8 kg CO₂</p>
                  </div>
                </div>
              </div>

              {/* Expiring Ingredients Shelf */}
              <div className="my-2 space-y-2">
                <p className="text-xs font-extrabold text-slate-300">Expiring in 48 Hours:</p>

                <div className="bg-neutral-900/90 border border-rose-900/40 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🥛</span>
                    <div>
                      <p className="text-xs font-bold text-white">Organic Whole Milk</p>
                      <p className="text-[10px] text-rose-400 font-semibold">Expires Tomorrow (1 day left)</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-md">Urgent</span>
                </div>

                <div className="bg-neutral-900/90 border border-amber-900/40 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🥑</span>
                    <div>
                      <p className="text-xs font-bold text-white">Ripe Hass Avocados</p>
                      <p className="text-[10px] text-amber-400 font-semibold">Perfect ripeness today</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-md">Eat Today</span>
                </div>

                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🧀</span>
                    <div>
                      <p className="text-xs font-bold text-white">Sharp Cheddar Block</p>
                      <p className="text-[10px] text-neutral-400">Opened • 2 days left</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-neutral-800 text-neutral-300 font-bold px-2 py-0.5 rounded-md">Cook</span>
                </div>
              </div>
            </div>

            {/* Scan Fridge CTA */}
            <div className="pt-2">
              <button
                onClick={startScan}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Camera className="w-4 h-4" />
                <span>Snap Fridge & Cook Recipe 📸</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 2: LIVE INGREDIENT CAMERA SCANNER */}
        {screen === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between py-2 relative"
          >
            {/* Viewfinder simulation */}
            <div className="relative flex-1 bg-neutral-950 border-2 border-emerald-500/50 rounded-2xl overflow-hidden flex flex-col justify-between p-3">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  AI Vision Active
                </span>
                <span>Fridge Shelf #2</span>
              </div>

              {/* Scanning Bounding Boxes */}
              <div className="space-y-3 my-auto">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="border border-emerald-400 bg-emerald-500/10 p-2 rounded-lg flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-emerald-200">🥛 Whole Milk</span>
                  <span className="text-[9px] bg-emerald-500 text-neutral-950 font-black px-1.5 py-0.5 rounded">99% Match</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="border border-emerald-400 bg-emerald-500/10 p-2 rounded-lg flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-emerald-200">🧀 Sharp Cheddar</span>
                  <span className="text-[9px] bg-emerald-500 text-neutral-950 font-black px-1.5 py-0.5 rounded">97% Match</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                  className="border border-emerald-400 bg-emerald-500/10 p-2 rounded-lg flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-emerald-200">🥚 Fresh Eggs (6 pcs)</span>
                  <span className="text-[9px] bg-emerald-500 text-neutral-950 font-black px-1.5 py-0.5 rounded">98% Match</span>
                </motion.div>
              </div>

              <div className="text-center">
                <p className="text-xs font-extrabold text-emerald-400 animate-pulse">
                  Synthesizing zero-waste recipe...
                </p>
                <p className="text-[10px] text-neutral-400">0 extra grocery shopping needed</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: 15-MINUTE ZERO-WASTE GOURMET RECIPE */}
        {screen === 'recipe' && (
          <motion.div
            key="recipe"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  100% In-Fridge Match
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-400" /> 12 mins</span>
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-500" /> 380 kcal</span>
                </div>
              </div>

              {/* Recipe Title Card */}
              <div className="bg-gradient-to-br from-emerald-950/60 to-neutral-900 border border-emerald-800/40 rounded-2xl p-3.5 my-1.5">
                <h2 className="text-base font-black text-white leading-tight">
                  Skillet Cheddar & Herb Frittata 🍳
                </h2>
                <p className="text-[11px] text-emerald-300/90 font-medium mt-1">
                  Rescues your Milk, Eggs & expiring Cheddar cheese with zero grocery run!
                </p>
              </div>

              {/* Cooking Steps Checklist */}
              <div className="space-y-2 my-2 text-xs">
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <p className="text-slate-200">Whisk 4 eggs with 50ml expiring whole milk and a pinch of salt.</p>
                </div>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <p className="text-slate-200">Grate cheddar block over medium skillet until bubbling and golden.</p>
                </div>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <p className="text-slate-200">Fold with fresh avocado slices. Serve warm in 12 mins!</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  sounds.playSuccessDing();
                  setCookingDone(true);
                }}
                className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  cookingDone 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{cookingDone ? 'Meal Cooked! Saved $18.50 🌿' : 'Start Cooking Timer (12:00)'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  setScreen('inventory');
                  setCookingDone(false);
                }}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Scan Another Meal</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
