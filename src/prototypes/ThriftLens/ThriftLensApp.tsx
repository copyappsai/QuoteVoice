import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  TrendingUp, 
  Tag, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  Flame,
  Search,
  CheckCircle2,
  Scan
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

export const ThriftLensApp: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'scanning' | 'processing' | 'ready'>('home');
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [isListed, setIsListed] = useState(false);

  useEffect(() => {
    if (screen !== 'scanning') return;

    const scanTimer = setTimeout(() => {
      setScreen('processing');
      sounds.playAiProcessing();
    }, 2000);

    return () => clearTimeout(scanTimer);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'processing') return;

    const start = Date.now();
    const duration = 1200;

    const pTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(pTimer);
        setTimeout(() => setScreen('ready'), 120);
      }
    }, 40);

    return () => clearInterval(pTimer);
  }, [screen]);

  const handleCreateListing = () => {
    sounds.playSuccessDing();
    setIsListed(true);
    setShowToast(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.72 }, colors: ['#a855f7', '#10b981', '#f59e0b'] });
    } catch {}

    setTimeout(() => setShowToast(false), 3800);
  };

  const recentFlips = [
    { title: '1992 Carhartt Detroit Jacket (J97 MOS)', bought: '$12', sold: '$240', profit: '+$228 Profit', platform: 'eBay' },
    { title: 'Sony Walkman Sports WM-F5', bought: '$6', sold: '$145', profit: '+$139 Profit', platform: 'Mercari' },
    { title: 'Le Creuset Enamelled Cast Iron Dutch Oven', bought: '$18', sold: '$165', profit: '+$147 Profit', platform: 'Poshmark' },
  ];

  return (
    <div className="flex flex-col h-full justify-between px-4 pb-2 relative">
      {/* SCREEN 1: HOME */}
      {screen === 'home' && (
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col h-full justify-between"
        >
          <div className="space-y-3 pt-1">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                  ThriftLens AI
                </span>
                <h1 className="text-lg font-extrabold text-slate-900 mt-1">Resale Profit Scanner</h1>
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
            </div>

            {/* Monthly Profit Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-700 to-violet-800 p-4 text-white shadow-lg shadow-purple-600/25">
              <div className="flex items-center justify-between text-xs text-purple-100 font-medium">
                <span>November Resale Profit</span>
                <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-300">
                  <TrendingUp className="w-2.5 h-2.5" /> +41.5%
                </span>
              </div>

              <div className="mt-2">
                <div className="text-3xl font-extrabold tracking-tight font-mono">+$4,120.00</div>
                <p className="text-[11px] text-purple-100 mt-0.5">24 items flipped across eBay & Poshmark</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-purple-100">
                <span className="flex items-center gap-1 text-purple-200 font-bold">
                  <Flame className="w-3.5 h-3.5 text-amber-300" /> Flea Market Scanner Armed
                </span>
                <span className="font-bold text-white">Live eBay Comps</span>
              </div>
            </div>

            {/* Recent Flips List */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-xs font-bold text-slate-800">Recent Flea Market Flips</h3>
              {recentFlips.map((flip, i) => (
                <div key={i} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="pr-2">
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{flip.title}</p>
                    <p className="text-[9.5px] text-slate-400">Paid: {flip.bought} • Sold: {flip.sold} ({flip.platform})</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 font-mono">
                    {flip.profit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Dock */}
          <div className="pb-1 pt-2 flex flex-col items-center shrink-0">
            <div className="mb-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10.5px] font-medium shadow-2xs">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Point camera at any tag or vintage item</span>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 rounded-full bg-purple-500/20 animate-ping opacity-75 pointer-events-none" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  sounds.playMicStart();
                  setScreen('scanning');
                }}
                className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/40 border-2 border-white/40 cursor-pointer"
              >
                <Camera className="w-6 h-6 text-white drop-shadow" />
              </motion.button>
            </div>

            <p className="mt-2 text-xs font-bold text-slate-900">Hold to Scan Vintage Item</p>
            <p className="text-[9.5px] text-slate-400">Instant eBay Sold Price & Authenticity</p>
          </div>
        </motion.div>
      )}

      {/* SCREEN 2: SCANNING CAMERA VIEWFINDER & LIVE COMPS */}
      {(screen === 'scanning' || screen === 'processing') && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col h-full justify-between pt-1"
        >
          <div className="flex items-center justify-between">
            <button onClick={() => setScreen('home')} className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              {screen === 'scanning' ? 'Optical Vision Locking...' : 'Comparing 3,400 eBay Sold Comps...'}
            </span>
            <button onClick={() => setScreen('ready')} className="text-xs font-bold text-purple-600">Skip &gt;</button>
          </div>

          <div className="my-auto space-y-3">
            {screen === 'scanning' ? (
              <div className="space-y-3">
                {/* Simulated Camera Viewfinder */}
                <div className="relative bg-slate-900 rounded-2xl h-52 overflow-hidden flex items-center justify-center shadow-lg border border-purple-500/30">
                  {/* Subtle camera image mock */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center text-center p-4">
                    <p className="text-sm font-bold text-purple-200">1994 Patagonia Retro-X Glissade</p>
                    <p className="text-[10px] text-slate-400">Deep pile fleece • Made in USA tag detected</p>
                  </div>

                  {/* Holographic targeting scan corners */}
                  <div className="absolute inset-6 border-2 border-dashed border-purple-400/80 rounded-xl pointer-events-none flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
                  </div>

                  <span className="absolute bottom-2 right-2 text-[9px] font-mono text-purple-300 bg-black/60 px-2 py-0.5 rounded">
                    AI Lens 4K Active
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-sm text-xs space-y-1">
                  <p className="font-bold text-purple-900 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-purple-600" /> Matched Item Signature:
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    Patagonia Fall 1994 Deep Pile Fleece Cardigan. Tag #23055. High demand collector tier.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-3 text-white shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-200 animate-spin" />
                      <span className="text-xs font-bold">Verifying past 90-day eBay sold sales...</span>
                    </div>
                    <span className="text-xs font-mono font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-1.5 text-xs">
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase">Recent eBay Sold Comps (Last 30 Days)</p>
                  <div className="flex justify-between p-1.5 rounded bg-purple-50 text-slate-800">
                    <span>Sold Nov 18 (Mint condition):</span>
                    <span className="font-bold font-mono">$295.00</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-purple-50 text-slate-800">
                    <span>Sold Nov 12 (Good condition):</span>
                    <span className="font-bold font-mono">$265.00</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                    <span>Average Market Velocity:</span>
                    <span className="font-mono text-emerald-700">Sells in 4 days</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center pb-1 text-[10px] text-slate-400">
            eBay & Poshmark Sold API • Live Authenticator
          </div>
        </motion.div>
      )}

      {/* SCREEN 3: APPRAISAL CARD & 1-CLICK LISTING */}
      {screen === 'ready' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col h-full justify-between pt-1 relative"
        >
          <div className="flex items-center justify-between pb-1">
            <button onClick={() => setScreen('home')} className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <span className="text-xs font-bold text-slate-800 font-mono">Comp #TL-4412</span>
            <button onClick={() => setScreen('home')} className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Appraisal Card */}
          <div className="bg-white rounded-2xl border border-purple-200 p-3 shadow-md space-y-2">
            <div className="flex items-start justify-between border-b border-slate-100 pb-2">
              <div>
                <span className="text-[9px] font-bold uppercase text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                  Verified Vintage Gem
                </span>
                <h3 className="text-xs font-bold text-slate-900 mt-1">1994 Patagonia Retro-X Glissade</h3>
                <p className="text-[9.5px] text-slate-500">Made in USA • Deep Pile Nutria Fleece</p>
              </div>
              <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +$266 Net Profit
              </span>
            </div>

            {/* Price Breakdown */}
            <div className="grid grid-cols-2 gap-1.5 text-center text-xs">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                <p className="text-[9px] uppercase font-bold text-slate-500">Store Sticker Price</p>
                <p className="text-base font-extrabold text-slate-900 font-mono">$14.00</p>
                <p className="text-[9px] text-slate-400">Buy immediately</p>
              </div>
              <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                <p className="text-[9px] uppercase font-bold text-emerald-800">eBay Sold Value</p>
                <p className="text-base font-extrabold text-emerald-700 font-mono">$280.00</p>
                <p className="text-[9px] text-emerald-600 font-medium">94% Sell-through rate</p>
              </div>
            </div>

            {/* Generated SEO Title */}
            <div className="bg-purple-50/70 p-2 rounded-xl border border-purple-100 text-[10px] space-y-1">
              <p className="font-bold text-purple-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" /> AI Generated eBay Title:
              </p>
              <p className="font-mono bg-white p-1.5 rounded border border-purple-200 text-slate-800 font-medium">
                Vintage 1994 Patagonia Deep Pile Retro-X Fleece Jacket USA Made Men's L
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-1.5 shrink-0">
            <button
              onClick={handleCreateListing}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isListed ? 'Listing Draft Dispatched to eBay!' : '1-Click Create eBay & Poshmark Draft'}</span>
            </button>
            <button
              onClick={() => sounds.playTap()}
              className="w-full py-2 px-3 rounded-xl bg-white text-slate-800 font-bold text-xs border border-slate-300 flex items-center justify-center gap-1.5"
            >
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>Save to My Sourcing Inventory Bag</span>
            </button>
          </div>

          {/* Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-24 left-2 right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-xl border border-purple-500/40 flex items-center gap-2.5 z-50"
              >
                <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">eBay Draft Created!</h4>
                  <p className="text-[10px] text-purple-300">Target price $280 set with calculated shipping</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
