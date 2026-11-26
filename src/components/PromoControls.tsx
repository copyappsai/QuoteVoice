import React from 'react';
import { 
  Play, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Video, 
  Sparkles,
  Smartphone,
  Eye,
  Check
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface PromoControlsProps {
  currentScreen: 'home' | 'recording' | 'processing' | 'ready';
  onSelectScreen: (screen: 'home' | 'recording' | 'processing' | 'ready') => void;
  onAutoPlay: () => void;
  isAutoPlaying: boolean;
  autoPlayProgress: number; // 0 to 100
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
}

export const PromoControls: React.FC<PromoControlsProps> = ({
  currentScreen,
  onSelectScreen,
  onAutoPlay,
  isAutoPlaying,
  autoPlayProgress,
  soundEnabled,
  onToggleSound,
  onReset,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6 px-4">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-3 sm:px-5 shadow-2xl">
        
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/30">
            QV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">QuoteVoice</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                Contractor Mobile Prototype
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">
              iPhone 16 Pro • Centered for 15s Screen Recording
            </p>
          </div>
        </div>

        {/* 15s Auto Play Button with Progress Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAutoPlay}
            disabled={isAutoPlaying}
            className={`relative overflow-hidden group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
              isAutoPlaying
                ? 'bg-blue-600/80 text-white shadow-blue-600/25 ring-2 ring-blue-400'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/40'
            }`}
          >
            {isAutoPlaying && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-white/25 transition-all"
                style={{ width: `${autoPlayProgress}%` }}
              />
            )}
            <Play className={`w-3.5 h-3.5 fill-current ${isAutoPlaying ? 'animate-spin' : ''}`} />
            <span className="relative z-10">
              {isAutoPlaying ? `Auto Playing Promo (${Math.round(autoPlayProgress)}%)` : '▶ Auto Play 15s Demo Flow'}
            </span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold border border-neutral-700/80 active:scale-95 transition-all cursor-pointer"
            title="Reset to Home (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-neutral-800 border-neutral-700 text-emerald-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-500'
            }`}
            title={soundEnabled ? 'Sound Effects Active' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Interactive Screen Jump Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => onSelectScreen('home')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'home'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            1. Home
          </button>
          <button
            onClick={() => onSelectScreen('recording')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'recording' || currentScreen === 'processing'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            2. Voice & AI
          </button>
          <button
            onClick={() => onSelectScreen('ready')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'ready'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            3. Quote Ready
          </button>
        </div>

      </div>
    </div>
  );
};
