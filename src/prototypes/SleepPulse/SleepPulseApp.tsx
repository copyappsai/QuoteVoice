import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, 
  Sparkles, 
  Bell, 
  Play, 
  Volume2, 
  Heart, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Activity,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const SleepPulseApp: React.FC = () => {
  const [screen, setScreen] = useState<'dashboard' | 'night' | 'insights'>('dashboard');
  const [smartAlarmOn, setSmartAlarmOn] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const startNightMonitor = () => {
    sounds.playAiProcessing();
    setScreen('night');
  };

  const triggerWakeUp = () => {
    sounds.playSuccessDing();
    setScreen('insights');
  };

  const toggleAudio = () => {
    sounds.playTap();
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="w-full h-full bg-[#070814] text-slate-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-purple-600">
      
      {/* Ambient sleep glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-4 w-48 h-48 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* SCREEN 1: SLEEP SCORE & TONIGHT'S SCHEDULE */}
        {screen === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold tracking-tight">SleepPulse</h1>
                    <p className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">Bio-Hacking Lab</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded-full text-[11px] text-slate-300">
                  <Heart className="w-3 h-3 text-rose-500 animate-pulse" />
                  <span>56 BPM</span>
                </div>
              </div>

              {/* Main Sleep Quality Ring Widget */}
              <div className="bg-gradient-to-b from-purple-950/40 to-neutral-900/80 border border-purple-800/30 rounded-2xl p-4 text-center relative overflow-hidden my-2 shadow-lg">
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" className="stroke-purple-950/80" strokeWidth="9" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="42" 
                      className="stroke-purple-500" 
                      strokeWidth="9" 
                      strokeDasharray="264" 
                      strokeDashoffset="24" 
                      strokeLinecap="round" 
                      fill="transparent" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black tracking-tight text-white">92</span>
                    <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Sleep Score</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-2 text-xs font-semibold text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+6% vs last week (Optimal REM)</span>
                </div>
              </div>

              {/* Sleep Stage Breakdown */}
              <div className="grid grid-cols-3 gap-2 my-2 text-center">
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2">
                  <p className="text-[10px] text-neutral-400">Deep Sleep</p>
                  <p className="text-xs font-bold text-indigo-400">1h 48m</p>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2">
                  <p className="text-[10px] text-neutral-400">REM Phase</p>
                  <p className="text-xs font-bold text-purple-400">2h 15m</p>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2">
                  <p className="text-[10px] text-neutral-400">Resting HR</p>
                  <p className="text-xs font-bold text-rose-400">54 bpm</p>
                </div>
              </div>

              {/* Smart Wake Window Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Smart Wake Window</p>
                    <p className="text-[10px] text-neutral-400">Wakes in lightest REM (06:45 - 07:15)</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sounds.playTap();
                    setSmartAlarmOn(!smartAlarmOn);
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    smartAlarmOn ? 'bg-purple-600' : 'bg-neutral-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${smartAlarmOn ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            {/* Bottom Floating Action */}
            <div className="pt-2">
              <button
                onClick={startNightMonitor}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Moon className="w-4 h-4 fill-white" />
                <span>Start Night Monitor 🌙</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 2: ACTIVE NIGHT MONITORING */}
        {screen === 'night' && (
          <motion.div
            key="night"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col justify-between py-2 text-center"
          >
            <div>
              <div className="flex items-center justify-between text-neutral-400 text-xs">
                <span>Night Active</span>
                <span className="flex items-center gap-1 text-purple-400 font-semibold">
                  <Activity className="w-3.5 h-3.5 animate-pulse text-purple-400" />
                  AI Listening
                </span>
              </div>

              {/* Glowing Night Clock */}
              <div className="my-6">
                <span className="text-5xl font-black tracking-tight text-white/95">03:24</span>
                <p className="text-xs text-purple-300/80 font-medium mt-1">Deep Sleep Stage 3 • 54 BPM</p>
              </div>

              {/* Pulse Sphere */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-4">
                <div className="absolute inset-0 bg-purple-600/20 rounded-full animate-ping opacity-30" />
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-900 to-indigo-700 border border-purple-400/40 flex items-center justify-center shadow-xl shadow-purple-600/30">
                  <Moon className="w-10 h-10 text-purple-200 fill-purple-200" />
                </div>
              </div>

              {/* Real-time Sleep Talk Detector Event */}
              <div className="bg-purple-950/50 border border-purple-500/40 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-purple-300 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                    Sleep Audio Captured
                  </span>
                  <span className="text-[10px] text-neutral-400">03:14 AM (4.2s)</span>
                </div>
                <p className="text-[11px] text-slate-200 italic">"Where did I put the car keys... oh wait..."</p>
                
                {/* Audio Waveform */}
                <div className="flex items-center gap-1 mt-2 h-4">
                  {[20, 45, 90, 60, 100, 35, 75, 40, 85, 30, 70, 95, 40, 20].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-purple-400/80 rounded-full transition-all"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Wake Up Trigger Button */}
            <div className="space-y-2 pt-2">
              <button
                onClick={triggerWakeUp}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Morning Wakeup (07:05 AM)</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: MORNING INSIGHTS & SLEEP TALK REPLAY */}
        {screen === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-white">Morning Briefing</h2>
                    <p className="text-[10px] text-neutral-400">Optimal REM Wake Triggered</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  8h 12m Slept
                </span>
              </div>

              {/* Audio Journal Clip Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 my-2 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-200">Captured Night Audio (1 clip)</span>
                  <span className="text-[10px] text-purple-400 font-semibold">03:14 AM</span>
                </div>
                <div className="flex items-center gap-3 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800">
                  <button
                    onClick={toggleAudio}
                    className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shrink-0 cursor-pointer shadow"
                  >
                    {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-slate-100">"Where did I put the keys..."</p>
                    <p className="text-[9px] text-neutral-400">Lucid REM sleep talk • Low volume</p>
                  </div>
                </div>
              </div>

              {/* AI Physician Sleep Report */}
              <div className="bg-gradient-to-br from-purple-950/40 to-neutral-900 border border-purple-800/30 rounded-xl p-3 my-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>AI Recovery Diagnosis</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Your circadian alignment was flawless. Zero obstructive snoring, HRV peaked at 62ms during 02:40 AM deep restoration phase.
                </p>
              </div>

              {/* Stat summary */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-neutral-400">Awakenings</span>
                  <p className="text-sm font-extrabold text-emerald-400">0 (Unbroken)</p>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-neutral-400">Sleep Regularity</span>
                  <p className="text-sm font-extrabold text-purple-400">96%</p>
                </div>
              </div>
            </div>

            {/* Back to Dashboard Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  sounds.playTap();
                  setScreen('dashboard');
                }}
                className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Sleep Dashboard</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
