// CS:GO/CS2 Skin Database with categories and estimated prices in RM
// Prices are approximate market values and may fluctuate

export type CSGOWeapon = 
  | 'AK-47' | 'M4A4' | 'M4A1-S' | 'AWP' | 'Desert Eagle' | 'USP-S' | 'Glock-18'
  | 'AUG' | 'SG 553' | 'FAMAS' | 'Galil AR' | 'P250' | 'Five-SeveN' | 'Tec-9'
  | 'MAC-10' | 'MP9' | 'UMP-45' | 'P90' | 'SSG 08' | 'SCAR-20' | 'G3SG1'
  | 'Karambit' | 'Butterfly Knife' | 'M9 Bayonet' | 'Bayonet' | 'Flip Knife'
  | 'Huntsman Knife' | 'Bowie Knife' | 'Falchion Knife' | 'Shadow Daggers'
  | 'Navaja Knife' | 'Stiletto Knife' | 'Talon Knife' | 'Ursus Knife'
  | 'Classic Knife' | 'Paracord Knife' | 'Survival Knife' | 'Nomad Knife'
  | 'Skeleton Knife' | 'Kukri Knife' | 'Gloves';

export type CSGOWear = 'fn' | 'mw' | 'ft' | 'ww' | 'bs';

export interface CSGOSkinData {
  weapon: CSGOWeapon;
  name: string;
  collection: string;
  rarity: 'Consumer' | 'Industrial' | 'Mil-Spec' | 'Restricted' | 'Classified' | 'Covert' | 'Contraband' | 'Extraordinary';
  pricesRM: {
    fn?: number;
    mw?: number;
    ft?: number;
    ww?: number;
    bs?: number;
  };
  stattrakMultiplier?: number;
}

