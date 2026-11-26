import { Quote, Client, ContractorProfile, VoicePreset } from '../types';

const STORAGE_KEYS = {
  QUOTES: 'quotevoice_quotes_v1',
  PROFILE: 'quotevoice_profile_v1',
  CLIENTS: 'quotevoice_clients_v1',
};

export const DEFAULT_PROFILE: ContractorProfile = {
  businessName: "Mike's Electrical & HVAC",
  ownerName: "Mike Sterling",
  tradeSpecialty: "Licensed Electrical & HVAC Master",
  licenseNumber: "EC-9821 / HVAC-4402",
  phone: "+1 (555) 019-2834",
  email: "mike@apexcontracting.com",
  address: "104 Industrial Pkwy, Suite 4, Springfield",
  defaultHourlyRate: 120,
  defaultTaxRate: 0.10,
  defaultPaymentTerms: "Due upon receipt • Guaranteed for 30 days",
  currency: "USD",
};

export const INITIAL_QUOTES: Quote[] = [
  {
    id: 'qv-1089',
    quoteNumber: 'QV-1089',
    createdAt: new Date().toISOString(),
    date: 'Nov 26, 2026',
    dueDate: 'Dec 26, 2026',
    status: 'draft',
    clientName: 'John Miller',
    clientPhone: '+1 (555) 234-5678',
    clientAddress: '742 Evergreen Terrace, Springfield',
    clientEmail: 'john.miller@example.com',
    jobTitle: 'Copper Pipe Replacement & Valves',
    tradeType: 'plumbing',
    items: [
      {
        id: 'item-1',
        type: 'labor',
        description: 'Labor (4 hrs @ $120/hr)',
        details: 'Licensed journeyman diagnostics & copper installation',
        quantity: 4,
        unitPrice: 120,
        total: 480,
      },
      {
        id: 'item-2',
        type: 'material',
        description: 'Materials (Copper piping & valves)',
        details: 'Grade-L 3/4" pipe, brass ball shutoff valves, fittings',
        quantity: 1,
        unitPrice: 350,
        total: 350,
      },
    ],
    subtotal: 830,
    taxRate: 0.10,
    taxAmount: 83,
    total: 913,
    paymentTerms: 'Payment due upon completion of listed services.',
    notes: 'Shutoff valve replacement included in front crawlspace.',
  },
  {
    id: 'qv-1088',
    quoteNumber: 'QV-1088',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    date: 'Nov 26, 2026',
    dueDate: 'Dec 26, 2026',
    status: 'paid',
    clientName: 'Sarah Jenkins',
    clientPhone: '+1 (555) 345-6789',
    clientAddress: '1240 Oak Ridge Road',
    jobTitle: 'Main Panel Upgrade 200A',
    tradeType: 'electrical',
    items: [
      {
        id: 'item-1',
        type: 'labor',
        description: 'Panel Swap & Breaker Installation (8 hrs)',
        details: 'Permit filing, city inspection coordination, labor',
        quantity: 8,
        unitPrice: 130,
        total: 1040,
      },
      {
        id: 'item-2',
        type: 'material',
        description: 'Square D 200A Main Breaker Panel & Surge Protector',
        details: 'Includes 24 arc-fault & ground-fault combination breakers',
        quantity: 1,
        unitPrice: 650,
        total: 650,
      },
    ],
    subtotal: 1690,
    taxRate: 0.10,
    taxAmount: 160,
    total: 1850,
    paymentTerms: 'Paid in full via Tap to Pay.',
  },
  {
    id: 'qv-1087',
    quoteNumber: 'QV-1087',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    date: 'Nov 26, 2026',
    dueDate: 'Dec 10, 2026',
    status: 'sent',
    clientName: 'Dave Roberts',
    clientPhone: '+1 (555) 456-7890',
    clientAddress: '55 Birchwood Blvd',
    jobTitle: 'Heat Pump Diagnostics & Blower Motor',
    tradeType: 'hvac',
    items: [
      {
        id: 'item-1',
        type: 'labor',
        description: 'Diagnostic Fee & ECM Motor Swap (2 hrs)',
        quantity: 2,
        unitPrice: 120,
        total: 240,
      },
      {
        id: 'item-2',
        type: 'material',
        description: '1/2 HP Variable ECM Motor Module',
        quantity: 1,
        unitPrice: 150,
        total: 150,
      },
    ],
    subtotal: 390,
    taxRate: 0.10,
    taxAmount: 30,
    total: 420,
    paymentTerms: 'Net 15 days.',
  },
  {
    id: 'qv-1086',
    quoteNumber: 'QV-1086',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    date: 'Nov 25, 2026',
    dueDate: 'Dec 25, 2026',
    status: 'paid',
    clientName: 'Marcus Vance',
    clientPhone: '+1 (555) 567-8901',
    clientAddress: '883 Sunset Way',
    jobTitle: 'Tesla Wall Connector EV Charger',
    tradeType: 'electrical',
    items: [
      {
        id: 'item-1',
        type: 'labor',
        description: 'Level 2 EV Charger Conduit & Wire Run (5 hrs)',
        quantity: 5,
        unitPrice: 120,
        total: 600,
      },
      {
        id: 'item-2',
        type: 'material',
        description: '60A Breaker, 6/3 NM-B Wire, Conduit, Disconnect',
        quantity: 1,
        unitPrice: 500,
        total: 500,
      },
    ],
    subtotal: 1100,
    taxRate: 0.10,
    taxAmount: 100,
    total: 1200,
    paymentTerms: 'Paid via direct bank transfer.',
  },
];

