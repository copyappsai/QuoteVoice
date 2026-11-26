import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IPhoneFrame } from './components/IPhoneFrame';
import { HomeScreen } from './components/HomeScreen';
import { RecordingScreen } from './components/RecordingScreen';
import { QuoteReadyScreen } from './components/QuoteReadyScreen';
import { ClientsScreen } from './components/ClientsScreen';
import { SettingsModal } from './components/SettingsModal';
import { PromoControls } from './components/PromoControls';
import { VapeStopApp } from './prototypes/VapeStop/VapeStopApp';
import { PresenceApp } from './prototypes/Presence/PresenceApp';
import { AuraMatchApp } from './prototypes/AuraMatch/AuraMatchApp';
import { CaffeineClockApp } from './prototypes/CaffeineClock/CaffeineClockApp';
import { NoiseZeroApp } from './prototypes/NoiseZero/NoiseZeroApp';
import { SpeedReadApp } from './prototypes/SpeedRead/SpeedReadApp';
import { CarbLensApp } from './prototypes/CarbLens/CarbLensApp';
import { RentProofApp } from './prototypes/RentProof/RentProofApp';
import { FlightPulseApp } from './prototypes/FlightPulse/FlightPulseApp';
import { MemoryPalaceApp } from './prototypes/MemoryPalace/MemoryPalaceApp';
import { GhostFilterApp } from './prototypes/GhostFilter/GhostFilterApp';
import { PlantWhisperApp } from './prototypes/PlantWhisper/PlantWhisperApp';
import { SleepPulseApp } from './prototypes/SleepPulse/SleepPulseApp';
import { PantryChefApp } from './prototypes/PantryChef/PantryChefApp';
import { HabitQuestApp } from './prototypes/HabitQuest/HabitQuestApp';
import { PetVitalsApp } from './prototypes/PetVitals/PetVitalsApp';
import { PrototypeId, PROTOTYPE_CATALOG } from './types/prototypes';
import { Quote } from './types';
import { storage } from './services/storage';
import { sounds } from './utils/audio';

export type ScreenState = 'home' | 'recording' | 'processing' | 'ready' | 'clients';

