export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  shareCode: string; // Unique code for friend sharing
  createdAt: string;
}

// ============ VALORANT ============
export interface ValorantSkin {
  id: string;
  odId: string; // owner user ID
  skinId: string; // Reference to skin database
  name: string;
  weapon: string;
  collection: string;
  tier: ValorantTier;
  variant?: string;
  vpCost: number;
  pricePaidRM: number; // Malaysian Ringgit
  acquiredDate: string;
  createdAt: string;
}

export type ValorantTier = 'select' | 'deluxe' | 'premium' | 'ultra' | 'exclusive';

export const VALORANT_TIERS: { value: ValorantTier; label: string; color: string; vpRange: string }[] = [
  { value: 'select', label: 'Select Edition', color: '#5a9fd4', vpRange: '875 VP' },
  { value: 'deluxe', label: 'Deluxe Edition', color: '#009587', vpRange: '1,275 VP' },
  { value: 'premium', label: 'Premium Edition', color: '#d1548d', vpRange: '1,775 VP' },
  { value: 'ultra', label: 'Ultra Edition', color: '#fad663', vpRange: '2,475 VP' },
  { value: 'exclusive', label: 'Exclusive Edition', color: '#f9a646', vpRange: '2,675+ VP' },
];

// ============ CS:GO / CS2 ============
export interface CSGOSkin {
  id: string;
  odId: string; // owner user ID
  name: string;
  weapon: string;
  skinName: string;
  wear: CSGOWear;
  statTrak: boolean;
  floatValue?: number;
  pricePaidRM: number; // Malaysian Ringgit
  currentMarketPriceRM: number; // Malaysian Ringgit
  acquiredDate: string;
  createdAt: string;
}

export type CSGOWear = 'fn' | 'mw' | 'ft' | 'ww' | 'bs';

export const CSGO_WEARS: { value: CSGOWear; label: string; range: string }[] = [
  { value: 'fn', label: 'Factory New', range: '0.00 - 0.07' },
  { value: 'mw', label: 'Minimal Wear', range: '0.07 - 0.15' },
  { value: 'ft', label: 'Field-Tested', range: '0.15 - 0.38' },
  { value: 'ww', label: 'Well-Worn', range: '0.38 - 0.45' },
  { value: 'bs', label: 'Battle-Scarred', range: '0.45 - 1.00' },
];

export const CSGO_WEAPONS = [
  'AK-47', 'M4A4', 'M4A1-S', 'AWP', 'AUG', 'SG 553', 'FAMAS', 'Galil AR', 'SSG 08', 'SCAR-20', 'G3SG1',
  'MAC-10', 'MP9', 'MP7', 'MP5-SD', 'UMP-45', 'P90', 'PP-Bizon',
  'Glock-18', 'USP-S', 'P2000', 'P250', 'Five-SeveN', 'Tec-9', 'CZ75-Auto', 'Desert Eagle', 'R8 Revolver', 'Dual Berettas',
  'Nova', 'XM1014', 'MAG-7', 'Sawed-Off', 'M249', 'Negev',
  'Knife', 'Gloves',
];

// ============ GAMING SUBSCRIPTIONS ============
export interface GamingSubscription {
  id: string;
  odId: string; // owner user ID
  service: SubscriptionService;
  tier: string;
  monthlyCostRM: number; // Malaysian Ringgit
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  renewalDate: string;
  autoRenew: boolean;
  active: boolean;
  createdAt: string;
}

export type SubscriptionService = 
  | 'xbox_gamepass_pc'
  | 'xbox_gamepass_ultimate'
  | 'ps_plus_essential'
  | 'ps_plus_extra'
  | 'ps_plus_premium'
  | 'ea_play'
  | 'ea_play_pro'
  | 'ubisoft_plus'
  | 'nintendo_online'
  | 'nintendo_expansion'
  | 'humble_choice'
  | 'other';

export const SUBSCRIPTION_SERVICES: { value: SubscriptionService; label: string; icon: string; color: string; monthlyRM: number }[] = [
  { value: 'xbox_gamepass_pc', label: 'Xbox Game Pass PC', icon: '🎮', color: '#107c10', monthlyRM: 44.90 },
  { value: 'xbox_gamepass_ultimate', label: 'Xbox Game Pass Ultimate', icon: '🎮', color: '#107c10', monthlyRM: 63.90 },
  { value: 'ps_plus_essential', label: 'PS Plus Essential', icon: '🎯', color: '#003791', monthlyRM: 23.90 },
  { value: 'ps_plus_extra', label: 'PS Plus Extra', icon: '🎯', color: '#003791', monthlyRM: 54.90 },
  { value: 'ps_plus_premium', label: 'PS Plus Premium', icon: '🎯', color: '#003791', monthlyRM: 72.90 },
  { value: 'ea_play', label: 'EA Play', icon: '⚡', color: '#ff4747', monthlyRM: 19.90 },
  { value: 'ea_play_pro', label: 'EA Play Pro', icon: '⚡', color: '#ff4747', monthlyRM: 64.90 },
  { value: 'ubisoft_plus', label: 'Ubisoft+', icon: '🔷', color: '#0070ff', monthlyRM: 74.90 },
  { value: 'nintendo_online', label: 'Nintendo Switch Online', icon: '🍄', color: '#e60012', monthlyRM: 17.90 },
  { value: 'nintendo_expansion', label: 'Nintendo Switch Online + Expansion', icon: '🍄', color: '#e60012', monthlyRM: 39.90 },
  { value: 'humble_choice', label: 'Humble Choice', icon: '📦', color: '#cc3333', monthlyRM: 53.90 },
  { value: 'other', label: 'Other', icon: '🎲', color: '#6b7280', monthlyRM: 0 },
];

// ============ GAME WORTH CALCULATOR ============
export interface GameWorthEntry {
  id: string;
  odId: string; // owner user ID
  gameName: string;
  priceRM: number;
  hoursToComplete: number;
  rmPerHour: number;
  worthIt: boolean;
  rating: 'excellent' | 'good' | 'okay' | 'poor' | 'terrible';
  notes?: string;
  createdAt: string;
}

export const WORTH_RATINGS = [
  { value: 'excellent', label: 'Excellent Value', minRmPerHour: 0, maxRmPerHour: 2, color: '#10b981', emoji: '🎯' },
  { value: 'good', label: 'Good Value', minRmPerHour: 2, maxRmPerHour: 5, color: '#22c55e', emoji: '👍' },
  { value: 'okay', label: 'Okay Value', minRmPerHour: 5, maxRmPerHour: 10, color: '#eab308', emoji: '😐' },
  { value: 'poor', label: 'Poor Value', minRmPerHour: 10, maxRmPerHour: 20, color: '#f97316', emoji: '👎' },
  { value: 'terrible', label: 'Terrible Value', minRmPerHour: 20, maxRmPerHour: Infinity, color: '#ef4444', emoji: '💸' },
];

// ============ FRIENDS & LEADERBOARD ============
export interface Friend {
  id: string;
  odId: string; // owner user ID
  odName: string;
  odShareCode: string;
  friendId: string;
  friendName: string;
  friendShareCode: string;
  addedAt: string;
}

export interface LeaderboardEntry {
  oderId: string;
  ownerName: string;
  totalSpentRM: number;
  valorantValue: number;
  csgoValue: number;
  totalSkins: number;
  rank: number;
}

// ============ AUTH ============
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
