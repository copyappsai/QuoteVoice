import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, MapPin, Plus, FileText, Search, ExternalLink } from 'lucide-react';
import { Client } from '../types';
import { storage } from '../services/storage';
import { sounds } from '../utils/audio';

interface ClientsScreenProps {
  onBack: () => void;
  onSelectClient: (clientName: string) => void;
}

export const ClientsScreen: React.FC<ClientsScreenProps> = ({ onBack, onSelectClient }) => {
  const [clients] = useState<Client[]>(storage.getClients());
  const [search, setSearch] = useState('');

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full px-4 pb-2"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 pt-0.5">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        <h2 className="text-xs font-bold text-slate-800">Client Directory</h2>

        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
          {clients.length} Clients
        </span>
      </div>

      {/* Search Input */}
      <div className="relative mb-2.5">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search client by name, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl shadow-2xs focus:border-blue-500 outline-hidden"
        />
      </div>

      {/* Clients List */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-0.5">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            No clients found matching "{search}"
          </div>
        ) : (
          filtered.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{c.name}</h3>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> {c.address}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-slate-900 font-mono">
                    ${c.totalRevenue.toLocaleString()}
                  </span>
                  <p className="text-[9px] text-slate-400">{c.totalQuotes} quote(s)</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-1.5 pt-1 border-t border-slate-100">
                <a
                  href={`tel:${c.phone}`}
                  className="flex-1 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] font-semibold flex items-center justify-center gap-1 border border-slate-200"
                >
                  <Phone className="w-2.5 h-2.5" /> Call
                </a>
                <button
                  onClick={() => {
                    sounds.playTap();
                    onSelectClient(c.name);
                  }}
                  className="flex-1 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center gap-1 border border-blue-200"
                >
                  <Plus className="w-2.5 h-2.5" /> New Quote
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};
