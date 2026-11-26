import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scissors, 
  ShieldCheck, 
  AlertCircle, 
  ArrowLeft, 
  Check, 
  Volume2, 
  Sparkles, 
  RotateCcw,
  TrendingDown,
  Lock,
  Zap,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

export const SubZeroApp: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'recording' | 'processing' | 'ready'>('home');
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const fullTranscript = "Cancel my Equinox gym membership and Adobe Creative Cloud subscription immediately under FTC click-to-cancel rules.";
  const words = fullTranscript.split(' ');

  useEffect(() => {
    if (screen !== 'recording') return;

    let wordIdx = 0;
    const intervalTime = 1900 / words.length;

    const timer = setInterval(() => {
      wordIdx++;
      setDisplayedWords(words.slice(0, wordIdx));
      if (wordIdx % 4 === 0) sounds.playTap();

      if (wordIdx >= words.length) {
        clearInterval(timer);
        setTimeout(() => {
          setScreen('processing');
          sounds.playAiProcessing();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
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

  const handleCancelAll = () => {
    sounds.playSuccessDing();
    setIsCancelled(true);
    setShowToast(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.72 }, colors: ['#f43f5e', '#10b981', '#3b82f6'] });
    } catch {}

    setTimeout(() => setShowToast(false), 3800);
  };

  const zombieSubs = [
    { name: 'Equinox Fitness Club', cost: '$180.00/mo', unused: 'Unused 74 days', category: 'Fitness', iconColor: 'bg-rose-100 text-rose-700' },
    { name: 'Adobe Creative Cloud All Apps', cost: '$54.99/mo', unused: 'Unused 92 days', category: 'Software', iconColor: 'bg-red-100 text-red-700' },
    { name: 'Paramount+ with Showtime', cost: '$11.99/mo', unused: 'Unused 48 days', category: 'Streaming', iconColor: 'bg-orange-100 text-orange-700' },
  ];

  const waveHeights = [30, 60, 95, 50, 100, 75, 45, 90, 85, 65, 80, 55, 75, 90, 45, 80, 60, 35, 70, 50];

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
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  SubZero AI
                </span>
                <h1 className="text-lg font-extrabold text-slate-900 mt-1">Subscription Assassin</h1>
              </div>
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                <Scissors className="w-4 h-4" />
              </div>
            </div>

            {/* Bleeding Money Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 p-4 text-white shadow-lg shadow-rose-600/25">
              <div className="flex items-center justify-between text-xs text-rose-100 font-medium">
                <span>Monthly Recurring Bleed</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">14 Active Subs</span>
              </div>

              <div className="mt-2">
                <div className="text-3xl font-extrabold tracking-tight font-mono">$314.50</div>
                <p className="text-[11px] text-rose-100 mt-0.5">You are wasting ~<strong>$2,960/yr</strong> on unused trials</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-rose-100">
                <span className="flex items-center gap-1 text-white font-bold">
                  <AlertCircle className="w-3.5 h-3.5" /> 3 Zombie Subs Detected
                </span>
                <span className="font-bold underline">1-Click Kill</span>
              </div>
            </div>

            {/* Flagged Subscriptions List */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-xs font-bold text-slate-800">Flagged Unused Subscriptions (60+ days)</h3>
              {zombieSubs.map((sub, i) => (
                <div key={i} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${sub.iconColor}`}>
                      {sub.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">{sub.name}</p>
                      <p className="text-[9.5px] text-rose-600 font-medium">{sub.unused}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 font-mono">{sub.cost}</p>
                    <span className="text-[9px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">Kill</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Dock */}
          <div className="pb-1 pt-2 flex flex-col items-center shrink-0">
            <div className="mb-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10.5px] font-medium shadow-2xs">
              <Sparkles className="w-3 h-3 text-rose-600" />
              <span>Tap to auto-cancel zombie subscriptions</span>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 rounded-full bg-rose-500/20 animate-ping opacity-75 pointer-events-none" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  sounds.playMicStart();
                  setScreen('recording');
                }}
                className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-rose-700 flex items-center justify-center text-white shadow-lg shadow-rose-600/40 border-2 border-white/40 cursor-pointer"
              >
                <Scissors className="w-6 h-6 text-white drop-shadow" />
              </motion.button>
            </div>

            <p className="mt-2 text-xs font-bold text-slate-900">Hold to Speak or Auto-Cancel</p>
            <p className="text-[9.5px] text-slate-400">"Cancel Equinox and Adobe CC today..."</p>
          </div>
        </motion.div>
      )}

      {/* SCREEN 2: CANCEL AGENT ACTIVE */}
      {(screen === 'recording' || screen === 'processing') && (
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
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              {screen === 'recording' ? 'Listening to Cancellation...' : 'Bypassing Dark Patterns...'}
            </span>
            <button onClick={() => setScreen('ready')} className="text-xs font-bold text-rose-600">Skip &gt;</button>
          </div>

          <div className="my-auto space-y-3">
            {screen === 'recording' ? (
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-2.5 text-slate-500 text-[11px] font-medium">
                    <Volume2 className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                    <span>Voice Cancellation Order • 44.1 kHz</span>
                  </div>
                  <div className="h-16 flex items-center justify-center gap-[3.5px] px-1 overflow-hidden">
                    {waveHeights.map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [`${h * 0.2}%`, `${h}%`, `${h * 0.35}%`] }}
                        transition={{ duration: 0.5 + (i % 5) * 0.08, repeat: Infinity, repeatType: 'reverse' }}
                        className="w-[4px] rounded-full bg-gradient-to-t from-rose-600 to-red-400"
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-rose-100 shadow-sm min-h-[125px]">
                  <div className="flex justify-between text-[9.5px] font-bold text-rose-700 mb-1 border-b border-slate-100 pb-1">
                    <span>CANCELLATION LEGAL DISPATCH</span>
                    <span className="text-slate-400">0:02</span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed min-h-[55px]">
                    {displayedWords.map((w, i) => (
                      <span key={i} className="inline-block mr-1 text-slate-800">{w}</span>
                    ))}
                    <span className="inline-block w-1.5 h-3.5 bg-rose-600 animate-pulse align-middle" />
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-rose-600 to-red-600 rounded-2xl p-3 text-white shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-200 animate-spin" />
                      <span className="text-xs font-bold">Enforcing FTC Click-to-Cancel rules...</span>
                    </div>
                    <span className="text-xs font-mono font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-1.5 text-xs">
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase">Automated Actions</p>
                  <div className="flex justify-between p-1.5 rounded bg-rose-50 text-slate-800">
                    <span>✓ Equinox: Certified cancellation dispatched</span>
                    <span className="font-bold text-emerald-600">Saved $180/mo</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-rose-50 text-slate-800">
                    <span>✓ Adobe CC: 1-click legal waiver submitted</span>
                    <span className="font-bold text-emerald-600">Saved $54/mo</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-rose-50 text-slate-800">
                    <span>✓ Bank Auth: Recurring charge block armed</span>
                    <span className="font-bold text-blue-600">Protected</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center pb-1 text-[10px] text-slate-400">
            California AB-390 & FTC Compliance Agent
          </div>
        </motion.div>
      )}

      {/* SCREEN 3: SAVINGS CERTIFICATE */}
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
            <span className="text-xs font-bold text-slate-800 font-mono">Receipt #SZ-9914</span>
            <button onClick={() => setScreen('home')} className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Certificate Card */}
          <div className="bg-white rounded-2xl border border-emerald-300 p-3 shadow-md space-y-2">
            <div className="flex items-start justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Subscriptions Terminated</h3>
                  <p className="text-[9.5px] text-slate-500">Legal Confirmation Received</p>
                </div>
              </div>
              <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Confirmed
              </span>
            </div>

            {/* Big Annual Savings */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/15 to-teal-500/10 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase text-emerald-800">Your Annual Savings</p>
                <p className="text-[8.5px] text-emerald-700">Kept in your pocket every year</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-emerald-800 font-mono">+$2,808.00</span>
              </div>
            </div>

            {/* Cancelled List */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between p-1.5 rounded-lg bg-slate-50">
                <span className="text-slate-800">Equinox (Ref #EQ-8849)</span>
                <span className="font-bold text-emerald-700 font-mono">-$180.00/mo</span>
              </div>
              <div className="flex justify-between p-1.5 rounded-lg bg-slate-50">
                <span className="text-slate-800">Adobe Creative Cloud (Ref #AD-1192)</span>
                <span className="font-bold text-emerald-700 font-mono">-$54.00/mo</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-1.5 shrink-0">
            <button
              onClick={handleCancelAll}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{isCancelled ? 'Card Block Token Active!' : 'Download Legal Cancellation Proof'}</span>
            </button>
            <button
              onClick={() => sounds.playTap()}
              className="w-full py-2 px-3 rounded-xl bg-white text-slate-800 font-bold text-xs border border-slate-300 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Block Future Merchant Auto-Charges</span>
            </button>
          </div>

          {/* Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-24 left-2 right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-2.5 z-50"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Proof Downloaded!</h4>
                  <p className="text-[10px] text-emerald-400">Merchant cannot legally recharge your card</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
