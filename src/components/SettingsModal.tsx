import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, RotateCcw, ShieldCheck, DollarSign, Percent, Building2 } from 'lucide-react';
import { ContractorProfile } from '../types';
import { storage } from '../services/storage';
import { sounds } from '../utils/audio';

interface SettingsModalProps {
  onClose: () => void;
  onSaved: (profile: ContractorProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onSaved }) => {
  const [profile, setProfile] = useState<ContractorProfile>(storage.getProfile());

  const handleChange = (field: keyof ContractorProfile, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    sounds.playTap();
    storage.saveProfile(profile);
    onSaved(profile);
    onClose();
  };

  const handleResetData = () => {
    if (confirm('Reset all quotes, clients, and settings to original defaults?')) {
      storage.resetToDefaults();
      sounds.playSuccessDing();
      window.location.reload();
    }
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
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <div>
              <h3 className="text-xs font-bold tracking-tight">Contractor Business Profile</h3>
              <p className="text-[10px] text-slate-400">PDF Branding & Estimate Defaults</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Settings Form */}
        <div className="p-3.5 overflow-y-auto no-scrollbar space-y-3 text-slate-800 text-xs">
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Company Branding
            </label>
            <div>
              <span className="text-[9.5px] text-slate-500">Business Name:</span>
              <input
                type="text"
                value={profile.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full mt-0.5 px-2 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <span className="text-[9.5px] text-slate-500">Owner Name:</span>
                <input
                  type="text"
                  value={profile.ownerName}
                  onChange={(e) => handleChange('ownerName', e.target.value)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <span className="text-[9.5px] text-slate-500">License #:</span>
                <input
                  type="text"
                  value={profile.licenseNumber}
                  onChange={(e) => handleChange('licenseNumber', e.target.value)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                />
              </div>
            </div>
            <div>
              <span className="text-[9.5px] text-slate-500">Specialty Tagline:</span>
              <input
                type="text"
                value={profile.tradeSpecialty}
                onChange={(e) => handleChange('tradeSpecialty', e.target.value)}
                className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Contact & Address
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <span className="text-[9.5px] text-slate-500">Phone:</span>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <span className="text-[9.5px] text-slate-500">Email:</span>
                <input
                  type="text"
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Pricing Defaults
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <span className="text-[9.5px] text-slate-500">Default Rate ($/hr):</span>
                <input
                  type="number"
                  value={profile.defaultHourlyRate}
                  onChange={(e) => handleChange('defaultHourlyRate', parseFloat(e.target.value) || 0)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white font-mono text-center"
                />
              </div>
              <div>
                <span className="text-[9.5px] text-slate-500">Default Tax Rate (%):</span>
                <input
                  type="number"
                  value={Math.round(profile.defaultTaxRate * 100)}
                  onChange={(e) => handleChange('defaultTaxRate', (parseFloat(e.target.value) || 0) / 100)}
                  className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white font-mono text-center"
                />
              </div>
            </div>
            <div>
              <span className="text-[9.5px] text-slate-500">Default Payment Terms:</span>
              <input
                type="text"
                value={profile.defaultPaymentTerms}
                onChange={(e) => handleChange('defaultPaymentTerms', e.target.value)}
                className="w-full mt-0.5 px-2 py-1 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Reset Demo Data button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetData}
              className="w-full py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-[10px] font-bold flex items-center justify-center gap-1 border border-red-200"
            >
              <RotateCcw className="w-3 h-3" /> Reset Database to Demo Defaults
            </button>
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
            <Save className="w-3.5 h-3.5" /> Save Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
};
