import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, Save, Calculator } from 'lucide-react';
import { Quote, LineItem } from '../types';
import { sounds } from '../utils/audio';

interface QuoteEditorModalProps {
  quote: Quote;
  onSave: (updatedQuote: Quote) => void;
  onClose: () => void;
}

export const QuoteEditorModal: React.FC<QuoteEditorModalProps> = ({
  quote,
  onSave,
  onClose,
}) => {
  const [clientName, setClientName] = useState(quote.clientName);
  const [clientPhone, setClientPhone] = useState(quote.clientPhone);
  const [clientAddress, setClientAddress] = useState(quote.clientAddress);
  const [jobTitle, setJobTitle] = useState(quote.jobTitle);
  const [taxRatePct, setTaxRatePct] = useState(String(Math.round(quote.taxRate * 100)));
  const [items, setItems] = useState<LineItem[]>(quote.items);

  // Recalculate financial summary
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const parsedTaxRate = (parseFloat(taxRatePct) || 0) / 100;
  const taxAmount = Math.round(subtotal * parsedTaxRate * 100) / 100;
  const total = Math.round((subtotal + taxAmount) * 100) / 100;

  const handleAddItem = (type: 'labor' | 'material') => {
    sounds.playTap();
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      type,
      description: type === 'labor' ? 'Labor (1 hr)' : 'Material Item',
      details: type === 'labor' ? 'On-site installation' : 'Standard trade supplies',
      quantity: 1,
      unitPrice: type === 'labor' ? 120 : 50,
      total: type === 'labor' ? 120 : 50,
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...items];
    const item = { ...updated[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      item.total = Math.round(Number(item.quantity) * Number(item.unitPrice) * 100) / 100;
    }
    updated[index] = item;
    setItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    sounds.playTap();
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    sounds.playTap();
    const updatedQuote: Quote = {
      ...quote,
      clientName,
      clientPhone,
      clientAddress,
      jobTitle,
      items,
      subtotal,
      taxRate: parsedTaxRate,
      taxAmount,
      total,
    };
    onSave(updatedQuote);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-sm w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold tracking-tight">Edit Quote #{quote.quoteNumber}</h3>
            <p className="text-[10px] text-slate-400">Modify items, rates & client details</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <div className="p-3.5 overflow-y-auto no-scrollbar space-y-3 text-slate-800 text-xs">
          
          {/* Client Details */}
          <div className="space-y-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Client & Job Information
            </label>
            <div className="space-y-1.5">
              <div>
                <span className="text-[9.5px] text-slate-500">Client Name:</span>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full mt-0.5 px-2 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <span className="text-[9.5px] text-slate-500">Phone:</span>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <span className="text-[9.5px] text-slate-500">Job Title:</span>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
              <div>
                <span className="text-[9.5px] text-slate-500">Address:</span>
                <input
                  type="text"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Line Items List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Itemized Line Items ({items.length})
              </label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleAddItem('labor')}
                  className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px] hover:bg-blue-100 flex items-center gap-0.5"
                >
                  <Plus className="w-2.5 h-2.5" /> +Labor
                </button>
                <button
                  type="button"
                  onClick={() => handleAddItem('material')}
                  className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold text-[10px] hover:bg-purple-100 flex items-center gap-0.5"
                >
                  <Plus className="w-2.5 h-2.5" /> +Parts
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-0.5">
              {items.map((item, index) => (
                <div key={item.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200 relative">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                      className="flex-1 font-bold text-xs bg-transparent border-b border-dashed border-slate-300 pb-0.5 focus:border-blue-500 outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-400 hover:text-red-600 p-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 items-center mt-1.5">
                    <div>
                      <span className="text-[9px] text-slate-400">Qty / Hrs:</span>
                      <input
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full px-1.5 py-0.5 text-xs rounded border border-slate-300 bg-white text-center font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400">Unit Price ($):</span>
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-1.5 py-0.5 text-xs rounded border border-slate-300 bg-white text-center font-mono"
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400">Total:</span>
                      <p className="font-bold text-xs font-mono text-slate-900 mt-0.5">
                        ${(item.quantity * item.unitPrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Rate Setting */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-semibold text-slate-700">Sales Tax Rate (%):</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="0"
                max="25"
                step="1"
                value={taxRatePct}
                onChange={(e) => setTaxRatePct(e.target.value)}
                className="w-12 px-1.5 py-0.5 text-xs rounded border border-slate-300 text-center font-mono font-bold bg-white"
              />
              <span className="text-xs font-bold text-slate-500">%</span>
            </div>
          </div>

          {/* Live Summary Calculation */}
          <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-600">
              <span>Tax ({taxRatePct}%):</span>
              <span className="font-mono">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs font-extrabold text-blue-900 border-t border-blue-200 pt-1">
              <span>New Total:</span>
              <span className="font-mono text-sm">${total.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};
