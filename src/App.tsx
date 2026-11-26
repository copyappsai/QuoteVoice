import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IPhoneFrame } from './components/IPhoneFrame';
import { HomeScreen } from './components/HomeScreen';
import { RecordingScreen } from './components/RecordingScreen';
import { QuoteReadyScreen } from './components/QuoteReadyScreen';
import { ClientsScreen } from './components/ClientsScreen';
import { SettingsModal } from './components/SettingsModal';
import { PromoControls } from './components/PromoControls';
import { Quote, ContractorProfile } from './types';
import { storage } from './services/storage';
import { sounds } from './utils/audio';

export type ScreenState = 'home' | 'recording' | 'processing' | 'ready' | 'clients';

export function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenState>('home');
  const [activeQuote, setActiveQuote] = useState<Quote>(storage.getQuotes()[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string | undefined>(undefined);
  
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Check if opened with ?clean=true (for video promo recordings)
  const isCleanRecording = typeof window !== 'undefined' && (
    window.location.search.includes('clean=true') || window.location.hash.includes('clean')
  );

  const autoPlayTimers = useRef<any[]>([]);
  const autoPlayInterval = useRef<any>(null);

  // Clear auto play timers
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
    if (next) {
      sounds.playTap();
    }
  };

  // Run the 15-second automated demo flow
  const handleAutoPlay = () => {
    clearAutoPlay();
    setIsAutoPlaying(true);
    setAutoPlayProgress(0);
    setActiveScreen('home');

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

    // Timeline actions
    const t1 = setTimeout(() => {
      sounds.playMicStart();
      setActiveScreen('recording');
    }, 1200);

    const t2 = setTimeout(() => {
      setActiveScreen('processing');
    }, 3300);

    const t3 = setTimeout(() => {
      setActiveScreen('ready');
    }, 4700);

    const t4 = setTimeout(() => {
      const sendBtn = document.querySelector('button[class*="bg-emerald-500"]') as HTMLButtonElement | null;
      if (sendBtn) {
        sendBtn.click();
      }
    }, 7500);

    autoPlayTimers.current = [t1, t2, t3, t4];
  };

  useEffect(() => {
    if (isCleanRecording) {
      const timer = setTimeout(() => {
        handleAutoPlay();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isCleanRecording]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (activeScreen === 'home') {
          sounds.playMicStart();
          setActiveScreen('recording');
        } else if (activeScreen === 'ready') {
          handleReset();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      } else if (e.key === '1') {
        clearAutoPlay();
        setActiveScreen('home');
      } else if (e.key === '2') {
        clearAutoPlay();
        setActiveScreen('recording');
      } else if (e.key === '3') {
        clearAutoPlay();
        setActiveScreen('ready');
      } else if (e.key === 'a' || e.key === 'A') {
        handleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeScreen, clearAutoPlay, handleReset]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col justify-between py-3 px-4 relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Top Floating Promo Controls */}
      {!isCleanRecording && (
        <PromoControls
          currentScreen={activeScreen === 'clients' ? 'home' : activeScreen}
          onSelectScreen={(s) => {
            clearAutoPlay();
            sounds.playTap();
            setActiveScreen(s);
          }}
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
                onOpenClients={() => {
                  setActiveScreen('clients');
                }}
                onOpenSettings={() => {
                  setShowSettings(true);
                }}
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
                onQuoteUpdated={(updated) => {
                  setActiveQuote(updated);
                }}
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
          </AnimatePresence>
        </IPhoneFrame>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onSaved={(newProfile) => {
            // refresh
          }}
        />
      )}

      {/* Bottom Subtitle / Recording Guide */}
      {!isCleanRecording && (
        <footer className="mt-4 text-center text-xs text-neutral-500 flex flex-wrap items-center justify-center gap-3">
          <span>⚡ <strong>QuoteVoice</strong>: Voice-to-Quote iOS prototype</span>
          <span className="text-neutral-700">•</span>
          <span>Keyboard: <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[11px]">Space</kbd> Start / Auto-flow</span>
          <span className="text-neutral-700">•</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[11px]">R</kbd> Reset</span>
          <span className="text-neutral-700">•</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[11px]">A</kbd> 15s Auto Play</span>
        </footer>
      )}

    </div>
  );
}