// Popular CS:GO/CS2 skins with estimated RM prices
export const CSGO_SKINS: CSGOSkinData[] = [
  // === AK-47 ===
  {
    weapon: 'AK-47',
    name: 'Asiimov',
    collection: 'Operation Phoenix',
    rarity: 'Covert',
    pricesRM: { fn: 850, mw: 350, ft: 180, ww: 150, bs: 130 },
    stattrakMultiplier: 2.5,
  },
  {
    weapon: 'AK-47',
    name: 'Vulcan',
    collection: 'Operation Breakout',
    rarity: 'Covert',
    pricesRM: { fn: 650, mw: 280, ft: 150, ww: 120, bs: 100 },
    stattrakMultiplier: 3,
  },
  {
    weapon: 'AK-47',
    name: 'Fire Serpent',
    collection: 'Operation Bravo',
    rarity: 'Covert',
    pricesRM: { fn: 8500, mw: 3800, ft: 2200, ww: 1800, bs: 1500 },
    stattrakMultiplier: 4,
  },
  {
    weapon: 'AK-47',
    name: 'Redline',
    collection: 'Phoenix Collection',
    rarity: 'Classified',
    pricesRM: { fn: 350, mw: 80, ft: 45, ww: 35, bs: 30 },
    stattrakMultiplier: 2.5,
  },
  {
    weapon: 'AK-47',
    name: 'Neon Rider',
    collection: 'Prisma Collection',
    rarity: 'Covert',
    pricesRM: { fn: 380, mw: 180, ft: 120, ww: 100, bs: 85 },
    stattrakMultiplier: 2,
  },
  {
    weapon: 'AK-47',
    name: 'The Empress',
    collection: 'Spectrum 2 Collection',
    rarity: 'Covert',
    pricesRM: { fn: 280, mw: 130, ft: 80, ww: 65, bs: 55 },
    stattrakMultiplier: 2.5,
  },
  {
    weapon: 'AK-47',
    name: 'Bloodsport',
    collection: 'Spectrum Collection',
    rarity: 'Covert',
    pricesRM: { fn: 220, mw: 120, ft: 80, ww: 65, bs: 55 },
    stattrakMultiplier: 2,
  },

  // === AWP ===
  {
    weapon: 'AWP',
    name: 'Dragon Lore',
    collection: 'Cobblestone Collection',
    rarity: 'Covert',
    pricesRM: { fn: 45000, mw: 28000, ft: 18000, ww: 15000, bs: 12000 },
  },
  {
    weapon: 'AWP',
    name: 'Gungnir',
    collection: 'Norse Collection',
    rarity: 'Covert',
    pricesRM: { fn: 32000, mw: 18000, ft: 12000, ww: 9500, bs: 7500 },
  },
  {
    weapon: 'AWP',
    name: 'Medusa',
    collection: 'Gods and Monsters',
    rarity: 'Covert',
    pricesRM: { fn: 18000, mw: 9500, ft: 5800, ww: 4800, bs: 4200 },
  },
  {
    weapon: 'AWP',
    name: 'Asiimov',
    collection: 'Phoenix Collection',
    rarity: 'Covert',
    pricesRM: { mw: 450, ft: 220, ww: 180, bs: 160 },
    stattrakMultiplier: 2.5,
  },
  {
    weapon: 'AWP',
    name: 'Lightning Strike',
    collection: 'CS:GO Weapon Case',
    rarity: 'Covert',
    pricesRM: { fn: 550, mw: 420, ft: 380, ww: 350, bs: 320 },
    stattrakMultiplier: 3,
  },
  {
    weapon: 'AWP',
    name: 'Hyper Beast',
    collection: 'Falchion Collection',
    rarity: 'Covert',
    pricesRM: { fn: 280, mw: 150, ft: 80, ww: 65, bs: 55 },
    stattrakMultiplier: 2,
  },

  // === M4A4 ===
  {
    weapon: 'M4A4',
    name: 'Howl',
    collection: 'Huntsman Collection',
    rarity: 'Contraband',
    pricesRM: { fn: 32000, mw: 18000, ft: 12000, ww: 10000, bs: 8500 },
    stattrakMultiplier: 4,
  },
  {
    weapon: 'M4A4',
    name: 'Asiimov',
    collection: 'Phoenix Collection',
    rarity: 'Covert',
    pricesRM: { fn: 850, mw: 280, ft: 110, ww: 85, bs: 70 },
    stattrakMultiplier: 2.5,
  },
  {
    weapon: 'M4A4',
    name: 'Neo-Noir',
    collection: 'Prisma Collection',
    rarity: 'Covert',
    pricesRM: { fn: 120, mw: 55, ft: 32, ww: 28, bs: 24 },
    stattrakMultiplier: 2,
  },

  // === M4A1-S ===
  {
    weapon: 'M4A1-S',
    name: 'Hot Rod',
    collection: 'Chroma Collection',
    rarity: 'Classified',
    pricesRM: { fn: 550, mw: 380 },
    stattrakMultiplier: 3,
  },
  {
    weapon: 'M4A1-S',
    name: 'Hyper Beast',
    collection: 'Falchion Collection',
    rarity: 'Covert',
    pricesRM: { fn: 180, mw: 85, ft: 45, ww: 38, bs: 32 },
    stattrakMultiplier: 2.5,
  },
  {
    weapon: 'M4A1-S',
    name: 'Printstream',
    collection: 'Snakebite Collection',
    rarity: 'Covert',
    pricesRM: { fn: 320, mw: 150, ft: 85, ww: 70, bs: 58 },
    stattrakMultiplier: 2.5,
  },

  // === Desert Eagle ===
  {
    weapon: 'Desert Eagle',
    name: 'Blaze',
    collection: 'Dust Collection',
    rarity: 'Restricted',
    pricesRM: { fn: 1200, mw: 950, ft: 850, ww: 780, bs: 720 },
    stattrakMultiplier: 3,
  },
  {
    weapon: 'Desert Eagle',
    name: 'Printstream',
    collection: 'Snakebite Collection',
    rarity: 'Covert',
    pricesRM: { fn: 250, mw: 120, ft: 65, ww: 52, bs: 45 },
    stattrakMultiplier: 2,
  },

  // === USP-S ===
  {
    weapon: 'USP-S',
    name: 'Kill Confirmed',
    collection: 'Shadow Collection',
    rarity: 'Covert',
    pricesRM: { fn: 280, mw: 130, ft: 75, ww: 62, bs: 52 },
    stattrakMultiplier: 2.5,
  },
  {
    weapon: 'USP-S',
    name: 'Printstream',
    collection: 'Snakebite Collection',
    rarity: 'Covert',
    pricesRM: { fn: 180, mw: 85, ft: 48, ww: 40, bs: 35 },
    stattrakMultiplier: 2,
  },

  // === Glock-18 ===
  {
    weapon: 'Glock-18',
    name: 'Fade',
    collection: 'Assault Collection',
    rarity: 'Restricted',
    pricesRM: { fn: 1800, mw: 1400, ft: 1200, ww: 1050, bs: 950 },
    stattrakMultiplier: 2.5,
  },

  // === KNIVES - Karambit ===
  {
    weapon: 'Karambit',
    name: 'Doppler',
    collection: 'Chroma Collection',
    rarity: 'Covert',
    pricesRM: { fn: 3200, mw: 2800, ft: 2500, ww: 2200, bs: 1900 },
    stattrakMultiplier: 1.5,
  },
  {
    weapon: 'Karambit',
    name: 'Fade',
    collection: 'Chroma Collection',
    rarity: 'Covert',
    pricesRM: { fn: 4500, mw: 4000, ft: 3600, ww: 3200, bs: 2800 },
    stattrakMultiplier: 1.5,
  },
  {
    weapon: 'Karambit',
    name: 'Tiger Tooth',
    collection: 'Chroma Collection',
    rarity: 'Covert',
    pricesRM: { fn: 2800, mw: 2500, ft: 2200, ww: 1900, bs: 1700 },
    stattrakMultiplier: 1.5,
  },

  // === KNIVES - Butterfly Knife ===
  {
    weapon: 'Butterfly Knife',
    name: 'Doppler',
    collection: 'Chroma 3 Collection',
    rarity: 'Covert',
    pricesRM: { fn: 4500, mw: 4000, ft: 3600, ww: 3200, bs: 2800 },
    stattrakMultiplier: 1.5,
  },
  {
    weapon: 'Butterfly Knife',
    name: 'Fade',
    collection: 'Spectrum Collection',
    rarity: 'Covert',
    pricesRM: { fn: 6500, mw: 5800, ft: 5200, ww: 4600, bs: 4000 },
    stattrakMultiplier: 1.5,
  },

  // === KNIVES - M9 Bayonet ===
  {
    weapon: 'M9 Bayonet',
    name: 'Doppler',
    collection: 'Chroma Collection',
    rarity: 'Covert',
    pricesRM: { fn: 2200, mw: 1900, ft: 1700, ww: 1500, bs: 1300 },
    stattrakMultiplier: 1.5,
  },
  {
    weapon: 'M9 Bayonet',
    name: 'Fade',
    collection: 'Chroma Collection',
    rarity: 'Covert',
    pricesRM: { fn: 2800, mw: 2500, ft: 2200, ww: 1950, bs: 1700 },
    stattrakMultiplier: 1.5,
  },

  // === GLOVES ===
  {
    weapon: 'Gloves',
    name: 'Sport Gloves | Pandoras Box',
    collection: 'Glove Collection',
    rarity: 'Extraordinary',
    pricesRM: { fn: 12000, mw: 5500, ft: 2800, ww: 2200, bs: 1800 },
  },
  {
    weapon: 'Gloves',
    name: 'Specialist Gloves | Crimson Kimono',
    collection: 'Glove Collection',
    rarity: 'Extraordinary',
    pricesRM: { fn: 18000, mw: 8500, ft: 4200, ww: 3200, bs: 2600 },
  },
  {
    weapon: 'Gloves',
    name: 'Specialist Gloves | Fade',
    collection: 'Glove Collection',
    rarity: 'Extraordinary',
    pricesRM: { fn: 8500, mw: 4200, ft: 2200, ww: 1700, bs: 1400 },
  },
];

