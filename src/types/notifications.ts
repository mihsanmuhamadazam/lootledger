export interface SaleNotification {
  id: string;
  title: string;
  description: string;
  game: 'valorant' | 'csgo' | 'general';
  discount?: number;
  originalPrice?: number;
  salePrice?: number;
  startDate: string;
  endDate: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

// Sample upcoming sales data (in a real app, this would come from an API)
export const UPCOMING_SALES: Omit<SaleNotification, 'id' | 'read' | 'createdAt'>[] = [
  {
    title: '🔥 Valorant Night Market',
    description: 'Your personalized Night Market is here! Get up to 43% off on 6 random skins.',
    game: 'valorant',
    discount: 43,
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    endDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(), // 16 days from now
  },
  {
    title: '🎄 Winter Sale Coming',
    description: 'CS2 Winter Sale starts soon! Expect discounts on cases and operation passes.',
    game: 'csgo',
    discount: 50,
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: '💎 Champions Bundle Return',
    description: 'The Champions 2024 Bundle might return to the store for a limited time!',
    game: 'valorant',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: '🎮 Xbox Game Pass Deal',
    description: 'Get 3 months of Game Pass Ultimate for the price of 1! Limited time offer.',
    game: 'general',
    discount: 67,
    originalPrice: 191.70,
    salePrice: 63.90,
    startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: '⚡ Steam Major Sticker Sale',
    description: 'CS2 Major stickers will go on sale at 75% off after the tournament ends!',
    game: 'csgo',
    discount: 75,
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
