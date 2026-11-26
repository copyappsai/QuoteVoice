import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Swords, 
  Shield, 
  Trophy, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Gift,
  RotateCcw
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const HabitQuestApp: React.FC = () => {
  const [screen, setScreen] = useState<'questboard' | 'bossbattle' | 'victory'>('questboard');
  const [bossHp, setBossHp] = useState(380);
  const [isStriking, setIsStriking] = useState(false);

  const startBossBattle = () => {
    sounds.playTap();
    setScreen('bossbattle');
  };

  const handleStrikeBoss = () => {
    sounds.playTap();
    setIsStriking(true);
    setTimeout(() => setIsStriking(false), 300);

    const nextHp = Math.max(0, bossHp - 190);
    setBossHp(nextHp);

    if (nextHp <= 0) {
      setTimeout(() => {
        sounds.playLevelUp();
        setScreen('victory');
      }, 500);
    }
  };

  return (
    <div className="w-full h-full bg-[#0d0918] text-slate-100 flex flex-col justify-between pt-10 pb-5 px-4 overflow-hidden relative selection:bg-amber-500">
      
      {/* RPG Ambient Neon Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-4 w-48 h-48 bg-purple-600/15 rounded-full blur-[80px] pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* SCREEN 1: GUILD HALL & HERO CHARACTER CARD */}
        {screen === 'questboard' && (
          <motion.div
            key="questboard"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold tracking-tight">HabitQuest</h1>
                    <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">ADHD RPG Battleground</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-black text-amber-300">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>LVL 14</span>
                </div>
              </div>

              {/* Hero Status Card */}
              <div className="bg-gradient-to-r from-purple-950/60 to-neutral-900 border border-purple-800/40 rounded-2xl p-3.5 my-2 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="text-2xl">🧙‍♂️</div>
                    <div>
                      <p className="text-xs font-black text-white">Sir Focus • Paladin</p>
                      <p className="text-[10px] text-purple-300">Streak: 12 Days Unbroken 🔥</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-500/30 text-purple-200 font-bold px-2 py-0.5 rounded-md">820 / 1000 XP</span>
                </div>

                {/* HP & Mana Bars */}
                <div className="space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-[9px] font-bold text-neutral-400">
                    <span>HEALTH (HP)</span>
                    <span className="text-emerald-400">92 / 100</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-emerald-500 rounded-full" />
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-bold text-neutral-400 pt-1">
                    <span>FOCUS MANA (XP)</span>
                    <span className="text-amber-400">82%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden">
                    <div className="w-[82%] h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Active Daily Bounties */}
              <div className="my-2 space-y-2">
                <p className="text-xs font-extrabold text-slate-300">Today's Boss Raids & Quests:</p>

                <div className="bg-neutral-900/90 border border-amber-900/40 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Swords className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-xs font-bold text-white">Slay Procrastination Demon</p>
                      <p className="text-[10px] text-neutral-400">25 min deep Pomodoro focus</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400">+250 XP</span>
                </div>

                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <div>
                      <p className="text-xs font-bold text-white">Potion of Hydration</p>
                      <p className="text-[10px] text-neutral-400">Drink 2L fresh water</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-cyan-400">+80 XP</span>
                </div>
              </div>
            </div>

            {/* Enter Dungeon CTA */}
            <div className="pt-2">
              <button
                onClick={startBossBattle}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 text-white rounded-xl font-black text-sm shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Swords className="w-4 h-4" />
                <span>Enter Boss Battle (25m Focus) ⚔️</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 2: 8-BIT BOSS BATTLE & POMODORO TIMER */}
        {screen === 'bossbattle' && (
          <motion.div
            key="bossbattle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col justify-between py-2 text-center"
          >
            <div>
              <div className="flex items-center justify-between text-neutral-400 text-xs">
                <span>Dungeon Chamber #4</span>
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-rose-500" />
                  Boss Raid Active
                </span>
              </div>

              {/* Boss Graphic & HP */}
              <div className="my-4">
                <div className={`text-6xl my-2 transition-transform ${isStriking ? 'scale-125 rotate-6 text-rose-500' : 'animate-bounce'}`}>
                  👹
                </div>
                <h2 className="text-sm font-black text-rose-400">Distraction Demon</h2>
                <div className="w-48 mx-auto mt-2 space-y-1">
                  <div className="w-full h-3 bg-neutral-950 rounded-full border border-rose-900 overflow-hidden">
                    <div 
                      className="h-full bg-rose-600 transition-all duration-300" 
                      style={{ width: `${(bossHp / 380) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 font-bold">HP: {bossHp} / 380</p>
                </div>
              </div>

              {/* Pomodoro Focus Clock */}
              <div className="bg-neutral-900/90 border border-amber-900/40 rounded-2xl p-3 my-2">
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Deep Work Shield Active</span>
                </div>
                <span className="text-4xl font-black text-white tracking-tight">24:45</span>
                <p className="text-[10px] text-neutral-400 mt-1">Leaving app cancels hero strike & deals -20 HP</p>
              </div>
            </div>

            {/* Strike Boss Action Button */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleStrikeBoss}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white rounded-xl font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Swords className="w-4 h-4" />
                <span>Strike Boss with Focus Blade! ⚔️</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: EPIC VICTORY & LOOT DROP */}
        {screen === 'victory' && (
          <motion.div
            key="victory"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex-1 flex flex-col justify-between text-center"
          >
            <div>
              <div className="text-5xl my-2 animate-bounce">🏆</div>
              <h2 className="text-lg font-black text-amber-400 tracking-tight">Boss Slain!</h2>
              <p className="text-xs text-neutral-300 font-medium">Distraction Demon banished for 24 hours.</p>

              {/* Rewards Card */}
              <div className="bg-gradient-to-br from-amber-950/60 to-purple-950/60 border border-amber-600/40 rounded-2xl p-4 my-3">
                <div className="flex items-center justify-center gap-2 text-xs font-black text-amber-300 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>LEVEL UP TO 15!</span>
                </div>

                <div className="flex items-center justify-around my-2">
                  <div>
                    <span className="text-xs text-neutral-400">Earned XP</span>
                    <p className="text-base font-black text-amber-400">+250 XP</p>
                  </div>
                  <div className="w-px h-8 bg-neutral-800" />
                  <div>
                    <span className="text-xs text-neutral-400">Gold Coins</span>
                    <p className="text-base font-black text-yellow-400">+45 🪙</p>
                  </div>
                </div>

                {/* Legendary Item Drop */}
                <div className="mt-3 bg-neutral-950/80 border border-amber-500/40 rounded-xl p-2.5 flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shrink-0">
                    🛡️
                  </div>
                  <div>
                    <p className="text-xs font-black text-amber-300">Obsidian Focus Aegis</p>
                    <p className="text-[10px] text-neutral-400">Legendary Relic (+20% ADHD distraction block)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  sounds.playTap();
                  setBossHp(380);
                  setScreen('questboard');
                }}
                className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Guild Hall</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
