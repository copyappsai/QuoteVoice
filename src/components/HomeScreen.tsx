import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  TrendingUp, 
  ChevronRight, 
  Settings, 
  Users, 
  Zap,
  Flame,
  Wrench,
  Sparkles,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Quote } from '../types';
import { storage } from '../services/storage';
import { sounds } from '../utils/audio';

interface HomeScreenProps {
  onStartRecord: (initialTranscript?: string) => void;
  onOpenQuote: (quote: Quote) => void;
  onOpenClients: () => void;
  onOpenSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartRecord,
  onOpenQuote,
  onOpenClients,
  onOpenSettings,
}) => {
  const profile = storage.getProfile();
  const metrics = storage.getMetrics();
  const [quotes, setQuotes] = useState<Quote[]>(storage.getQuotes());
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'draft'>('all');
  const [search, setSearch] = useState('');

  const handleMicClick = () => {
    sounds.playMicStart();
    onStartRecord();
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'pending'
        ? q.status === 'sent' || q.status === 'draft'
        : q.status === filter;

    const matchesSearch =
      q.clientName.toLowerCase().includes(search.toLowerCase()) ||
      q.jobTitle.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full px-4 justify-between"
    >
      {/* Upper Content Section */}
      <div className="space-y-3 overflow-y-auto no-scrollbar pr-0.5">
        
        {/* Top Header: Profile & Navigation Icons */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-white">
                {profile.ownerName.charAt(0) || 'M'}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-800">
                  ⚡ {profile.businessName}
                </span>
              </div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                Hey {profile.ownerName.split(' ')[0]} 👋
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => {
                sounds.playTap();
                onOpenClients();
              }}
              className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 shadow-2xs active:scale-95 transition-transform"
              title="Client Directory"
            >
              <Users className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => {
                sounds.playTap();
                onOpenSettings();
              }}
              className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 shadow-2xs active:scale-95 transition-transform"
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Monthly Performance Revenue Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB] p-4 text-white shadow-lg shadow-blue-600/25">
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
                ${metrics.totalRevenue.toLocaleString()}
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
                <p className="text-xs font-bold mt-0.5">{metrics.quoteCount} sent</p>
              </div>
              <div className="border-x border-white/15">
                <p className="text-[9.5px] text-blue-200 font-medium">Win Rate</p>
                <p className="text-xs font-bold mt-0.5 text-emerald-300">{metrics.winRate}%</p>
              </div>
              <div>
                <p className="text-[9.5px] text-blue-200 font-medium">Avg Close</p>
                <p className="text-xs font-bold mt-0.5">{metrics.avgTurnaround}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
          {[
            { id: 'all', label: 'All' },
            { id: 'paid', label: 'Paid' },
            { id: 'pending', label: 'Pending' },
            { id: 'draft', label: 'Drafts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playTap();
                setFilter(tab.id as any);
              }}
              className={`px-3 py-1 rounded-full text-[10.5px] font-bold transition-all shrink-0 cursor-pointer ${
                filter === tab.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quotes Section Header */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Recent Quotes</span>
              <span className="text-[9.5px] font-semibold bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded-full">
                {filteredQuotes.length}
              </span>
            </h2>
          </div>

          {/* List of Quotes */}
          <div className="space-y-1.5">
            {filteredQuotes.map((q) => {
              const isPaid = q.status === 'paid';
              const isPending = q.status === 'sent' || q.status === 'draft';
              
              let IconComp = Wrench;
              let iconColor = 'text-blue-500 bg-blue-50';
              if (q.tradeType === 'electrical') {
                IconComp = Zap;
                iconColor = 'text-amber-500 bg-amber-50';
              } else if (q.tradeType === 'hvac') {
                IconComp = Flame;
                iconColor = 'text-orange-500 bg-orange-50';
              }

              return (
                <div
                  key={q.id}
                  onClick={() => {
                    sounds.playTap();
                    onOpenQuote(q);
                  }}
                  className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-2xs flex items-center justify-between hover:border-blue-400 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor} shrink-0`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-slate-900">{q.clientName}</p>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded border capitalize ${
                          isPaid ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {q.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium truncate max-w-[150px]">{q.jobTitle}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-extrabold text-slate-900 font-mono">${q.total.toLocaleString()}</p>
                    <p className="text-[9.5px] text-slate-400">{q.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Glowing Microphone Action Dock */}
      <div className="pb-1 pt-2 flex flex-col items-center shrink-0">
        
        {/* Prompt pill */}
        <div className="mb-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10.5px] font-medium shadow-2xs">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>Tap to speak instant quote</span>
        </div>

        {/* Large Glowing Blue Mic Button */}
        <div className="relative flex items-center justify-center">
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
