import React from 'react';
import { 
  Play, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Zap,
  Mic,
  Moon,
  ChefHat,
  Gamepad2,
  HeartPulse,
  Compass,
  Wind,
  Coffee,
  Volume2 as VolumeIcon,
  BookOpen,
  Activity,
  Shield,
  Plane,
  Box,
  EyeOff,
  Leaf
} from 'lucide-react';
import { PrototypeId, PROTOTYPE_CATALOG } from '../types/prototypes';

interface PromoControlsProps {
  activePrototype: PrototypeId;
  onSelectPrototype: (id: PrototypeId) => void;
  currentScreen: string;
  onAutoPlay: () => void;
  isAutoPlaying: boolean;
  autoPlayProgress: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
}

export const PromoControls: React.FC<PromoControlsProps> = ({
  activePrototype,
  onSelectPrototype,
  onAutoPlay,
  isAutoPlaying,
  autoPlayProgress,
  soundEnabled,
  onToggleSound,
  onReset,
}) => {
  const currentApp = PROTOTYPE_CATALOG.find((p) => p.id === activePrototype) || PROTOTYPE_CATALOG[0];

  const getIcon = (id: PrototypeId) => {
    switch (id) {
      case 'vapestop': return Wind;
      case 'presence': return Compass;
      case 'auramatch': return Sparkles;
      case 'caffeineclock': return Coffee;
      case 'noisezero': return VolumeIcon;
      case 'speedread': return BookOpen;
      case 'carblens': return Activity;
      case 'rentproof': return Shield;
      case 'flightpulse': return Plane;
      case 'memorypalace': return Box;
      case 'ghostfilter': return EyeOff;
      case 'plantwhisper': return Leaf;
      case 'quotevoice': return Mic;
      case 'sleeppulse': return Moon;
      case 'pantrychef': return ChefHat;
      case 'habitquest': return Gamepad2;
      case 'petvitals': return HeartPulse;
      default: return Zap;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-3 px-3 space-y-2">
      
      {/* 1. Prototype Suite Scrollable Selector Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-neutral-900/90 p-1.5 rounded-2xl border border-neutral-800 backdrop-blur-md shadow-xl">
        {PROTOTYPE_CATALOG.map((proto) => {
          const isActive = proto.id === activePrototype;
          const IconComp = getIcon(proto.id);

          return (
            <button
              key={proto.id}
              onClick={() => onSelectPrototype(proto.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? `bg-gradient-to-r ${proto.accentGradient} text-white shadow-md shadow-black/40`
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{proto.name}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                {proto.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Promo Video Controller & Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl px-4 py-2.5 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-extrabold text-white tracking-tight">{currentApp.name}</h2>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-800 px-2 py-0.5 rounded-full">
              {currentApp.category}
            </span>
            <span className="text-[9px] font-semibold text-neutral-500 hidden md:inline-block">
              • Style: {currentApp.designStyle}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 hidden sm:block">
            {currentApp.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAutoPlay}
            disabled={isAutoPlaying}
            className={`relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
              isAutoPlaying
                ? 'bg-blue-600/80 text-white ring-2 ring-blue-400'
                : 'bg-white hover:bg-neutral-200 text-neutral-950 font-black'
            }`}
          >
            {isAutoPlaying && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-black/20 transition-all"
                style={{ width: `${autoPlayProgress}%` }}
              />
            )}
            <Play className={`w-3.5 h-3.5 ${isAutoPlaying ? 'animate-pulse' : 'fill-black'}`} />
            <span className="relative z-10">
              {isAutoPlaying ? `Promo (${Math.round(autoPlayProgress)}%)` : 'Auto-Play (15s)'}
            </span>
          </button>

          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
              soundEnabled 
                ? 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-neutral-300'
            }`}
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs transition-colors cursor-pointer"
            title="Reset active screen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
