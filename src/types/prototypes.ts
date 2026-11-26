export type PrototypeId = 'quotevoice' | 'sleeppulse' | 'pantrychef' | 'habitquest' | 'petvitals';

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
    badge: 'Trades AI',
    category: 'Work & Field Construction',
    description: 'Instant professional PDF invoices & estimates just by speaking on the job',
    accentGradient: 'from-blue-600 to-indigo-600',
    textColor: 'text-blue-500',
    iconName: 'mic',
  },
  {
    id: 'sleeppulse',
    name: 'SleepPulse',
    badge: 'Health & Sleep',
    category: 'Biometrics & Lucid Audio',
    description: 'Smart REM window wake alarm & sleep talk audio replay with zero expensive subscriptions',
    accentGradient: 'from-indigo-600 via-purple-600 to-pink-600',
    textColor: 'text-purple-400',
    iconName: 'moon',
  },
  {
    id: 'pantrychef',
    name: 'PantryChef',
    badge: 'Zero-Waste Cooking',
    category: 'Food & Home Kitchen',
    description: 'Snap fridge shelf -> 15-min gourmet recipes using only what expires in 48h',
    accentGradient: 'from-emerald-500 to-teal-600',
    textColor: 'text-emerald-400',
    iconName: 'utensils',
  },
  {
    id: 'habitquest',
    name: 'HabitQuest',
    badge: 'Gamified RPG',
    category: 'Gaming & ADHD Focus',
    description: 'Turn Pomodoro focus into 8-bit boss battles, earn XP & unlock legendary loot',
    accentGradient: 'from-amber-500 via-orange-500 to-red-500',
    textColor: 'text-amber-400',
    iconName: 'gamepad-2',
  },
  {
    id: 'petvitals',
    name: 'PetVitals',
    badge: 'Pet Safety & ER',
    category: 'Pet Care & Emergency',
    description: '2-second food/plant toxicity camera check & 1-tap 24/7 veterinary dispatch',
    accentGradient: 'from-rose-500 to-red-600',
    textColor: 'text-rose-400',
    iconName: 'heart-pulse',
  },
];
