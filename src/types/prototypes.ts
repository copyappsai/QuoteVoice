export type PrototypeId = 'quotevoice' | 'splitsnap' | 'fairmechanic' | 'subzero' | 'thriftlens';

export interface PrototypeAppInfo {
  id: PrototypeId;
  name: string;
  badge: string;
  category: string;
  description: string;
  accentGradient: string;
  textColor: string;
  iconName: string;
}

export const PROTOTYPE_CATALOG: PrototypeAppInfo[] = [
  {
    id: 'quotevoice',
    name: 'QuoteVoice',
    badge: 'Contractor AI',
    category: 'Trades & Construction',
    description: 'Instant PDF invoices by speaking on the job',
    accentGradient: 'from-blue-600 to-indigo-600',
    textColor: 'text-blue-500',
    iconName: 'mic',
  },
  {
    id: 'splitsnap',
    name: 'SplitSnap',
    badge: 'Group Bill AI',
    category: 'Fintech & Social',
    description: 'Speak who had what -> 1-tap Venmo/Apple Cash split',
    accentGradient: 'from-emerald-500 to-teal-600',
    textColor: 'text-emerald-500',
    iconName: 'receipt',
  },
  {
    id: 'fairmechanic',
    name: 'FairMechanic',
    badge: 'Auto Repair Auditor',
    category: 'Automotive & Consumer',
    description: 'Mechanic invoice auditor & sound-based engine diagnostic',
    accentGradient: 'from-amber-500 to-orange-600',
    textColor: 'text-amber-500',
    iconName: 'wrench',
  },
  {
    id: 'subzero',
    name: 'SubZero',
    badge: 'Subscription Assassin',
    category: 'Personal Finance',
    description: 'Find dark-pattern recurring charges & cancel in 1 click',
    accentGradient: 'from-rose-500 to-red-600',
    textColor: 'text-rose-500',
    iconName: 'scissors',
  },
  {
    id: 'thriftlens',
    name: 'ThriftLens',
    badge: 'Resale Scanner',
    category: 'E-Commerce & Side Hustle',
    description: 'Scan thrift / flea market items for instant eBay profit value',
    accentGradient: 'from-purple-500 to-violet-600',
    textColor: 'text-purple-500',
    iconName: 'camera',
  },
];
