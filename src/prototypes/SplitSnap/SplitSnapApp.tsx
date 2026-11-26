import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Receipt, 
  Users, 
  Mic, 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  DollarSign, 
  Sparkles, 
  Check, 
  Volume2,
  TrendingDown,
  RotateCcw,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

interface SplitSnapAppProps {
  onBackToHub?: () => void;
}

export const SplitSnapApp: React.FC<SplitSnapAppProps> = () => {
  const [screen, setScreen] = useState<'home' | 'recording' | 'processing' | 'ready'>('home');
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const fullTranscript = "Dave had the double smash burger and IPA, Sarah had the grilled salmon, Lisa and I shared the truffle fries and sangria, split the 20% tip evenly.";
  const words = fullTranscript.split(' ');

  // Recording & AI parsing flow
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
        setTimeout(() => {
          setScreen('ready');
        }, 120);
      }
    }, 40);

    return () => clearInterval(pTimer);
  }, [screen]);

  const handleSendRequests = () => {
    sounds.playSuccessDing();
    setIsSent(true);
    setShowToast(true);
    try {
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.72 }, colors: ['#10b981', '#14b8a6', '#3b82f6'] });
    } catch {}

    setTimeout(() => setShowToast(false), 4000);
  };

  const splitPeople = [
    { name: 'Dave', items: 'Smash Burger ($22) + Hazy IPA ($9) + Tip', amount: '$37.20', avatar: 'D', bg: 'bg-blue-100 text-blue-700' },
    { name: 'Sarah', items: 'Grilled Salmon ($28) + Sparkling Water + Tip', amount: '$38.40', avatar: 'S', bg: 'bg-emerald-100 text-emerald-700' },
    { name: 'Lisa', items: '1/2 Truffle Fries ($7) + 1/2 Sangria ($12) + Tip', amount: '$22.80', avatar: 'L', bg: 'bg-purple-100 text-purple-700' },
    { name: 'You (Alex)', items: '1/2 Truffle Fries ($7) + 1/2 Sangria ($12) + Tip', amount: '$22.80', avatar: 'A', bg: 'bg-amber-100 text-amber-700' },
  ];

  const waveHeights = [25, 60, 85, 45, 95, 75, 40, 85, 100, 65, 80, 50, 75, 90, 45, 85, 60, 35, 75, 45];

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
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  SplitSnap AI
                </span>
                <h1 className="text-lg font-extrabold text-slate-900 mt-1">Dinner & Bar Tabs</h1>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                A
              </div>
            </div>

            {/* Active Tab Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-4 text-white shadow-lg shadow-emerald-600/25">
              <div className="flex items-center justify-between text-xs text-emerald-100 font-medium">
                <span>Osteria Morini • Table 14</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">4 People</span>
              </div>

              <div className="mt-2">
                <div className="text-3xl font-extrabold tracking-tight font-mono">$121.20</div>
                <p className="text-[11px] text-emerald-100 mt-0.5">Total receipt with tax & 20% tip</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-emerald-100">
                <span>No awkward math • 1-tap requests</span>
                <span className="font-bold text-white">Apple Cash / Venmo</span>
              </div>
            </div>

            {/* Recent Splits List */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-xs font-bold text-slate-800">Recent Group Splits</h3>
              {[
                { place: 'Taco Guild (6 friends)', date: 'Yesterday', amount: '$164.00', status: 'Settled' },
                { place: 'Topgolf Night (4 friends)', date: '3 days ago', amount: '$220.50', status: 'Settled' },
                { place: 'Airbnb Tahoe Cabin (8 friends)', date: 'Last weekend', amount: '$1,480.00', status: 'Settled' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{s.place}</p>
                    <p className="text-[9.5px] text-slate-400">{s.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 font-mono">{s.amount}</p>
                    <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Glowing Mic Action Dock */}
          <div className="pb-1 pt-2 flex flex-col items-center shrink-0">
            <div className="mb-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10.5px] font-medium shadow-2xs">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Tap to speak who ordered what</span>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 rounded-full bg-emerald-500/20 animate-ping opacity-75 pointer-events-none" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  sounds.playMicStart();
                  setScreen('recording');
                }}
                className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/40 border-2 border-white/40 cursor-pointer"
              >
                <Mic className="w-6 h-6 text-white drop-shadow" />
              </motion.button>
            </div>

            <p className="mt-2 text-xs font-bold text-slate-900">Hold to Speak Tab</p>
            <p className="text-[9.5px] text-slate-400">"Dave had the burger, Sarah had salmon..."</p>
          </div>
        </motion.div>
      )}

      {/* SCREEN 2: RECORDING & AI PROCESSING */}
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
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {screen === 'recording' ? 'Listening...' : 'AI Splitting Tab...'}
            </span>
            <button onClick={() => setScreen('ready')} className="text-xs font-bold text-emerald-600">Skip &gt;</button>
          </div>

          <div className="my-auto space-y-3">
            {screen === 'recording' ? (
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-2.5 text-slate-500 text-[11px] font-medium">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    <span>Table Voice Audio • 44.1 kHz</span>
                  </div>
                  <div className="h-16 flex items-center justify-center gap-[3.5px] px-1 overflow-hidden">
                    {waveHeights.map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [`${h * 0.2}%`, `${h}%`, `${h * 0.35}%`] }}
                        transition={{ duration: 0.5 + (i % 5) * 0.08, repeat: Infinity, repeatType: 'reverse' }}
                        className="w-[4px] rounded-full bg-gradient-to-t from-emerald-600 to-teal-400"
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-emerald-100 shadow-sm min-h-[125px]">
                  <div className="flex justify-between text-[9.5px] font-bold text-emerald-600 mb-1 border-b border-slate-100 pb-1">
                    <span>LIVE VOICE TRANSCRIPTION</span>
                    <span className="text-slate-400">0:02</span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed min-h-[55px]">
                    {displayedWords.map((w, i) => (
                      <span key={i} className="inline-block mr-1 text-slate-800">{w}</span>
                    ))}
                    <span className="inline-block w-1.5 h-3.5 bg-emerald-600 animate-pulse align-middle" />
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-3 text-white shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-200 animate-spin" />
                      <span className="text-xs font-bold">Assigning menu items & 20% tip...</span>
                    </div>
                    <span className="text-xs font-mono font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-1.5 text-xs">
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase">Recognized Orders</p>
                  <div className="flex justify-between p-1.5 rounded bg-emerald-50 text-slate-800">
                    <span>✓ Dave: Double Burger + IPA</span>
                    <span className="font-bold font-mono">$37.20</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-emerald-50 text-slate-800">
                    <span>✓ Sarah: Grilled Salmon</span>
                    <span className="font-bold font-mono">$38.40</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-emerald-50 text-slate-800">
                    <span>✓ Lisa & Alex: Truffle Fries + Sangria</span>
                    <span className="font-bold font-mono">$45.60</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center pb-1 text-[10px] text-slate-400">
            AI Voice Tab Splitter • Osteria Morini
          </div>
        </motion.div>
      )}

      {/* SCREEN 3: READY TO SEND VENMO / APPLE CASH */}
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
            <span className="text-xs font-bold text-slate-800 font-mono">Osteria Morini Tab</span>
            <button onClick={() => setScreen('home')} className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Breakdown Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-md space-y-2">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Itemized Friend Breakdown</h3>
                <p className="text-[9.5px] text-slate-500">4 People • Includes 20% Tip & Tax</p>
              </div>
              <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                $121.20 Total
              </span>
            </div>

            <div className="space-y-1.5">
              {splitPeople.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] ${p.bg}`}>
                      {p.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{p.name}</p>
                      <p className="text-[9px] text-slate-500 line-clamp-1">{p.items}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs font-mono text-slate-900">{p.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-1.5 shrink-0">
            <button
              onClick={handleSendRequests}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSent ? 'Venmo Requests Dispatched!' : 'Send 3 Apple Cash / Venmo Requests'}</span>
            </button>
            <button
              onClick={() => sounds.playTap()}
              className="w-full py-2 px-3 rounded-xl bg-white text-slate-800 font-bold text-xs border border-slate-300 flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Share Breakdown Link via iMessage</span>
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
                  <h4 className="text-xs font-bold">Payment Requests Sent!</h4>
                  <p className="text-[10px] text-emerald-400">Venmo & Apple Cash links delivered to 3 friends</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
