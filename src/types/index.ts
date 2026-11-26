export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'paid';

export interface LineItem {
  id: string;
  type: 'labor' | 'material' | 'fee';
  description: string;
  details?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  createdAt: string;
  date: string;
  dueDate: string;
  status: QuoteStatus;
  
  // Client Info
  clientId?: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  clientEmail?: string;
  
  // Job Info
  jobTitle: string;
  tradeType: 'electrical' | 'plumbing' | 'hvac' | 'general';
  
  // Items & Pricing
  items: LineItem[];
  subtotal: number;
  taxRate: number; // e.g. 0.10 for 10%
  taxAmount: number;
  discountRate?: number;
  discountAmount?: number;
  total: number;
  
  // Terms & Notes
  notes?: string;
  paymentTerms: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
  email?: string;
  totalQuotes: number;
  totalRevenue: number;
  lastQuoteDate: string;
}

export interface ContractorProfile {
  businessName: string;
  ownerName: string;
  tradeSpecialty: string;
  licenseNumber: string;
  phone: string;
  email: string;
  address: string;
  defaultHourlyRate: number;
  defaultTaxRate: number;
  defaultPaymentTerms: string;
  currency: string;
}

export interface VoicePreset {
  id: string;
  title: string;
  trade: string;
  clientName: string;
  transcript: string;
  estimatedTotal: number;
}
