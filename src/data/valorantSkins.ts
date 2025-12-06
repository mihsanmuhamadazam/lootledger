// Comprehensive Valorant Skin Database with VP Costs
// Prices are in VP (Valorant Points)

export interface ValorantSkinData {
  id: string;
  name: string;
  collection: string;
  weapon: string;
  tier: 'select' | 'deluxe' | 'premium' | 'ultra' | 'exclusive';
  vpCost: number;
  variants?: string[];
  releaseDate?: string;
}

export interface ValorantBundleData {
  id: string;
  name: string;
  vpCost: number;
  discountedVpCost?: number;
  skins: string[];
  releaseDate?: string;
  tier: 'select' | 'deluxe' | 'premium' | 'ultra' | 'exclusive';
}

// VP to MYR conversion rate (approximate)
// 100 VP ≈ RM 4.50 (based on typical purchase rates)
export const VP_TO_MYR = 0.045;

// Tier pricing structure
export const TIER_PRICING = {
  select: { single: 875, bundle: 2930 },
  deluxe: { single: 1275, bundle: 4270 },
  premium: { single: 1775, bundle: 5945 },
  ultra: { single: 2475, bundle: 8290 },
  exclusive: { single: 2675, bundle: 9900 },
};

// Popular Valorant Bundles with accurate pricing
export const VALORANT_BUNDLES: ValorantBundleData[] = [
  // Ultra Edition Bundles
  { id: 'champions-2021', name: 'Champions 2021', vpCost: 6264, tier: 'exclusive', skins: ['Vandal'], releaseDate: '2021-11' },
  { id: 'champions-2022', name: 'Champions 2022', vpCost: 6264, tier: 'exclusive', skins: ['Phantom'], releaseDate: '2022-08' },
  { id: 'champions-2023', name: 'Champions 2023', vpCost: 6264, tier: 'exclusive', skins: ['Operator'], releaseDate: '2023-08' },
  { id: 'champions-2024', name: 'Champions 2024', vpCost: 6264, tier: 'exclusive', skins: ['Vandal'], releaseDate: '2024-08' },
  
  // Ultra Bundles
  { id: 'elderflame', name: 'Elderflame', vpCost: 9900, tier: 'ultra', skins: ['Vandal', 'Judge', 'Frenzy', 'Operator', 'Dagger'], releaseDate: '2020-07' },
  { id: 'singularity', name: 'Singularity', vpCost: 8700, tier: 'ultra', skins: ['Phantom', 'Spectre', 'Sheriff', 'Ares', 'Melee'], releaseDate: '2020-09' },
  { id: 'glitchpop', name: 'Glitchpop', vpCost: 8700, tier: 'ultra', skins: ['Vandal', 'Phantom', 'Classic', 'Frenzy', 'Odin', 'Dagger'], releaseDate: '2020-11' },
  { id: 'ion', name: 'Ion', vpCost: 7100, tier: 'premium', skins: ['Phantom', 'Operator', 'Bucky', 'Sheriff', 'Energy Sword'], releaseDate: '2020-06' },
  { id: 'prime', name: 'Prime', vpCost: 7100, tier: 'premium', skins: ['Vandal', 'Classic', 'Spectre', 'Guardian', 'Axe'], releaseDate: '2020-06' },
  { id: 'prime-2', name: 'Prime 2.0', vpCost: 8700, tier: 'ultra', skins: ['Phantom', 'Frenzy', 'Bucky', 'Odin', 'Karambit'], releaseDate: '2021-03' },
  { id: 'reaver', name: 'Reaver', vpCost: 7100, tier: 'premium', skins: ['Vandal', 'Sheriff', 'Operator', 'Guardian', 'Knife'], releaseDate: '2020-06' },
  { id: 'reaver-2', name: 'Reaver 2.0', vpCost: 8700, tier: 'ultra', skins: ['Phantom', 'Ghost', 'Spectre', 'Odin', 'Karambit'], releaseDate: '2024-10' },
  { id: 'spectrum', name: 'Spectrum', vpCost: 10700, tier: 'ultra', skins: ['Phantom', 'Classic', 'Guardian', 'Bulldog', 'Waveform'], releaseDate: '2021-08' },
  { id: 'rgx-11z-pro', name: 'RGX 11z Pro', vpCost: 8700, tier: 'ultra', skins: ['Vandal', 'Stinger', 'Classic', 'Firefly', 'Blade'], releaseDate: '2021-10' },
  { id: 'protocol-781-a', name: 'Protocol 781-A', vpCost: 8700, tier: 'ultra', skins: ['Phantom', 'Spectre', 'Bulldog', 'Sheriff', 'Ares', 'Baton'], releaseDate: '2022-06' },
  { id: 'araxys', name: 'Araxys', vpCost: 8700, tier: 'ultra', skins: ['Vandal', 'Operator', 'Sheriff', 'Spectre', 'Blade'], releaseDate: '2022-11' },
  { id: 'chronovoid', name: 'Chronovoid', vpCost: 8700, tier: 'ultra', skins: ['Vandal', 'Phantom', 'Judge', 'Classic', 'Axe'], releaseDate: '2023-08' },
  { id: 'evori-dreamwings', name: 'Evori Dreamwings', vpCost: 8700, tier: 'ultra', skins: ['Vandal', 'Operator', 'Stinger', 'Ghost', 'Wand'], releaseDate: '2024-02' },
  { id: 'mystbloom', name: 'Mystbloom', vpCost: 8700, tier: 'ultra', skins: ['Vandal', 'Bucky', 'Ghost', 'Odin', 'Blade'], releaseDate: '2024-05' },
  
  // Premium Bundles
  { id: 'sovereign', name: 'Sovereign', vpCost: 7100, tier: 'premium', skins: ['Ghost', 'Stinger', 'Guardian', 'Marshal', 'Sword'], releaseDate: '2020-08' },
  { id: 'oni', name: 'Oni', vpCost: 7100, tier: 'premium', skins: ['Phantom', 'Shorty', 'Bucky', 'Guardian', 'Claw'], releaseDate: '2020-07' },
  { id: 'ruination', name: 'Ruination', vpCost: 8700, tier: 'premium', skins: ['Phantom', 'Spectre', 'Ghost', 'Guardian', 'Sword'], releaseDate: '2021-07' },
  { id: 'origin', name: 'Origin', vpCost: 7100, tier: 'premium', skins: ['Vandal', 'Operator', 'Shorty', 'Classic', 'Crescent Blade'], releaseDate: '2020-06' },
  { id: 'sentinels-of-light', name: 'Sentinels of Light', vpCost: 8700, tier: 'premium', skins: ['Vandal', 'Operator', 'Sheriff', 'Ares', 'Melee'], releaseDate: '2021-07' },
  { id: 'forsaken', name: 'Forsaken', vpCost: 7100, tier: 'premium', skins: ['Vandal', 'Spectre', 'Classic', 'Operator', 'Ritual Blade'], releaseDate: '2021-04' },
  { id: 'magepunk', name: 'Magepunk', vpCost: 7100, tier: 'premium', skins: ['Spectre', 'Bucky', 'Ghost', 'Operator', 'Shock Gauntlet'], releaseDate: '2021-03' },
  { id: 'magepunk-2', name: 'Magepunk 2.0', vpCost: 7100, tier: 'premium', skins: ['Vandal', 'Phantom', 'Marshal', 'Classic', 'Electroknife'], releaseDate: '2024-03' },
  
  // Deluxe Bundles
  { id: 'sakura', name: 'Sakura', vpCost: 4270, tier: 'deluxe', skins: ['Stinger', 'Frenzy', 'Ghost', 'Vandal'], releaseDate: '2021-02' },
  { id: 'minima', name: 'Minima', vpCost: 4270, tier: 'deluxe', skins: ['Vandal', 'Operator', 'Classic'], releaseDate: '2021-06' },
  
  // Select Bundles  
  { id: 'infantry', name: 'Infantry', vpCost: 2930, tier: 'select', skins: ['Vandal', 'Guardian', 'Spectre', 'Operator'], releaseDate: '2020-06' },
  { id: 'convex', name: 'Convex', vpCost: 2930, tier: 'select', skins: ['Operator', 'Spectre', 'Sheriff'], releaseDate: '2020-07' },
  { id: 'rush', name: 'Rush', vpCost: 2930, tier: 'select', skins: ['Frenzy', 'Odin', 'Phantom'], releaseDate: '2020-08' },
];

