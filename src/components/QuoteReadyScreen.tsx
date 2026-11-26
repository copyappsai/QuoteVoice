import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  MessageSquare, 
  Check, 
  Sparkles,
  Phone,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';
import { generateQuotePDF, QuoteData } from '../utils/pdfGenerator';

interface QuoteReadyScreenProps {
  onBack: () => void;
  onReset: () => void;
}

export const QuoteReadyScreen: React.FC<QuoteReadyScreenProps> = ({ onBack, onReset }) => {
  const [showToast, setShowToast] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const quoteData: QuoteData = {
    quoteNumber: 'QV-1089',
    date: 'Nov 26, 2026',
    contractorName: "Mike's Electrical & HVAC",
    contractorPhone: '+1 (555) 019-2834',
    clientName: 'John Miller',
    clientAddress: '742 Evergreen Terrace, Springfield',
    items: [
      {
        description: 'Labor (4 hrs @ $120/hr)',
        details: 'Licensed journeyman diagnostics & installation',
        amount: 480.00,
      },
      {
        description: 'Materials (Copper piping & valves)',
        details: 'Grade-L 3/4" copper pipe, brass ball valves',
        amount: 350.00,
      },
    ],
    taxRate: 0.10,
    taxAmount: 83.00,
    total: 913.00,
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.72 },
        colors: ['#10b981', '#3b82f6', '#6366f1', '#f59e0b'],
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }
  };

  const handleSend = () => {
    sounds.playSuccessDing();
    setIsSent(true);
    setShowToast(true);
    triggerConfetti();

    setTimeout(() => {
      setShowToast(false);
    }, 4200);
  };

  const handleDownloadPDF = () => {
    sounds.playTap();
    setPdfGenerating(true);
    setTimeout(() => {
      generateQuotePDF(quoteData);
      setPdfGenerating(false);
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col h-full justify-between px-3.5 pb-2 relative"
    >
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-1.5 pt-0.5">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10.5px] font-bold text-slate-800 font-mono tracking-tight">
            Quote #QV-1089
          </span>
        </div>

        <button
          onClick={onReset}
          className="w-6 h-6 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 active:scale-95"
          title="New Quote"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Crisp Professional Invoice / Quote Preview Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-3 text-slate-800 space-y-2 relative overflow-hidden">
        
        {/* Top subtle gradient highlight line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

        {/* Company Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-2 pt-0.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-[10px] shadow-2xs">
              QV
            </div>
            <div>
              <h2 className="text-[11px] font-bold text-slate-900 leading-tight">
                Mike's Electrical & HVAC
              </h2>
              <p className="text-[9px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Lic. #EC-9821
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">
              Official Estimate
            </span>
            <p className="text-[9px] text-slate-400 mt-0.5 font-mono">Nov 26, 2026</p>
          </div>
        </div>

        {/* Prepared For Client Box */}
        <div className="bg-slate-50 rounded-xl p-2 border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[8.5px] uppercase font-bold text-slate-400 tracking-wider">
              Prepared For
            </p>
            <h3 className="text-xs font-extrabold text-slate-900">
              John Miller
            </h3>
            <p className="text-[9.5px] text-slate-500 truncate max-w-[190px]">
              742 Evergreen Terrace, Springfield
            </p>
          </div>
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
            <Phone className="w-3 h-3" />
          </div>
        </div>

        {/* Itemized Rows */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-0.5">
            <span>Item & Description</span>
            <span>Amount</span>
          </div>

          {/* Row 1: Labor */}
          <div className="flex items-start justify-between py-0.5 text-[11px] border-b border-slate-100">
            <div>
              <p className="font-bold text-slate-900">Labor (4 hrs @ $120/hr)</p>
              <p className="text-[9px] text-slate-500">Diagnostics & copper piping installation</p>
            </div>
            <span className="font-bold text-slate-900 font-mono text-[11px]">$480.00</span>
          </div>

          {/* Row 2: Materials */}
          <div className="flex items-start justify-between py-0.5 text-[11px] border-b border-slate-100">
            <div>
              <p className="font-bold text-slate-900">Materials (Copper piping & valves)</p>
              <p className="text-[9px] text-slate-500">Grade-L 3/4" pipe, brass ball valves</p>
            </div>
            <span className="font-bold text-slate-900 font-mono text-[11px]">$350.00</span>
          </div>

          {/* Row 3: Tax */}
          <div className="flex items-center justify-between py-0.5 text-[10.5px] text-slate-600">
            <span className="font-medium">Tax (10%)</span>
            <span className="font-mono text-[10.5px]">$83.00</span>
          </div>

          {/* Total Highlight Box */}
          <div className="mt-1 p-2 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/15 to-blue-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase text-emerald-800 tracking-wider">
                Total Estimate
              </span>
              <p className="text-[8.5px] text-emerald-700/80 font-medium">Guaranteed price for 30 days</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-emerald-800 tracking-tight font-mono">
                $913.00
              </span>
            </div>
          </div>
        </div>

        {/* AI Stamp */}
        <div className="flex items-center justify-between pt-0.5 text-[9px] text-slate-400">
          <span className="flex items-center gap-1 text-blue-600 font-medium">
            <Sparkles className="w-2.5 h-2.5" /> Voice-Parsed & Tax-Calculated
          </span>
          <span className="font-medium text-slate-500">Instant PDF Ready</span>
        </div>
      </div>

      {/* Prominent Action Buttons - Properly Spaced Above Home Bar */}
      <div className="pt-2 space-y-1.5 shrink-0">
        {/* Button 1: Send via Text / WhatsApp */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSend}
          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
            isSent 
              ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
          }`}
        >
          {isSent ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Quote Sent Successfully!</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
              <span>Send via Text / WhatsApp</span>
            </>
          )}
        </motion.button>

        {/* Button 2: Download PDF */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleDownloadPDF}
          disabled={pdfGenerating}
          className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-2xs flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-blue-600" />
          <span>{pdfGenerating ? 'Generating PDF...' : 'Download PDF'}</span>
        </motion.button>
      </div>

      {/* Native iOS Floating Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="absolute bottom-24 left-3 right-3 z-50 bg-slate-900/95 text-white p-3 rounded-2xl shadow-2xl border border-emerald-500/40 backdrop-blur-md flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-500/40">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex-1">
              <h4 className="text-[11px] font-bold text-white flex items-center gap-1">
                Quote sent to John Miller!
              </h4>
              <p className="text-[9.5px] text-emerald-400 font-medium">
                Sent via SMS & WhatsApp • PDF Attached
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