// Get unique weapons
export const CSGO_WEAPONS = [...new Set(CSGO_SKINS.map(s => s.weapon))];

// Get unique collections
export const CSGO_COLLECTIONS = [...new Set(CSGO_SKINS.map(s => s.collection))];

// Get skins by weapon
export function getSkinsByWeapon(weapon: CSGOWeapon): CSGOSkinData[] {
  return CSGO_SKINS.filter(s => s.weapon === weapon);
}

// Get skin by weapon and name
export function getSkin(weapon: CSGOWeapon, name: string): CSGOSkinData | undefined {
  return CSGO_SKINS.find(s => s.weapon === weapon && s.name === name);
}

// Calculate price with StatTrak
export function getStatTrakPrice(skin: CSGOSkinData, wear: CSGOWear): number | undefined {
  const basePrice = skin.pricesRM[wear];
  if (!basePrice || !skin.stattrakMultiplier) return undefined;
  return Math.round(basePrice * skin.stattrakMultiplier);
}

// Wear display names
export const WEAR_NAMES: Record<CSGOWear, string> = {
  fn: 'Factory New',
  mw: 'Minimal Wear',
  ft: 'Field-Tested',
  ww: 'Well-Worn',
  bs: 'Battle-Scarred',
};

// Rarity colors
export const RARITY_COLORS: Record<string, string> = {
  'Consumer': '#b0c3d9',
  'Industrial': '#5e98d9',
  'Mil-Spec': '#4b69ff',
  'Restricted': '#8847ff',
  'Classified': '#d32ce6',
  'Covert': '#eb4b4b',
  'Contraband': '#e4ae39',
  'Extraordinary': '#e4ae39',
};