// Individual skin prices
export const VALORANT_SKINS: ValorantSkinData[] = [
  // Elderflame
  { id: 'elderflame-vandal', name: 'Elderflame Vandal', collection: 'Elderflame', weapon: 'vandal', tier: 'ultra', vpCost: 2475, variants: ['Red', 'Blue', 'Green', 'Gold'] },
  { id: 'elderflame-operator', name: 'Elderflame Operator', collection: 'Elderflame', weapon: 'operator', tier: 'ultra', vpCost: 2475 },
  { id: 'elderflame-judge', name: 'Elderflame Judge', collection: 'Elderflame', weapon: 'judge', tier: 'ultra', vpCost: 2475 },
  { id: 'elderflame-frenzy', name: 'Elderflame Frenzy', collection: 'Elderflame', weapon: 'frenzy', tier: 'ultra', vpCost: 2475 },
  { id: 'elderflame-dagger', name: 'Elderflame Dagger', collection: 'Elderflame', weapon: 'knife', tier: 'ultra', vpCost: 4950 },
  
  // Prime
  { id: 'prime-vandal', name: 'Prime Vandal', collection: 'Prime', weapon: 'vandal', tier: 'premium', vpCost: 1775, variants: ['Gold', 'Blue', 'Green', 'Orange'] },
  { id: 'prime-classic', name: 'Prime Classic', collection: 'Prime', weapon: 'classic', tier: 'premium', vpCost: 1775 },
  { id: 'prime-spectre', name: 'Prime Spectre', collection: 'Prime', weapon: 'spectre', tier: 'premium', vpCost: 1775 },
  { id: 'prime-guardian', name: 'Prime Guardian', collection: 'Prime', weapon: 'guardian', tier: 'premium', vpCost: 1775 },
  { id: 'prime-axe', name: 'Prime Axe', collection: 'Prime', weapon: 'knife', tier: 'premium', vpCost: 3550 },
  
  // Prime 2.0
  { id: 'prime2-phantom', name: 'Prime//2.0 Phantom', collection: 'Prime 2.0', weapon: 'phantom', tier: 'ultra', vpCost: 2175, variants: ['Gold', 'Blue', 'Green', 'Red'] },
  { id: 'prime2-frenzy', name: 'Prime//2.0 Frenzy', collection: 'Prime 2.0', weapon: 'frenzy', tier: 'ultra', vpCost: 2175 },
  { id: 'prime2-bucky', name: 'Prime//2.0 Bucky', collection: 'Prime 2.0', weapon: 'bucky', tier: 'ultra', vpCost: 2175 },
  { id: 'prime2-odin', name: 'Prime//2.0 Odin', collection: 'Prime 2.0', weapon: 'odin', tier: 'ultra', vpCost: 2175 },
  { id: 'prime2-karambit', name: 'Prime//2.0 Karambit', collection: 'Prime 2.0', weapon: 'knife', tier: 'ultra', vpCost: 4350 },
  
  // Reaver
  { id: 'reaver-vandal', name: 'Reaver Vandal', collection: 'Reaver', weapon: 'vandal', tier: 'premium', vpCost: 1775, variants: ['Red', 'Black', 'White', 'Pink'] },
  { id: 'reaver-sheriff', name: 'Reaver Sheriff', collection: 'Reaver', weapon: 'sheriff', tier: 'premium', vpCost: 1775 },
  { id: 'reaver-operator', name: 'Reaver Operator', collection: 'Reaver', weapon: 'operator', tier: 'premium', vpCost: 1775 },
  { id: 'reaver-guardian', name: 'Reaver Guardian', collection: 'Reaver', weapon: 'guardian', tier: 'premium', vpCost: 1775 },
  { id: 'reaver-knife', name: 'Reaver Knife', collection: 'Reaver', weapon: 'knife', tier: 'premium', vpCost: 3550 },
  
  // Reaver 2.0
  { id: 'reaver2-phantom', name: 'Reaver 2.0 Phantom', collection: 'Reaver 2.0', weapon: 'phantom', tier: 'ultra', vpCost: 2475 },
  { id: 'reaver2-ghost', name: 'Reaver 2.0 Ghost', collection: 'Reaver 2.0', weapon: 'ghost', tier: 'ultra', vpCost: 2475 },
  { id: 'reaver2-spectre', name: 'Reaver 2.0 Spectre', collection: 'Reaver 2.0', weapon: 'spectre', tier: 'ultra', vpCost: 2475 },
  { id: 'reaver2-odin', name: 'Reaver 2.0 Odin', collection: 'Reaver 2.0', weapon: 'odin', tier: 'ultra', vpCost: 2475 },
  { id: 'reaver2-karambit', name: 'Reaver 2.0 Karambit', collection: 'Reaver 2.0', weapon: 'knife', tier: 'ultra', vpCost: 4950 },
  
  // Glitchpop
  { id: 'glitchpop-vandal', name: 'Glitchpop Vandal', collection: 'Glitchpop', weapon: 'vandal', tier: 'ultra', vpCost: 2175, variants: ['Default', 'Blue', 'Red', 'Gold'] },
  { id: 'glitchpop-phantom', name: 'Glitchpop Phantom', collection: 'Glitchpop', weapon: 'phantom', tier: 'ultra', vpCost: 2175 },
  { id: 'glitchpop-classic', name: 'Glitchpop Classic', collection: 'Glitchpop', weapon: 'classic', tier: 'ultra', vpCost: 2175 },
  { id: 'glitchpop-frenzy', name: 'Glitchpop Frenzy', collection: 'Glitchpop', weapon: 'frenzy', tier: 'ultra', vpCost: 2175 },
  { id: 'glitchpop-odin', name: 'Glitchpop Odin', collection: 'Glitchpop', weapon: 'odin', tier: 'ultra', vpCost: 2175 },
  { id: 'glitchpop-dagger', name: 'Glitchpop Dagger', collection: 'Glitchpop', weapon: 'knife', tier: 'ultra', vpCost: 4350 },
  
  // Ion
  { id: 'ion-phantom', name: 'Ion Phantom', collection: 'Ion', weapon: 'phantom', tier: 'ultra', vpCost: 1775, variants: ['Default', 'Red', 'Purple', 'Gold'] },
  { id: 'ion-operator', name: 'Ion Operator', collection: 'Ion', weapon: 'operator', tier: 'ultra', vpCost: 1775 },
  { id: 'ion-bucky', name: 'Ion Bucky', collection: 'Ion', weapon: 'bucky', tier: 'ultra', vpCost: 1775 },
  { id: 'ion-sheriff', name: 'Ion Sheriff', collection: 'Ion', weapon: 'sheriff', tier: 'ultra', vpCost: 1775 },
  { id: 'ion-energy-sword', name: 'Ion Energy Sword', collection: 'Ion', weapon: 'knife', tier: 'ultra', vpCost: 3550 },
  
  // Oni
  { id: 'oni-phantom', name: 'Oni Phantom', collection: 'Oni', weapon: 'phantom', tier: 'premium', vpCost: 1775, variants: ['Default', 'Blue', 'Green', 'Red'] },
  { id: 'oni-shorty', name: 'Oni Shorty', collection: 'Oni', weapon: 'shorty', tier: 'premium', vpCost: 1775 },
  { id: 'oni-bucky', name: 'Oni Bucky', collection: 'Oni', weapon: 'bucky', tier: 'premium', vpCost: 1775 },
  { id: 'oni-guardian', name: 'Oni Guardian', collection: 'Oni', weapon: 'guardian', tier: 'premium', vpCost: 1775 },
  { id: 'oni-claw', name: 'Oni Claw', collection: 'Oni', weapon: 'knife', tier: 'premium', vpCost: 3550 },
  
  // Spectrum
  { id: 'spectrum-phantom', name: 'Spectrum Phantom', collection: 'Spectrum', weapon: 'phantom', tier: 'ultra', vpCost: 2675, variants: ['Default', 'Red', 'Blue', 'Purple'] },
  { id: 'spectrum-classic', name: 'Spectrum Classic', collection: 'Spectrum', weapon: 'classic', tier: 'ultra', vpCost: 2675 },
  { id: 'spectrum-guardian', name: 'Spectrum Guardian', collection: 'Spectrum', weapon: 'guardian', tier: 'ultra', vpCost: 2675 },
  { id: 'spectrum-bulldog', name: 'Spectrum Bulldog', collection: 'Spectrum', weapon: 'bulldog', tier: 'ultra', vpCost: 2675 },
  { id: 'spectrum-waveform', name: 'Spectrum Waveform', collection: 'Spectrum', weapon: 'knife', tier: 'ultra', vpCost: 5350 },
  
  // RGX 11z Pro
  { id: 'rgx-vandal', name: 'RGX 11z Pro Vandal', collection: 'RGX 11z Pro', weapon: 'vandal', tier: 'ultra', vpCost: 2175, variants: ['Yellow', 'Blue', 'Red', 'White'] },
  { id: 'rgx-stinger', name: 'RGX 11z Pro Stinger', collection: 'RGX 11z Pro', weapon: 'stinger', tier: 'ultra', vpCost: 2175 },
  { id: 'rgx-classic', name: 'RGX 11z Pro Classic', collection: 'RGX 11z Pro', weapon: 'classic', tier: 'ultra', vpCost: 2175 },
  { id: 'rgx-firefly', name: 'RGX 11z Pro Firefly', collection: 'RGX 11z Pro', weapon: 'frenzy', tier: 'ultra', vpCost: 2175 },
  { id: 'rgx-blade', name: 'RGX 11z Pro Blade', collection: 'RGX 11z Pro', weapon: 'knife', tier: 'ultra', vpCost: 4350 },
  
  // Protocol 781-A
  { id: 'protocol-phantom', name: 'Protocol 781-A Phantom', collection: 'Protocol 781-A', weapon: 'phantom', tier: 'ultra', vpCost: 2175 },
  { id: 'protocol-spectre', name: 'Protocol 781-A Spectre', collection: 'Protocol 781-A', weapon: 'spectre', tier: 'ultra', vpCost: 2175 },
  { id: 'protocol-bulldog', name: 'Protocol 781-A Bulldog', collection: 'Protocol 781-A', weapon: 'bulldog', tier: 'ultra', vpCost: 2175 },
  { id: 'protocol-sheriff', name: 'Protocol 781-A Sheriff', collection: 'Protocol 781-A', weapon: 'sheriff', tier: 'ultra', vpCost: 2175 },
  { id: 'protocol-ares', name: 'Protocol 781-A Ares', collection: 'Protocol 781-A', weapon: 'ares', tier: 'ultra', vpCost: 2175 },
  { id: 'protocol-baton', name: 'Protocol 781-A Baton', collection: 'Protocol 781-A', weapon: 'knife', tier: 'ultra', vpCost: 4350 },
  
  // Champions skins
  { id: 'champions-2021-karambit', name: 'Champions 2021 Karambit', collection: 'Champions 2021', weapon: 'knife', tier: 'exclusive', vpCost: 5350 },
  { id: 'champions-2021-vandal', name: 'Champions 2021 Vandal', collection: 'Champions 2021', weapon: 'vandal', tier: 'exclusive', vpCost: 2675 },
  { id: 'champions-2022-phantom', name: 'Champions 2022 Phantom', collection: 'Champions 2022', weapon: 'phantom', tier: 'exclusive', vpCost: 2675 },
  { id: 'champions-2022-butterfly', name: 'Champions 2022 Butterfly Knife', collection: 'Champions 2022', weapon: 'knife', tier: 'exclusive', vpCost: 5350 },
  { id: 'champions-2023-operator', name: 'Champions 2023 Operator', collection: 'Champions 2023', weapon: 'operator', tier: 'exclusive', vpCost: 2675 },
  { id: 'champions-2024-vandal', name: 'Champions 2024 Vandal', collection: 'Champions 2024', weapon: 'vandal', tier: 'exclusive', vpCost: 2675 },
  
  // Singularity
  { id: 'singularity-phantom', name: 'Singularity Phantom', collection: 'Singularity', weapon: 'phantom', tier: 'ultra', vpCost: 2175 },
  { id: 'singularity-spectre', name: 'Singularity Spectre', collection: 'Singularity', weapon: 'spectre', tier: 'ultra', vpCost: 2175 },
  { id: 'singularity-sheriff', name: 'Singularity Sheriff', collection: 'Singularity', weapon: 'sheriff', tier: 'ultra', vpCost: 2175 },
  { id: 'singularity-ares', name: 'Singularity Ares', collection: 'Singularity', weapon: 'ares', tier: 'ultra', vpCost: 2175 },
  { id: 'singularity-melee', name: 'Singularity Melee', collection: 'Singularity', weapon: 'knife', tier: 'ultra', vpCost: 4350 },
  
  // Araxys
  { id: 'araxys-vandal', name: 'Araxys Vandal', collection: 'Araxys', weapon: 'vandal', tier: 'ultra', vpCost: 2175 },
  { id: 'araxys-operator', name: 'Araxys Operator', collection: 'Araxys', weapon: 'operator', tier: 'ultra', vpCost: 2175 },
  { id: 'araxys-sheriff', name: 'Araxys Sheriff', collection: 'Araxys', weapon: 'sheriff', tier: 'ultra', vpCost: 2175 },
  { id: 'araxys-spectre', name: 'Araxys Spectre', collection: 'Araxys', weapon: 'spectre', tier: 'ultra', vpCost: 2175 },
  { id: 'araxys-blade', name: 'Araxys Blade', collection: 'Araxys', weapon: 'knife', tier: 'ultra', vpCost: 4350 },
  
  // Evori Dreamwings
  { id: 'evori-vandal', name: 'Evori Dreamwings Vandal', collection: 'Evori Dreamwings', weapon: 'vandal', tier: 'ultra', vpCost: 2175 },
  { id: 'evori-operator', name: 'Evori Dreamwings Operator', collection: 'Evori Dreamwings', weapon: 'operator', tier: 'ultra', vpCost: 2175 },
  { id: 'evori-stinger', name: 'Evori Dreamwings Stinger', collection: 'Evori Dreamwings', weapon: 'stinger', tier: 'ultra', vpCost: 2175 },
  { id: 'evori-ghost', name: 'Evori Dreamwings Ghost', collection: 'Evori Dreamwings', weapon: 'ghost', tier: 'ultra', vpCost: 2175 },
  { id: 'evori-wand', name: 'Evori Dreamwings Wand', collection: 'Evori Dreamwings', weapon: 'knife', tier: 'ultra', vpCost: 4350 },
];

