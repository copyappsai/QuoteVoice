import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  User, 
  Wrench, 
  Package, 
  Percent, 
  CheckCircle2, 
  X,
  Volume2,
  Mic,
  ChevronDown
} from 'lucide-react';
import { Quote } from '../types';
import { parseTradeQuoteVoice, speechService } from '../services/voiceNlp';
import { storage, VOICE_PRESETS } from '../services/storage';
import { sounds } from '../utils/audio';

interface RecordingScreenProps {
  onComplete: (quote: Quote) => void;
  onCancel: () => void;
  initialTranscript?: string;
}

export const RecordingScreen: React.FC<RecordingScreenProps> = ({ 
  onComplete, 
  onCancel,
  initialTranscript
}) => {
  const [phase, setPhase] = useState<'recording' | 'processing'>('recording');
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [isUsingLiveMic, setIsUsingLiveMic] = useState(false);

  const activePreset = VOICE_PRESETS[selectedPresetIndex];
  const transcriptToUse = initialTranscript || activePreset.transcript;
  const words = transcriptToUse.split(' ');

  const createdQuoteRef = useRef<Quote | null>(null);

  // Parse Quote when switching to processing
  useEffect(() => {
    const profile = storage.getProfile();
    const parsed = parseTradeQuoteVoice(transcriptToUse, profile.defaultTaxRate);

    const newQuote: Quote = {
      id: `qv-${Date.now()}`,
      quoteNumber: `QV-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      date: 'Nov 26, 2026',
      dueDate: 'Dec 26, 2026',
      status: 'draft',
      clientName: parsed.clientName,
      clientPhone: '+1 (555) 234-5678',
      clientAddress: '742 Evergreen Terrace, Springfield',
      jobTitle: parsed.jobTitle,
      tradeType: parsed.tradeType,
      items: parsed.items,
      subtotal: parsed.subtotal,
      taxRate: parsed.taxRate,
      taxAmount: parsed.taxAmount,
      total: parsed.total,
      paymentTerms: profile.defaultPaymentTerms,
    };

    createdQuoteRef.current = newQuote;
  }, [transcriptToUse]);

  // Word-by-word streaming effect during 2-second recording
  useEffect(() => {
    let wordIndex = 0;
    const intervalTime = 1900 / words.length;

    const wordTimer = setInterval(() => {
      wordIndex++;
      setDisplayedWords(words.slice(0, wordIndex));
      if (wordIndex % 4 === 0) {
        sounds.playTap();
      }

      if (wordIndex >= words.length) {
        clearInterval(wordTimer);
      }
    }, intervalTime);

    // Switch to AI Processing after 2.0 seconds
    const switchTimer = setTimeout(() => {
      setPhase('processing');
      sounds.playAiProcessing();
    }, 2050);

    return () => {
      clearInterval(wordTimer);
      clearTimeout(switchTimer);
    };
  }, [transcriptToUse]);

  // Snappy 1.2-second AI Extraction animation
  useEffect(() => {
    if (phase !== 'processing') return;

    const startTime = Date.now();
    const duration = 1200;

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(progressTimer);
        setTimeout(() => {
          if (createdQuoteRef.current) {
            storage.saveQuote(createdQuoteRef.current);
            onComplete(createdQuoteRef.current);
          }
        }, 120);
      }
    }, 40);

    return () => clearInterval(progressTimer);
  }, [phase, onComplete]);

  // Visualizer bar heights
  const waveHeights = [20, 45, 75, 50, 95, 80, 45, 85, 100, 65, 85, 55, 75, 95, 50, 85, 65, 35, 80, 50];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full justify-between px-4 pb-2"
    >
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onCancel}
          className="w-7 h-7 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 active:scale-95 transition-all"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 shadow-2xs">
          <span className={`w-2 h-2 rounded-full ${phase === 'recording' ? 'bg-red-500 animate-pulse' : 'bg-indigo-600 animate-ping'}`} />
          <span className="text-[11px] font-bold text-slate-800">
            {phase === 'recording' ? 'Listening...' : 'AI Processing'}
          </span>
        </div>

        <button
          onClick={() => {
            sounds.playAiProcessing();
            if (createdQuoteRef.current) {
              storage.saveQuote(createdQuoteRef.current);
              onComplete(createdQuoteRef.current);
            }
          }}
          className="text-[11px] font-bold text-blue-600 hover:text-blue-700"
        >
          Skip &gt;
        </button>
      </div>

      {/* Main Center Stage */}
      <div className="my-auto space-y-3">
        <AnimatePresence mode="wait">
          {phase === 'recording' ? (
            /* PHASE 1: AUDIO WAVEFORM & LIVE TRANSCRIPTION */
            <motion.div
              key="recording-phase"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {/* Animated Soundwave Visualizer Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-md text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2.5 text-slate-500 text-[11px] font-medium">
                  <Volume2 className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                  <span>Speech Detected • 44.1 kHz</span>
                </div>

                <div className="h-16 flex items-center justify-center gap-[3.5px] px-1 overflow-hidden">
                  {waveHeights.map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [`${h * 0.2}%`, `${h}%`, `${h * 0.35}%`],
                      }}
                      transition={{
                        duration: 0.5 + (i % 5) * 0.08,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: (i % 6) * 0.04,
                      }}
                      className="w-[4px] rounded-full bg-gradient-to-t from-blue-700 via-blue-500 to-indigo-400"
                    />
                  ))}
                </div>
              </div>

              {/* Live Transcribing Card */}
              <div className="bg-white rounded-2xl p-3.5 border border-blue-100 shadow-sm min-h-[125px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-100">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                      Live Voice Dictation
                    </span>
                    <span className="text-[9.5px] text-slate-400 font-mono">0:02</span>
                  </div>

                  <p className="text-xs font-medium text-slate-800 leading-relaxed min-h-[55px]">
                    {displayedWords.map((word, i) => {
                      const lower = word.toLowerCase();
                      const isClient = lower.includes('john') || lower.includes('miller') || lower.includes('robert') || lower.includes('emily') || lower.includes('david');
                      const isLabor = lower.includes('labor') || lower.includes('120') || lower.includes('125') || lower.includes('140') || lower.includes('hours');
                      const isMaterials = lower.includes('copper') || lower.includes('piping') || lower.includes('subpanel') || lower.includes('capacitor') || lower.includes('heater') || lower.includes('350') || lower.includes('650') || lower.includes('180') || lower.includes('850');
                      const isTax = lower.includes('tax') || lower.includes('10') || lower.includes('8');

                      let highlightClass = 'text-slate-800';
                      if (isClient) highlightClass = 'text-blue-700 font-bold bg-blue-50 px-1 rounded';
                      else if (isLabor) highlightClass = 'text-emerald-700 font-bold bg-emerald-50 px-1 rounded';
                      else if (isMaterials) highlightClass = 'text-purple-700 font-bold bg-purple-50 px-1 rounded';
                      else if (isTax) highlightClass = 'text-amber-700 font-bold bg-amber-50 px-1 rounded';

                      return (
                        <span key={i} className={`inline-block mr-1 transition-all ${highlightClass}`}>
                          {word}
                        </span>
                      );
                    })}
                    <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-blue-600 animate-pulse align-middle" />
                  </p>
                </div>

                <div className="text-[10px] text-slate-400 italic pt-1 truncate">
                  "{transcriptToUse}"
                </div>
              </div>
            </motion.div>
          ) : (
            /* PHASE 2: SNAPPY 1.2s AI EXTRACTION ANIMATION */
            <motion.div
              key="processing-phase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="space-y-2.5"
            >
              {/* AI Extraction Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-3 text-white shadow-md shadow-indigo-500/20 relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold tracking-tight">Structuring line items...</h3>
                      <p className="text-[10px] text-blue-100">AI Contractor Parser v2.4</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    {progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="relative mt-2.5 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-amber-300 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              </div>

              {/* Extracted Entities Checklist */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs space-y-1.5">
                <p className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Extracted Line Items
                </p>

                {/* 1: Client */}
                <motion.div 
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-blue-50/80 border border-blue-100 text-[11px]"
                >
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-bold">Client:</span>
                    <span>{createdQuoteRef.current?.clientName || 'John Miller'}</span>
                  </div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </motion.div>

                {/* 2: Labor */}
                <motion.div 
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-50/80 border border-emerald-100 text-[11px]"
                >
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-bold">Labor:</span>
                    <span>{createdQuoteRef.current?.items[0]?.description || '4 hrs @ $120/hr'}</span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">
                    ${createdQuoteRef.current?.items[0]?.total.toFixed(2) || '480.00'}
                  </span>
                </motion.div>

                {/* 3: Materials */}
                <motion.div 
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-purple-50/80 border border-purple-100 text-[11px]"
                >
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <Package className="w-3.5 h-3.5 text-purple-600" />
                    <span className="font-bold">Materials:</span>
                    <span className="truncate max-w-[120px]">
                      {createdQuoteRef.current?.items[1]?.description || 'Copper pipe & valves'}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">
                    ${createdQuoteRef.current?.items[1]?.total.toFixed(2) || '350.00'}
                  </span>
                </motion.div>

                {/* 4: Tax */}
                <motion.div 
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-amber-50/80 border border-amber-100 text-[11px]"
                >
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <Percent className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-bold">Tax:</span>
                    <span>{((createdQuoteRef.current?.taxRate || 0.1) * 100).toFixed(0)}% Sales Tax</span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">
                    ${createdQuoteRef.current?.taxAmount.toFixed(2) || '83.00'}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Status */}
      <div className="text-center pb-1">
        <p className="text-[10px] text-slate-400 font-medium">
          {phase === 'recording' ? 'Transcribing trade voice input...' : 'Generating contractor PDF quote...'}
        </p>
      </div>
    </motion.div>
  );
};
