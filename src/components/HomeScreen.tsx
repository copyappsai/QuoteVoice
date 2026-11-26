import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  TrendingUp, 
  ChevronRight, 
  Bell, 
  Zap,
  Flame,
  Wrench,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface HomeScreenProps {
  onStartRecord: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartRecord }) => {
  const handleMicClick = () => {
    sounds.playMicStart();
    onStartRecord();
  };

  const recentQuotes = [
    {
      id: 'QV-1088',
      name: 'Sarah Jenkins',
      job: 'Panel Upgrade 200A',
      amount: '$1,850',
      status: 'Paid',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
      icon: Zap,
      iconColor: 'text-amber-500 bg-amber-50',
      time: '2h ago',
    },
    {
      id: 'QV-1087',
      name: 'Dave Roberts',
      job: 'Heat Pump Diagnostics',
      amount: '$420',
      status: 'Pending',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200/90',
      icon: Flame,
      iconColor: 'text-orange-500 bg-orange-50',
      time: '5h ago',
    },
    {
      id: 'QV-1086',
      name: 'Marcus Vance',
      job: 'EV Charger Level 2 Install',
      amount: '$1,200',
      status: 'Paid',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
      icon: Wrench,
      iconColor: 'text-blue-500 bg-blue-50',
      time: 'Yesterday',
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full px-4 justify-between"
    >
      {/* Upper Content Section */}
      <div className="space-y-3.5">
        
        {/* Top Header: Mike's Profile & Greeting */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-white">
                M
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-800">
                  ⚡ Mike's Apex Trades
                </span>
              </div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                Hey Mike 👋
              </h1>
            </div>
          </div>

          <button 
            onClick={() => sounds.playTap()}
            className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 shadow-xs active:scale-95 transition-transform"
            title="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Monthly Performance Revenue Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB] p-4 text-white shadow-lg shadow-blue-600/25">
          {/* Subtle glow highlight circles */}
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full blur-lg pointer-events-none" />
          <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-indigo-400/20 rounded-full blur-md pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between text-blue-100 text-xs font-medium">
              <span className="text-[11px] font-semibold text-blue-200">November Sent</span>
              <span className="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-300 backdrop-blur-xs">
                <TrendingUp className="w-2.5 h-2.5" /> +24.8%
              </span>
            </div>

            <div className="mt-2">
              <div className="text-2xl font-extrabold tracking-tight text-white flex items-baseline gap-1 font-mono">
                $14,250
                <span className="text-[11px] font-normal text-blue-200 font-sans">USD</span>
              </div>
              <p className="text-[11px] text-blue-100 font-medium">
                Sent this month
              </p>
            </div>

            {/* Quick stats footer row */}
            <div className="mt-3 pt-2.5 border-t border-white/15 grid grid-cols-3 gap-1 text-center text-white">
              <div>
                <p className="text-[9.5px] text-blue-200 font-medium">Total Quotes</p>
                <p className="text-xs font-bold mt-0.5">14 sent</p>
              </div>
              <div className="border-x border-white/15">
                <p className="text-[9.5px] text-blue-200 font-medium">Win Rate</p>
                <p className="text-xs font-bold mt-0.5 text-emerald-300">92%</p>
              </div>
              <div>
                <p className="text-[9.5px] text-blue-200 font-medium">Avg Close</p>
                <p className="text-xs font-bold mt-0.5">38 sec</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Quotes Section Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Recent Quotes</span>
              <span className="text-[9.5px] font-semibold bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded-full">
                3 New
              </span>
            </h2>
            <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* List of Quotes */}
          <div className="space-y-1.5">
            {recentQuotes.map((q) => {
              const IconComp = q.icon;
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${q.iconColor} shrink-0`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-slate-900">{q.name}</p>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded border ${q.statusColor}`}>
                          {q.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium truncate max-w-[150px]">{q.job}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-extrabold text-slate-900 font-mono">{q.amount}</p>
                    <p className="text-[9.5px] text-slate-400">{q.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Glowing Microphone Action Dock */}
      <div className="pb-2 pt-2 flex flex-col items-center">
        
        {/* Prompt pill */}
        <div className="mb-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10.5px] font-medium shadow-2xs">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>Tap to speak instant quote</span>
        </div>

        {/* Large Glowing Blue Mic Button */}
        <div className="relative flex items-center justify-center">
          {/* Animated concentric pulse waves */}
          <div className="absolute w-20 h-20 rounded-full bg-blue-500/20 animate-ping opacity-75 pointer-events-none" />
          <div className="absolute w-16 h-16 rounded-full bg-blue-600/30 animate-pulse pointer-events-none" />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleMicClick}
            className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/50 animate-mic-glow border-2 border-white/40 cursor-pointer"
          >
            <Mic className="w-6 h-6 text-white drop-shadow" />
          </motion.button>
        </div>

        <button 
          onClick={handleMicClick}
          className="mt-2 text-xs font-bold text-slate-900 tracking-tight hover:text-blue-600 transition-colors cursor-pointer"
        >
          Hold to Speak Quote
        </button>
        <span className="text-[9.5px] text-slate-400 mt-0.5">
          "Quote for John Miller, 4 hours labor..."
        </span>
      </div>
    </motion.div>
  );
};