export const VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'vp-1',
    title: 'Plumbing - Copper Piping & Valves (Default)',
    trade: 'Plumbing',
    clientName: 'John Miller',
    transcript: 'Quote for John Miller, 4 hours labor at 120 an hour, plus 350 for copper piping and valves, add 10 percent tax.',
    estimatedTotal: 913,
  },
  {
    id: 'vp-2',
    title: 'Electrical - Subpanel & EV Charger',
    trade: 'Electrical',
    clientName: 'Robert Vance',
    transcript: 'Quote for Robert Vance, 5 hours labor at 125 an hour, plus 650 for 60 amp subpanel and copper wire, add 8 percent tax.',
    estimatedTotal: 1377,
  },
  {
    id: 'vp-3',
    title: 'HVAC - Capacitor & Freon Recharge',
    trade: 'HVAC',
    clientName: 'Emily Stone',
    transcript: 'Estimate for Emily Stone, 2 hours labor at 140 an hour, plus 180 for run capacitor and refrigerant, add 10 percent tax.',
    estimatedTotal: 506,
  },
  {
    id: 'vp-4',
    title: 'Emergency - Water Heater Replacement',
    trade: 'Plumbing',
    clientName: 'David Chen',
    transcript: 'Emergency quote for David Chen, 3 hours labor at 150 an hour, plus 850 for 50 gallon Rheem water heater, add 10 percent tax.',
    estimatedTotal: 1430,
  },
];

class StorageService {
  // Quotes
  getQuotes(): Quote[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
      if (!data) {
        this.saveQuotes(INITIAL_QUOTES);
        return INITIAL_QUOTES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_QUOTES;
    }
  }

  saveQuotes(quotes: Quote[]): void {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }

  getQuoteById(id: string): Quote | undefined {
    return this.getQuotes().find((q) => q.id === id);
  }

  saveQuote(quote: Quote): Quote {
    const quotes = this.getQuotes();
    const index = quotes.findIndex((q) => q.id === quote.id);
    if (index >= 0) {
      quotes[index] = quote;
    } else {
      quotes.unshift(quote);
    }
    this.saveQuotes(quotes);
    this.syncClientFromQuote(quote);
    return quote;
  }

  deleteQuote(id: string): void {
    const quotes = this.getQuotes().filter((q) => q.id !== id);
    this.saveQuotes(quotes);
  }

  updateQuoteStatus(id: string, status: Quote['status']): Quote | undefined {
    const quotes = this.getQuotes();
    const quote = quotes.find((q) => q.id === id);
    if (quote) {
      quote.status = status;
      this.saveQuotes(quotes);
    }
    return quote;
  }

  // Profile
  getProfile(): ContractorProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!data) {
        this.saveProfile(DEFAULT_PROFILE);
        return DEFAULT_PROFILE;
      }
      return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  saveProfile(profile: ContractorProfile): void {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }

  // Clients
  getClients(): Client[] {
    const quotes = this.getQuotes();
    const map = new Map<string, Client>();

    quotes.forEach((q) => {
      const name = q.clientName.trim();
      if (!name) return;
      const existing = map.get(name);
      if (existing) {
        existing.totalQuotes += 1;
        existing.totalRevenue += q.total;
      } else {
        map.set(name, {
          id: `client-${name.toLowerCase().replace(/\s+/g, '-')}`,
          name: q.clientName,
          phone: q.clientPhone || '+1 (555) 000-0000',
          address: q.clientAddress || 'Springfield',
          email: q.clientEmail,
          totalQuotes: 1,
          totalRevenue: q.total,
          lastQuoteDate: q.date,
        });
      }
    });

    return Array.from(map.values());
  }

  private syncClientFromQuote(quote: Quote): void {
    // updates clients list cache
    const clients = this.getClients();
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  }

  // Metrics
  getMetrics() {
    const quotes = this.getQuotes();
    const totalSent = quotes.reduce((acc, q) => acc + q.total, 0);
    const paidQuotes = quotes.filter((q) => q.status === 'paid');
    const acceptedQuotes = quotes.filter((q) => q.status === 'accepted' || q.status === 'paid');
    const winRate = quotes.length > 0 ? Math.round((acceptedQuotes.length / quotes.length) * 100) : 0;
    const paidRevenue = paidQuotes.reduce((acc, q) => acc + q.total, 0);

    return {
      totalRevenue: totalSent,
      paidRevenue,
      quoteCount: quotes.length,
      winRate,
      avgTurnaround: '38s',
    };
  }

  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.QUOTES);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.CLIENTS);
  }
}

export const storage = new StorageService();
