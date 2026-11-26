import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Battery } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
  activeScreen: 'home' | 'recording' | 'processing' | 'ready';
  isAutoPlaying?: boolean;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  children,
  activeScreen,
}) => {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Ambient luxury studio backdrop glow */}
      <div 
        className="absolute w-[440px] h-[780px] rounded-[60px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-teal-400/15 blur-[90px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Hardware Buttons - Left side: Action Button, Volume Up, Volume Down */}
      <div className="absolute -left-[3.5px] top-[125px] w-[3.5px] h-[24px] bg-[#3a3d45] rounded-l-[2px] shadow-sm" />
      <div className="absolute -left-[3.5px] top-[165px] w-[3.5px] h-[48px] bg-[#3a3d45] rounded-l-[2px] shadow-sm" />
      <div className="absolute -left-[3.5px] top-[225px] w-[3.5px] h-[48px] bg-[#3a3d45] rounded-l-[2px] shadow-sm" />

      {/* Hardware Button - Right side: Power Button */}
      <div className="absolute -right-[3.5px] top-[175px] w-[3.5px] h-[68px] bg-[#3a3d45] rounded-r-[2px] shadow-sm" />

      {/* Outer Titanium Chassis: authentic Grade 5 Black Titanium bezel */}
      <div className="relative w-[364px] h-[748px] sm:w-[372px] sm:h-[758px] bg-gradient-to-b from-[#2a2c33] via-[#1a1b20] to-[#141519] rounded-[52px] p-[3px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_2px_rgba(255,255,255,0.25)]">
        
        {/* Ultra-thin uniform 1.15mm black bezel */}
        <div className="relative w-full h-full bg-black rounded-[49px] p-[6.5px]">
          
          {/* Ear Speaker Micro-slit at top bezel */}
          <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#1a1a1a] rounded-full z-50 pointer-events-none" />

          {/* Actual Screen Canvas: Screen color extends to the very top & bottom under status bar */}
          <div className="relative w-full h-full bg-[#F8FAFD] rounded-[43px] overflow-hidden flex flex-col shadow-inner">
            
            {/* iOS Floating Status Bar (Transparent background, sits seamlessly over app canvas) */}
            <div className="absolute top-0 left-0 right-0 z-50 h-[46px] px-6 flex items-center justify-between pointer-events-none select-none">
              
              {/* Left: Clock */}
              <span className="text-[13px] font-semibold tracking-tight text-slate-900 font-sans pl-1">
                9:41
              </span>

              {/* Center: Dynamic Island Floating Pill */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[9px] pointer-events-auto">
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className={`bg-black rounded-full flex items-center justify-between px-2.5 text-white shadow-md transition-all ${
                    activeScreen === 'recording'
                      ? 'w-[185px] h-[30px] border border-neutral-800'
                      : activeScreen === 'processing'
                      ? 'w-[175px] h-[30px] border border-indigo-900/50'
                      : 'w-[115px] h-[28px]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {activeScreen === 'recording' ? (
                      <motion.div
                        key="island-rec"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        className="flex items-center justify-between w-full text-[11px] font-medium"
                      >
                        <div className="flex items-center gap-1.5 pl-0.5">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-red-400 font-mono text-[10px]">0:02</span>
                        </div>
                        
                        {/* Mini equalizing wave */}
                        <div className="flex items-center gap-[2px] h-3 pr-1">
                          {[0.7, 1.4, 0.5, 1.8, 1.0].map((h, i) => (
                            <motion.span
                              key={i}
                              animate={{ height: ['3px', `${h * 9}px`, '3px'] }}
                              transition={{ duration: 0.45, repeat: Infinity, delay: i * 0.08 }}
                              className="w-[2px] bg-red-400 rounded-full"
                            />
                          ))}
                        </div>
                      </motion.div>
                    ) : activeScreen === 'processing' ? (
                      <motion.div
                        key="island-proc"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        className="flex items-center justify-between w-full text-[10px] font-medium px-1"
                      >
                        <span className="text-indigo-400 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                          AI Parsing
                        </span>
                        <span className="text-indigo-300 font-mono text-[9.5px]">100%</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="island-idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between w-full px-1"
                      >
                        {/* Front camera lens reflection */}
                        <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-neutral-800 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-blue-950" />
                        </div>
                        {/* Ambient sensor */}
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Right: Cellular, 5G, Wifi, Battery */}
              <div className="flex items-center gap-1.5 text-slate-900 pr-1">
                {/* 4 Cell Bars */}
                <div className="flex items-end gap-[1px] h-2.5">
                  <span className="w-[2.5px] h-[3px] bg-slate-900 rounded-[0.5px]" />
                  <span className="w-[2.5px] h-[5px] bg-slate-900 rounded-[0.5px]" />
                  <span className="w-[2.5px] h-[7px] bg-slate-900 rounded-[0.5px]" />
                  <span className="w-[2.5px] h-[9px] bg-slate-900 rounded-[0.5px]" />
                </div>
                <span className="text-[10px] font-semibold tracking-tighter">5G</span>
                <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
                <div className="flex items-center">
                  <Battery className="w-4 h-4 fill-slate-900 stroke-[1.8]" />
                </div>
              </div>

            </div>

            {/* App Screen Content (scrollable, starts under status bar with safe padding) */}
            <div className="relative flex-1 w-full overflow-hidden flex flex-col pt-[46px] pb-4">
              {children}
            </div>

            {/* iOS Bottom Home Indicator (Native floating bar) */}
            <div className="absolute bottom-1 left-0 right-0 z-50 flex justify-center pointer-events-none pb-1">
              <div className="w-32 h-[4px] bg-slate-900/35 rounded-full" />
            </div>

          </div>

        </div>

      </div>

      {/* Screen reflection sheen */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[52px] bg-gradient-to-tr from-white/[0.04] to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};