export function App() {
  const [activePrototype, setActivePrototype] = useState<PrototypeId>('vapestop');
  const [activeScreen, setActiveScreen] = useState<ScreenState>('home');
  const [activeQuote, setActiveQuote] = useState<Quote>(storage.getQuotes()[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string | undefined>(undefined);
  
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Check if opened with ?clean=true
  const isCleanRecording = typeof window !== 'undefined' && (
    window.location.search.includes('clean=true') || window.location.hash.includes('clean')
  );

  const autoPlayTimers = useRef<any[]>([]);
  const autoPlayInterval = useRef<any>(null);

  const clearAutoPlay = useCallback(() => {
    autoPlayTimers.current.forEach((t) => clearTimeout(t));
    autoPlayTimers.current = [];
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = null;
    }
    setIsAutoPlaying(false);
    setAutoPlayProgress(0);
  }, []);

  const handleReset = useCallback(() => {
    clearAutoPlay();
    sounds.playTap();
    setActiveScreen('home');
  }, [clearAutoPlay]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playTap();
  };

  const handleSelectPrototype = (id: PrototypeId) => {
    clearAutoPlay();
    sounds.playTap();
    setActivePrototype(id);
    setActiveScreen('home');
  };

  // Run 15-second promo demo flow for the active app
  const handleAutoPlay = () => {
    clearAutoPlay();
    setIsAutoPlaying(true);
    setAutoPlayProgress(0);

    const totalDuration = 14500;
    const startTime = Date.now();

    autoPlayInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      setAutoPlayProgress(pct);

      if (elapsed >= totalDuration) {
        if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
        setIsAutoPlaying(false);
        setAutoPlayProgress(100);
      }
    }, 50);

    if (activePrototype === 'quotevoice') {
      setActiveScreen('home');
      const t1 = setTimeout(() => {
        sounds.playMicStart();
        setActiveScreen('recording');
      }, 1200);

      const t2 = setTimeout(() => setActiveScreen('processing'), 3300);
      const t3 = setTimeout(() => setActiveScreen('ready'), 4700);
      const t4 = setTimeout(() => {
        const sendBtn = document.querySelector('button[class*="bg-emerald-500"]') as HTMLButtonElement | null;
        if (sendBtn) sendBtn.click();
      }, 7500);

      autoPlayTimers.current = [t1, t2, t3, t4];
    } else {
      // Flow for prototypes:
      const t1 = setTimeout(() => {
        const actionBtn = document.querySelector('button[class*="rounded-2xl"][class*="shadow-xl"], button[class*="rounded-xl"][class*="shadow-lg"], button[class*="rounded-2xl"][class*="font-black"]') as HTMLButtonElement | null;
        if (actionBtn) actionBtn.click();
      }, 1200);

      const t2 = setTimeout(() => {
        const ctaBtn = document.querySelector('button[class*="rounded-2xl"][class*="shadow-lg"], button[class*="rounded-xl"][class*="shadow-md"]') as HTMLButtonElement | null;
        if (ctaBtn) ctaBtn.click();
      }, 7000);

      autoPlayTimers.current = [t1, t2];
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleAutoPlay();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePrototype, clearAutoPlay, handleReset]);

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col justify-between py-3 px-4 relative overflow-x-hidden selection:bg-cyan-600 selection:text-white">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Top Floating Promo Controls with App Switcher */}
      {!isCleanRecording && (
        <PromoControls
          activePrototype={activePrototype}
          onSelectPrototype={handleSelectPrototype}
          currentScreen={activeScreen}
          onAutoPlay={handleAutoPlay}
          isAutoPlaying={isAutoPlaying}
          autoPlayProgress={autoPlayProgress}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onReset={handleReset}
        />
      )}

      {/* Center Stage: iPhone 16 Pro Frame */}
      <main className="flex-1 flex items-center justify-center my-auto">
        <IPhoneFrame activeScreen={activeScreen === 'clients' ? 'home' : activeScreen} isAutoPlaying={isAutoPlaying}>
          <AnimatePresence mode="wait">
            
            {/* APP: VAPESTOP */}
            {activePrototype === 'vapestop' && <VapeStopApp key="app-vapestop" />}

            {/* APP: STILLNESS */}
            {activePrototype === 'presence' && <PresenceApp key="app-presence" />}

            {/* APP: AURAMATCH */}
            {activePrototype === 'auramatch' && <AuraMatchApp key="app-auramatch" />}

            {/* APP: CAFFEINECLOCK */}
            {activePrototype === 'caffeineclock' && <CaffeineClockApp key="app-caffeineclock" />}

            {/* APP: NOISEZERO */}
            {activePrototype === 'noisezero' && <NoiseZeroApp key="app-noisezero" />}

            {/* APP: SPEEDREAD */}
            {activePrototype === 'speedread' && <SpeedReadApp key="app-speedread" />}

            {/* APP: CARBLENS */}
            {activePrototype === 'carblens' && <CarbLensApp key="app-carblens" />}

            {/* APP: RENTPROOF */}
            {activePrototype === 'rentproof' && <RentProofApp key="app-rentproof" />}

            {/* APP: FLIGHTPULSE */}
            {activePrototype === 'flightpulse' && <FlightPulseApp key="app-flightpulse" />}

            {/* APP: MEMORYPALACE */}
            {activePrototype === 'memorypalace' && <MemoryPalaceApp key="app-memorypalace" />}

            {/* APP: GHOSTFILTER */}
            {activePrototype === 'ghostfilter' && <GhostFilterApp key="app-ghostfilter" />}

            {/* APP: PLANTWHISPER */}
            {activePrototype === 'plantwhisper' && <PlantWhisperApp key="app-plantwhisper" />}

            {/* APP: QUOTEVOICE */}
            {activePrototype === 'quotevoice' && (
              <React.Fragment key="app-quotevoice">
                {activeScreen === 'home' && (
                  <HomeScreen
                    key="home-screen"
                    onStartRecord={(customTranscript) => {
                      clearAutoPlay();
                      setVoiceTranscript(customTranscript);
                      setActiveScreen('recording');
                    }}
                    onOpenQuote={(quote) => {
                      setActiveQuote(quote);
                      setActiveScreen('ready');
                    }}
                    onOpenClients={() => setActiveScreen('clients')}
                    onOpenSettings={() => setShowSettings(true)}
                  />
                )}

                {(activeScreen === 'recording' || activeScreen === 'processing') && (
                  <RecordingScreen
                    key="recording-screen"
                    initialTranscript={voiceTranscript}
                    onComplete={(newQuote) => {
                      setActiveQuote(newQuote);
                      setActiveScreen('ready');
                    }}
                    onCancel={() => {
                      clearAutoPlay();
                      sounds.playTap();
                      setActiveScreen('home');
                    }}
                  />
                )}

                {activeScreen === 'ready' && (
                  <QuoteReadyScreen
                    key="ready-screen"
                    quote={activeQuote}
                    onBack={() => {
                      clearAutoPlay();
                      sounds.playTap();
                      setActiveScreen('home');
                    }}
                    onReset={() => {
                      clearAutoPlay();
                      sounds.playTap();
                      setVoiceTranscript(undefined);
                      setActiveScreen('recording');
                    }}
                    onQuoteUpdated={(updated) => setActiveQuote(updated)}
                  />
                )}

                {activeScreen === 'clients' && (
                  <ClientsScreen
                    key="clients-screen"
                    onBack={() => {
                      sounds.playTap();
                      setActiveScreen('home');
                    }}
                    onSelectClient={(clientName) => {
                      sounds.playMicStart();
                      setVoiceTranscript(`Quote for ${clientName}, 4 hours labor at 120 an hour, plus 250 for parts, add 10 percent tax.`);
                      setActiveScreen('recording');
                    }}
                  />
                )}
              </React.Fragment>
            )}

            {/* APP: SLEEPPULSE */}
            {activePrototype === 'sleeppulse' && <SleepPulseApp key="app-sleeppulse" />}

            {/* APP: PANTRYCHEF */}
            {activePrototype === 'pantrychef' && <PantryChefApp key="app-pantrychef" />}

            {/* APP: HABITQUEST */}
            {activePrototype === 'habitquest' && <HabitQuestApp key="app-habitquest" />}

            {/* APP: PETVITALS */}
            {activePrototype === 'petvitals' && <PetVitalsApp key="app-petvitals" />}

          </AnimatePresence>
        </IPhoneFrame>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onSaved={() => {}}
        />
      )}

      {/* Bottom Subtitle / Recording Guide */}
      {!isCleanRecording && (
        <footer className="mt-3 text-center text-xs text-neutral-500 flex flex-wrap items-center justify-center gap-3">
          <span>⚡ <strong>16 Apple Design Award Level Prototypes</strong></span>
          <span className="text-neutral-700">•</span>
          <span>Click top bar to switch instantly</span>
          <span className="text-neutral-700">•</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[11px]">Space</kbd> 15s Auto Play</span>
          <span className="text-neutral-700">•</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[11px]">R</kbd> Reset</span>
        </footer>
      )}

    </div>
  );
}
