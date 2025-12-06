import { VALORANT_TIERS, CSGO_WEARS, SUBSCRIPTION_SERVICES, WORTH_RATINGS } from '../types';
import type { ValorantTier, CSGOWear, SubscriptionService } from '../types';

// Format Malaysian Ringgit
export function formatRM(amount: number): string {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Short format for large numbers
export function formatRMShort(amount: number): string {
  if (amount >= 1000000) {
    return `RM ${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `RM ${(amount / 1000).toFixed(1)}K`;
  }
  return formatRM(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

export function formatDateShort(dateString: string): string {
  return new Intl.DateTimeFormat('en-MY', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

export function getValorantTierInfo(tier: ValorantTier) {
  return VALORANT_TIERS.find(t => t.value === tier) || VALORANT_TIERS[0];
}

export function getCSGOWearInfo(wear: CSGOWear) {
  return CSGO_WEARS.find(w => w.value === wear) || CSGO_WEARS[2];
}

export function getSubscriptionServiceInfo(service: SubscriptionService) {
  return SUBSCRIPTION_SERVICES.find(s => s.value === service) || SUBSCRIPTION_SERVICES[11];
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getWearShorthand(wear: CSGOWear): string {
  const map: Record<CSGOWear, string> = {
    fn: 'FN',
    mw: 'MW',
    ft: 'FT',
    ww: 'WW',
    bs: 'BS',
  };
  return map[wear];
}

export function formatVP(vp: number): string {
  return `${vp.toLocaleString()} VP`;
}

export function daysUntil(dateString: string): number {
  const today = new Date();
  const target = new Date(dateString);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getPercentChange(current: number, original: number): number {
  if (original === 0) return 0;
  return ((current - original) / original) * 100;
}

// Calculate RM per hour and rating
export function calculateGameWorth(priceRM: number, hours: number): { rmPerHour: number; rating: string; worthIt: boolean } {
  if (hours <= 0) return { rmPerHour: 0, rating: 'okay', worthIt: true };
  
  const rmPerHour = priceRM / hours;
  
  for (const rating of WORTH_RATINGS) {
    if (rmPerHour >= rating.minRmPerHour && rmPerHour < rating.maxRmPerHour) {
      return {
        rmPerHour,
        rating: rating.value,
        worthIt: rmPerHour <= 10,
      };
    }
  }
  
  return { rmPerHour, rating: 'terrible', worthIt: false };
}

export function getWorthRatingInfo(rating: string) {
  return WORTH_RATINGS.find(r => r.value === rating) || WORTH_RATINGS[2];
}

// VP to RM conversion (100 VP ≈ RM 4.50)
export const VP_TO_RM = 0.045;

export function vpToRM(vp: number): number {
  return vp * VP_TO_RM;
}

export function rmToVP(rm: number): number {
  return rm / VP_TO_RM;
}

// Generate shareable link
export function generateShareLink(shareCode: string): string {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#/profile/${shareCode}`;
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
