import { useState, FormEvent, useEffect, useMemo } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Search, Zap } from 'lucide-react';
import { CSGO_SKINS, getSkinsByWeapon, CSGO_WEAPONS, WEAR_NAMES, getStatTrakPrice } from '../../data/csgoSkins';
import type { CSGOSkin, CSGOWear } from '../../types';
import { formatRM } from '../../lib/utils';

interface CSGOSkinFormProps {
  skin?: CSGOSkin;
  onSubmit: (data: {
    name: string;
    weapon: string;
    skinName: string;
    wear: CSGOWear;
    statTrak: boolean;
    floatValue?: number;
    pricePaidRM: number;
    currentMarketPriceRM: number;
    acquiredDate: string;
  }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CSGOSkinForm({ skin, onSubmit, onCancel, isLoading }: CSGOSkinFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedSkinName, setSelectedSkinName] = useState('');
  const [wear, setWear] = useState<CSGOWear>('ft');
  const [statTrak, setStatTrak] = useState(false);
  const [floatValue, setFloatValue] = useState('');
  const [pricePaidRM, setPricePaidRM] = useState('');
  const [currentMarketPriceRM, setCurrentMarketPriceRM] = useState('');
  const [acquiredDate, setAcquiredDate] = useState(new Date().toISOString().split('T')[0]);

  // Filter skins based on search or weapon
  const filteredSkins = useMemo(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return CSGO_SKINS.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.weapon.toLowerCase().includes(query)
      ).slice(0, 20);
    }
    if (selectedWeapon) {
      return getSkinsByWeapon(selectedWeapon as any);
    }
    return [];
  }, [searchQuery, selectedWeapon]);

  // Selected skin data
  const selectedSkin = useMemo(() => {
    if (!selectedWeapon || !selectedSkinName) return null;
    return CSGO_SKINS.find(s => s.weapon === selectedWeapon && s.name === selectedSkinName);
  }, [selectedWeapon, selectedSkinName]);

  useEffect(() => {
    if (skin) {
      setSelectedWeapon(skin.weapon);
      setSelectedSkinName(skin.skinName);
      setWear(skin.wear);
      setStatTrak(skin.statTrak);
      setFloatValue(skin.floatValue?.toString() || '');
      setPricePaidRM(skin.pricePaidRM.toString());
      setCurrentMarketPriceRM(skin.currentMarketPriceRM.toString());
      setAcquiredDate(skin.acquiredDate.split('T')[0]);
    }
  }, [skin]);

  // Auto-fill market price when skin/wear selected
  useEffect(() => {
    if (selectedSkin && !skin) {
      let price = selectedSkin.pricesRM[wear];
      if (statTrak && selectedSkin.stattrakMultiplier && price) {
        price = getStatTrakPrice(selectedSkin, wear) || price;
      }
      if (price) {
        setCurrentMarketPriceRM(price.toString());
        if (!pricePaidRM) {
          setPricePaidRM(price.toString());
        }
      }
    }
  }, [selectedSkin, wear, statTrak, skin, pricePaidRM]);

  const handleSelectSkin = (weapon: string, skinName: string) => {
    setSelectedWeapon(weapon);
    setSelectedSkinName(skinName);
    setSearchQuery('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedWeapon || !selectedSkinName) return;

    await onSubmit({
      name: `${selectedWeapon} | ${selectedSkinName}`,
      weapon: selectedWeapon,
      skinName: selectedSkinName,
      wear,
      statTrak,
      floatValue: floatValue ? parseFloat(floatValue) : undefined,
      pricePaidRM: parseFloat(pricePaidRM),
      currentMarketPriceRM: parseFloat(currentMarketPriceRM),
      acquiredDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Search skins (e.g., AK-47 Asiimov, AWP Dragon Lore...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-clean pl-12"
        />
      </div>

      <div className="text-center text-white/40 text-sm">or browse by weapon</div>

      {/* Weapon selector */}
      <select
        value={selectedWeapon}
        onChange={(e) => {
          setSelectedWeapon(e.target.value);
          setSelectedSkinName('');
          setSearchQuery('');
        }}
        className="input-clean"
      >
        <option value="">Select a weapon...</option>
        {CSGO_WEAPONS.map(w => (
          <option key={w} value={w}>{w}</option>
        ))}
      </select>

      {/* Skin list from search/weapon */}
      {filteredSkins.length > 0 && !selectedSkinName && (
        <div className="max-h-48 overflow-y-auto space-y-2 p-1">
          {filteredSkins.map(s => (
            <button
              key={`${s.weapon}-${s.name}`}
              type="button"
              onClick={() => handleSelectSkin(s.weapon, s.name)}
              className="w-full p-3 rounded-xl text-left transition-all bg-white/03 border border-transparent hover:bg-white/05 hover:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{s.weapon} | {s.name}</p>
                  <p className="text-sm text-white/50">{s.collection}</p>
                </div>
                <span className="text-sm text-[#ffd700]">
                  {s.pricesRM.ft ? formatRM(s.pricesRM.ft) : 'N/A'}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Skin Details */}
      {selectedSkin && (
        <div className="glass-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-white">{selectedSkin.weapon} | {selectedSkin.name}</p>
              <p className="text-sm text-white/50">{selectedSkin.collection}</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: `${selectedSkin.rarity === 'Covert' ? '#eb4b4b' : '#4b69ff'}20`, color: selectedSkin.rarity === 'Covert' ? '#eb4b4b' : '#4b69ff' }}
            >
              {selectedSkin.rarity}
            </span>
          </div>

          {/* Wear selector */}
          <div>
            <label className="block text-sm text-white/50 mb-2">Wear Condition</label>
            <div className="grid grid-cols-5 gap-2">
              {(Object.keys(WEAR_NAMES) as CSGOWear[]).map(w => {
                const price = selectedSkin.pricesRM[w];
                const hasPrice = price !== undefined;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => hasPrice && setWear(w)}
                    disabled={!hasPrice}
                    className={`p-2 rounded-xl text-center transition-all ${
                      wear === w
                        ? 'bg-white/10 border border-white/20'
                        : hasPrice
                          ? 'bg-white/03 border border-transparent hover:bg-white/05'
                          : 'bg-white/02 border border-transparent opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <p className="font-bold text-sm text-white">{w.toUpperCase()}</p>
                    <p className="text-xs text-white/50">
                      {hasPrice ? formatRM(price) : 'N/A'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* StatTrak toggle */}
          {selectedSkin.stattrakMultiplier && (
            <button
              type="button"
              onClick={() => setStatTrak(!statTrak)}
              className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                statTrak
                  ? 'bg-[#cf6a32]/20 border border-[#cf6a32]/30'
                  : 'bg-white/03 border border-transparent hover:bg-white/05'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className={`w-5 h-5 ${statTrak ? 'text-[#cf6a32]' : 'text-white/40'}`} />
                <span className={statTrak ? 'text-[#cf6a32] font-bold' : 'text-white/60'}>
                  StatTrak™
                </span>
              </div>
              <span className="text-sm text-white/50">
                +{((selectedSkin.stattrakMultiplier - 1) * 100).toFixed(0)}% price
              </span>
            </button>
          )}
        </div>
      )}

      {/* Price inputs */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Float Value (Optional)"
          type="number"
          placeholder="0.123456"
          value={floatValue}
          onChange={(e) => setFloatValue(e.target.value)}
          min="0"
          max="1"
          step="0.000001"
        />
        <Input
          label="Acquired Date"
          type="date"
          value={acquiredDate}
          onChange={(e) => setAcquiredDate(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price Paid (RM)"
          type="number"
          placeholder="450.00"
          value={pricePaidRM}
          onChange={(e) => setPricePaidRM(e.target.value)}
          min="0"
          step="0.01"
          required
        />
        <Input
          label="Current Market Price (RM)"
          type="number"
          placeholder="550.00"
          value={currentMarketPriceRM}
          onChange={(e) => setCurrentMarketPriceRM(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="csgo" isLoading={isLoading} disabled={!selectedWeapon || !selectedSkinName} className="flex-1">
          {skin ? 'Update Skin' : 'Add to Inventory'}
        </Button>
      </div>
    </form>
  );
}