// Get all unique collections
export const getCollections = (): string[] => {
  const collections = new Set<string>();
  VALORANT_SKINS.forEach(skin => collections.add(skin.collection));
  return Array.from(collections).sort();
};

// Get skins by collection
export const getSkinsByCollection = (collection: string): ValorantSkinData[] => {
  return VALORANT_SKINS.filter(skin => skin.collection === collection);
};

// Search skins
export const searchSkins = (query: string): ValorantSkinData[] => {
  const lowerQuery = query.toLowerCase();
  return VALORANT_SKINS.filter(skin => 
    skin.name.toLowerCase().includes(lowerQuery) ||
    skin.collection.toLowerCase().includes(lowerQuery) ||
    skin.weapon.toLowerCase().includes(lowerQuery)
  );
};

// Get skin by ID
export const getSkinById = (id: string): ValorantSkinData | undefined => {
  return VALORANT_SKINS.find(skin => skin.id === id);
};

// Get bundle by ID
export const getBundleById = (id: string): ValorantBundleData | undefined => {
  return VALORANT_BUNDLES.find(bundle => bundle.id === id);
};

// Convert VP to MYR
export const vpToMYR = (vp: number): number => {
  return vp * VP_TO_MYR;
};

// Convert MYR to VP
export const myrToVP = (myr: number): number => {
  return myr / VP_TO_MYR;
};
