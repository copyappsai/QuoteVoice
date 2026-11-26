import { Quote, LineItem } from '../types';

export interface ParsedVoiceQuote {
  clientName: string;
  jobTitle: string;
  tradeType: 'electrical' | 'plumbing' | 'hvac' | 'general';
  items: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

/**
 * Trade NLP Parser: Converts spoken text into structured estimate line items.
 * Handles contractor natural language variations:
 * - "Quote for John Miller, 4 hours labor at 120 an hour, plus 350 for copper piping, add 10 percent tax"
 * - "Estimate for Sarah Jenkins, 6 hours at 110, parts 400 for circuit breakers"
 */
export function parseTradeQuoteVoice(rawText: string, defaultTaxRate = 0.10): ParsedVoiceQuote {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  // 1. Extract Client Name
  // e.g. "quote for [Name],", "estimate for [Name],", "for [Name],"
  let clientName = 'Valued Customer';
  const nameMatch = text.match(/(?:quote|estimate|bill|invoice)?\s*(?:for|to)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameMatch && nameMatch[1]) {
    clientName = nameMatch[1].trim();
  } else {
    // try finding words between "for" and first comma
    const forMatch = text.match(/for\s+([^,]+)/i);
    if (forMatch && forMatch[1]) {
      clientName = forMatch[1].trim();
    }
  }

  // 2. Extract Labor hours and rate
  // e.g. "4 hours labor at 120 an hour", "4 hours at 120", "2.5 hrs @ 130"
  let laborHours = 4;
  let laborRate = 120;
  let laborFound = false;

  const laborPattern = /(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\s*(?:labor)?\s*(?:at|@)\s*(\d+(?:\.\d+)?)/i;
  const laborMatch = text.match(laborPattern);
  if (laborMatch) {
    laborHours = parseFloat(laborMatch[1]);
    laborRate = parseFloat(laborMatch[2]);
    laborFound = true;
  } else {
    // e.g. "4 hours of labor" without rate
    const hoursOnlyMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)/i);
    if (hoursOnlyMatch) {
      laborHours = parseFloat(hoursOnlyMatch[1]);
      laborFound = true;
    }
  }

  // 3. Extract Materials & Parts
  // e.g. "plus 350 for copper piping and valves", "parts 350 for copper", "materials cost 450"
  let materialDesc = 'Materials (Parts & Supplies)';
  let materialCost = 350;
  let materialsFound = false;

  const matPattern = /(?:plus|and|with|materials?|parts?)\s*(?:\$)?(\d+(?:\.\d+)?)\s*(?:for|in)\s+([^,.]+)/i;
  const matMatch = text.match(matPattern);
  if (matMatch) {
    materialCost = parseFloat(matMatch[1]);
    materialDesc = `Materials (${matMatch[2].trim()})`;
    materialsFound = true;
  } else {
    // alternate: "copper piping for 350"
    const matAlt = /([^,.]+?)\s*(?:for|costs?)\s*(?:\$)?(\d+(?:\.\d+)?)/i;
    const matAltMatch = text.match(matAlt);
    if (matAltMatch && !matAltMatch[1].toLowerCase().includes('labor') && !matAltMatch[1].toLowerCase().includes('hour')) {
      materialDesc = `Materials (${matAltMatch[1].trim()})`;
      materialCost = parseFloat(matAltMatch[2]);
      materialsFound = true;
    }
  }

  // 4. Extract Tax
  // e.g. "add 10 percent tax", "10% tax", "no tax"
  let taxRate = defaultTaxRate;
  if (lower.includes('no tax') || lower.includes('zero tax')) {
    taxRate = 0;
  } else {
    const taxMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:percent|%)\s*tax/i);
    if (taxMatch) {
      taxRate = parseFloat(taxMatch[1]) / 100;
    }
  }

  // 5. Determine Trade Type
  let tradeType: 'electrical' | 'plumbing' | 'hvac' | 'general' = 'general';
  if (lower.includes('pipe') || lower.includes('valve') || lower.includes('drain') || lower.includes('heater') || lower.includes('plumb')) {
    tradeType = 'plumbing';
  } else if (lower.includes('panel') || lower.includes('wire') || lower.includes('breaker') || lower.includes('charger') || lower.includes('electric') || lower.includes('volt')) {
    tradeType = 'electrical';
  } else if (lower.includes('heat') || lower.includes('ac') || lower.includes('hvac') || lower.includes('duct') || lower.includes('pump') || lower.includes('furnace')) {
    tradeType = 'hvac';
  }

  // 6. Build Line Items
  const items: LineItem[] = [];

  // Labor row
  items.push({
    id: 'item-labor-1',
    type: 'labor',
    description: `Labor (${laborHours} hrs @ $${laborRate}/hr)`,
    details: 'Licensed technician on-site diagnostics & installation',
    quantity: laborHours,
    unitPrice: laborRate,
    total: Math.round(laborHours * laborRate * 100) / 100,
  });

  // Material row
  if (materialsFound || materialCost > 0) {
    items.push({
      id: 'item-mat-1',
      type: 'material',
      description: materialDesc,
      details: 'Trade-grade replacement parts, piping & fittings',
      quantity: 1,
      unitPrice: materialCost,
      total: materialCost,
    });
  }

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + it.total, 0);
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const total = Math.round((subtotal + taxAmount) * 100) / 100;

  // Title
  let jobTitle = `${clientName} Service Estimate`;
  if (materialDesc.includes('(')) {
    const inner = materialDesc.substring(materialDesc.indexOf('(') + 1, materialDesc.indexOf(')'));
    jobTitle = `${inner.charAt(0).toUpperCase() + inner.slice(1)} Installation`;
  }

  return {
    clientName,
    jobTitle,
    tradeType,
    items,
    subtotal,
    taxRate,
    taxAmount,
    total,
  };
}

/**
 * Speech Recognition Wrapper (Web Speech API) with graceful fallback
 */
export class SpeechService {
  private recognition: any = null;
  public isSupported = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRec) {
        this.recognition = new SpeechRec();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        this.isSupported = true;
      }
    }
  }

  startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: any) => void
  ) {
    if (!this.recognition) {
      onError('Speech Recognition not supported in this browser environment');
      return;
    }

    this.recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const text = final || interim;
      if (text) {
        onResult(text, Boolean(final));
      }
    };

    this.recognition.onerror = (e: any) => {
      onError(e);
    };

    try {
      this.recognition.start();
    } catch {
      // already started or busy
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
    }
  }
}

export const speechService = new SpeechService();
