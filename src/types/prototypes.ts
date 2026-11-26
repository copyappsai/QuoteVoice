export type PrototypeId = 
  | 'vapestop' 
  | 'presence' 
  | 'auramatch' 
  | 'caffeineclock' 
  | 'noisezero' 
  | 'speedread' 
  | 'carblens' 
  | 'rentproof' 
  | 'flightpulse' 
  | 'memorypalace' 
  | 'ghostfilter' 
  | 'plantwhisper'
  | 'quotevoice' 
  | 'sleeppulse' 
  | 'pantrychef' 
  | 'habitquest' 
  | 'petvitals';

export interface PrototypeAppInfo {
  id: PrototypeId;
  name: string;
  badge: string;
  category: string;
  description: string;
  accentGradient: string;
  textColor: string;
  iconName: string;
  designStyle: string;
}

export const PROTOTYPE_CATALOG: PrototypeAppInfo[] = [
  // 1. VapeStop
  {
    id: 'vapestop',
    name: 'VapeStop',
    badge: 'Nicotine Freedom',
    category: 'Addiction & Lung Health',
    description: 'Craving SOS 4-7-8 breathing, puffs avoided tracker & lung cilia regeneration radar',
    accentGradient: 'from-cyan-500 via-teal-500 to-emerald-600',
    textColor: 'text-cyan-400',
    iconName: 'wind',
    designStyle: 'Medical Cyber-Mint',
  },
  // 2. Stillness
  {
    id: 'presence',
    name: 'Stillness',
    badge: 'Digital Detox',
    category: 'Apple Design Award • Wellbeing',
    description: 'Tracks untouched phone time, face-down flip mode & celebrates real-world life reclaimed',
    accentGradient: 'from-neutral-700 via-neutral-600 to-neutral-500',
    textColor: 'text-neutral-200',
    iconName: 'compass',
    designStyle: 'Apple HIG Minimalist OLED',
  },
  // 3. AuraMatch
  {
    id: 'auramatch',
    name: 'AuraMatch',
    badge: 'Color Analysis',
    category: 'Fashion & Luxury Styling',
    description: 'Camera seasonal undertone analysis & instant wardrobe color harmony scan',
    accentGradient: 'from-amber-200 via-rose-300 to-amber-500',
    textColor: 'text-amber-300',
    iconName: 'sparkles',
    designStyle: 'Haute Couture Editorial Luxury',
  },
  // 4. CaffeineClock
  {
    id: 'caffeineclock',
    name: 'CaffeineClock',
    badge: 'Biohack Half-Life',
    category: 'Biohacking & Sleep Optimization',
    description: 'Predicts exact blood adenosine crash & tells you when to cut off coffee for 100% deep sleep',
    accentGradient: 'from-amber-600 via-orange-600 to-amber-800',
    textColor: 'text-amber-500',
    iconName: 'coffee',
    designStyle: 'Biometric Amber Neumorphism',
  },
  // 5. NoiseZero
  {
    id: 'noisezero',
    name: 'NoiseZero',
    badge: 'Acoustic Audit',
    category: 'Real Estate & Travel Peace',
    description: 'Calibrated dB decibel scan detects thin hotel/apartment walls before you sign or book',
    accentGradient: 'from-violet-600 via-purple-600 to-indigo-600',
    textColor: 'text-purple-400',
    iconName: 'volume-2',
    designStyle: 'Sonic Spectrum Studio',
  },
  // 6. SpeedRead
  {
    id: 'speedread',
    name: 'SpeedRead',
    badge: 'Bionic RSVP',
    category: 'Education & 3x Reading',
    description: 'Optical anchor bionic RSVP reader flashes words at 650 WPM without eye fatigue',
    accentGradient: 'from-neutral-800 via-neutral-600 to-neutral-200',
    textColor: 'text-rose-500',
    iconName: 'book-open',
    designStyle: 'Bauhaus Stark Monochrome',
  },
  // 7. CarbLens
  {
    id: 'carblens',
    name: 'CarbLens',
    badge: 'Diabetic & Keto AI',
    category: 'Nutrition & Metabolic Health',
    description: 'Snap meal plate -> instant net carbs, glycemic curve & insulin impact calculation',
    accentGradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    textColor: 'text-emerald-400',
    iconName: 'activity',
    designStyle: 'Clean Clinical Glassmorphism',
  },
  // 8. RentProof
  {
    id: 'rentproof',
    name: 'RentProof',
    badge: 'Tenant Vault',
    category: 'Legal Defense & Real Estate',
    description: 'Cryptographic timestamp 360 walk-through video audit to stop landlord deposit theft',
    accentGradient: 'from-slate-600 via-zinc-600 to-stone-500',
    textColor: 'text-slate-300',
    iconName: 'shield',
    designStyle: 'Secure Titanium Ledger',
  },
  // 9. FlightPulse
  {
    id: 'flightpulse',
    name: 'FlightPulse',
    badge: 'Aviation Co-Pilot',
    category: 'Travel & Fear of Flying',
    description: 'Live atmospheric turbulence radar & soothing altitude attitude co-pilot for nervous flyers',
    accentGradient: 'from-blue-600 via-indigo-600 to-sky-500',
    textColor: 'text-sky-400',
    iconName: 'plane',
    designStyle: 'Avionics Cockpit Instrument',
  },
  // 10. MemoryPalace
  {
    id: 'memorypalace',
    name: 'MemoryPalace',
    badge: 'Spatial Recall',
    category: 'Memory Athlete & Exam Prep',
    description: 'Anchors complex formulas and anatomy onto real room furniture using spatial AR loci',
    accentGradient: 'from-fuchsia-600 via-pink-600 to-rose-600',
    textColor: 'text-pink-400',
    iconName: 'box',
    designStyle: 'Spatial Prismatic Glass',
  },
  // 11. GhostFilter
  {
    id: 'ghostfilter',
    name: 'GhostFilter',
    badge: 'Scam Assassin',
    category: 'Cybersecurity & Privacy',
    description: 'Deepfake voice cadence analyzer & dark-pattern phishing SMS breaker in 1 second',
    accentGradient: 'from-red-600 via-rose-700 to-neutral-900',
    textColor: 'text-red-400',
    iconName: 'eye-off',
    designStyle: 'Tactical Matrix Defense',
  },
  // 12. PlantWhisper
  {
    id: 'plantwhisper',
    name: 'PlantWhisper',
    badge: 'Botanical AI',
    category: 'Smart Home & Botany',
    description: 'Micro-climate lux meter & camera leaf diagnostic to keep exotic house plants thriving',
    accentGradient: 'from-lime-600 via-emerald-600 to-green-700',
    textColor: 'text-lime-400',
    iconName: 'leaf',
    designStyle: 'Nordic Botanical Terracotta',
  },
  // Previous apps:
  {
    id: 'quotevoice',
    name: 'QuoteVoice',
    badge: 'Trades AI',
    category: 'Work & Field Construction',
    description: 'Instant professional PDF invoices & estimates just by speaking on the job',
    accentGradient: 'from-blue-600 to-indigo-600',
    textColor: 'text-blue-500',
    iconName: 'mic',
    designStyle: 'Contractor Blue Titanium',
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
    designStyle: 'Biohack Night Indigo',
  },
  {
    id: 'pantrychef',
    name: 'PantryChef',
    badge: 'Zero-Waste Cooking',
    category: 'Food & Home Kitchen',
    description: 'Snap fridge shelf -> 15-min gourmet recipes using only what expires in 48h',
    accentGradient: 'from-emerald-500 to-teal-600',
    textColor: 'text-emerald-400',
    iconName: 'chef-hat',
    designStyle: 'Fresh Organic Kitchen',
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
    designStyle: 'Arcade 8-Bit Cyberpunk',
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
    designStyle: 'Clinical Coral Hospital',
  },
];
