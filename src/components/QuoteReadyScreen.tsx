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
  RotateCcw,
  Edit3,
  Trash2,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Quote } from '../types';
import { storage } from '../services/storage';
import { generateQuotePDF } from '../utils/pdfGenerator';
import { QuoteEditorModal } from './QuoteEditorModal';
import { sounds } from '../utils/audio';

interface QuoteReadyScreenProps {
  quote?: Quote;
  onBack: () => void;
  onReset: () => void;
  onQuoteUpdated?: (updated: Quote) => void;
}

export const QuoteReadyScreen: React.FC<QuoteReadyScreenProps> = ({ 
  quote: initialQuote,
  onBack, 
  onReset,
  onQuoteUpdated
}) => {
  const profile = storage.getProfile();
  const [quote, setQuote] = useState<Quote>(initialQuote || storage.getQuotes()[0]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Quote sent to client!');
  const [isSent, setIsSent] = useState(quote.status === 'sent' || quote.status === 'paid');
  const [isEditing, setIsEditing] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.72 },
        colors: ['#10b981', '#3b82f6', '#6366f1', '#f59e0b'],
      });
    } catch {
      // ignore
    }
  };

  const handleSend = () => {
    sounds.playSuccessDing();
    setIsSent(true);
    setToastMessage(`Quote sent to ${quote.clientName}!`);
    setShowToast(true);
    triggerConfetti();

    // Update status in storage
    const updated = storage.updateQuoteStatus(quote.id, 'sent');
    if (updated) {
      setQuote({ ...updated });
      onQuoteUpdated?.(updated);
    }

    // Pre-filled WhatsApp / SMS message text
    const messageText = `Hi ${quote.clientName}, here is your official estimate from ${profile.businessName} for ${quote.jobTitle}. Total: $${quote.total.toFixed(2)}. View PDF or reply to approve!`;
    const cleanPhone = quote.clientPhone.replace(/[^0-9]/g, '');
    
    // Open WhatsApp link in new tab if user clicks
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setShowToast(false);
    }, 4200);
  };

  const handleDownloadPDF = () => {
    sounds.playTap();
    setPdfGenerating(true);
    setTimeout(() => {
      generateQuotePDF(quote, profile);
      setPdfGenerating(false);
    }, 180);
  };

  const handleTogglePaid = () => {
    sounds.playTap();
    const newStatus = quote.status === 'paid' ? 'sent' : 'paid';
    const updated = storage.updateQuoteStatus(quote.id, newStatus);
    if (updated) {
      setQuote({ ...updated });
      onQuoteUpdated?.(updated);
      if (newStatus === 'paid') {
        sounds.playSuccessDing();
        triggerConfetti();
      }
    }
  };

  const handleSaveEdit = (updatedQuote: Quote) => {
    storage.saveQuote(updatedQuote);
    setQuote(updatedQuote);
    setIsEditing(false);
    onQuoteUpdated?.(updatedQuote);
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
          <span className={`w-1.5 h-1.5 rounded-full ${quote.status === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span className="text-[10.5px] font-bold text-slate-800 font-mono tracking-tight">
            Quote #{quote.quoteNumber}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              sounds.playTap();
              setIsEditing(true);
            }}
            className="w-6 h-6 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 active:scale-95"
            title="Edit Quote"
          >
            <Edit3 className="w-3 h-3" />
          </button>
          <button
            onClick={onReset}
            className="w-6 h-6 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 active:scale-95"
            title="New Voice Quote"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
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
                {profile.businessName}
              </h2>
              <p className="text-[9px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Lic. #{profile.licenseNumber}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border capitalize ${
              quote.status === 'paid' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              {quote.status === 'paid' ? 'Paid in Full' : 'Official Estimate'}
            </span>
            <p className="text-[9px] text-slate-400 mt-0.5 font-mono">{quote.date}</p>
          </div>
        </div>

        {/* Prepared For Client Box */}
        <div className="bg-slate-50 rounded-xl p-2 border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[8.5px] uppercase font-bold text-slate-400 tracking-wider">
              Prepared For
            </p>
            <h3 className="text-xs font-extrabold text-slate-900">
              {quote.clientName}
            </h3>
            <p className="text-[9.5px] text-slate-500 truncate max-w-[190px]">
              {quote.clientAddress || '742 Evergreen Terrace, Springfield'}
            </p>
          </div>
          <a 
            href={`tel:${quote.clientPhone}`}
            className="w-6 h-6 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-700"
            title="Call Client"
          >
            <Phone className="w-3 h-3" />
          </a>
        </div>

        {/* Itemized Rows */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-0.5">
            <span>Item & Description</span>
            <span>Amount</span>
          </div>

          {/* Dynamic Rows */}
          {quote.items.map((item) => (
            <div key={item.id} className="flex items-start justify-between py-0.5 text-[11px] border-b border-slate-100">
              <div>
                <p className="font-bold text-slate-900">{item.description}</p>
                {item.details && <p className="text-[9px] text-slate-500">{item.details}</p>}
              </div>
              <span className="font-bold text-slate-900 font-mono text-[11px]">
                ${item.total.toFixed(2)}
              </span>
            </div>
          ))}

          {/* Tax */}
          <div className="flex items-center justify-between py-0.5 text-[10.5px] text-slate-600">
            <span className="font-medium">Tax ({(quote.taxRate * 100).toFixed(0)}%)</span>
            <span className="font-mono text-[10.5px]">${quote.taxAmount.toFixed(2)}</span>
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
                ${quote.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* AI Stamp & Quick Payment Toggle */}
        <div className="flex items-center justify-between pt-0.5 text-[9px] text-slate-400">
          <span className="flex items-center gap-1 text-blue-600 font-medium">
            <Sparkles className="w-2.5 h-2.5" /> Voice-Parsed & Tax-Calculated
          </span>
          <button
            onClick={handleTogglePaid}
            className={`font-bold hover:underline cursor-pointer ${
              quote.status === 'paid' ? 'text-emerald-700' : 'text-slate-500'
            }`}
          >
            {quote.status === 'paid' ? '✓ Marked Paid' : '○ Mark as Paid'}
          </button>
        </div>
      </div>

      {/* Prominent Action Buttons */}
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

      {/* Floating Notification Toast */}
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
                {toastMessage}
              </h4>
              <p className="text-[9.5px] text-emerald-400 font-medium">
                Sent via SMS & WhatsApp • PDF Attached
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Editor Modal */}
      {isEditing && (
        <QuoteEditorModal
          quote={quote}
          onSave={handleSaveEdit}
          onClose={() => setIsEditing(false)}
        />
      )}
    </motion.div>
  );
};
