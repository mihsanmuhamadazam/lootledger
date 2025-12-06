import { useState, FormEvent, useEffect, useMemo } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Search, Sparkles } from 'lucide-react';
import { VALORANT_SKINS, VALORANT_BUNDLES, getCollections, getSkinsByCollection, vpToMYR } from '../../data/valorantSkins';
import type { ValorantSkin, ValorantTier } from '../../types';
import { formatRM, formatVP } from '../../lib/utils';

interface ValorantSkinFormProps {
  skin?: ValorantSkin;
  onSubmit: (data: {
    skinId: string;
    name: string;
    weapon: string;
    collection: string;
    tier: ValorantTier;
    variant?: string;
    vpCost: number;
    pricePaidRM: number;
    acquiredDate: string;
  }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ValorantSkinForm({ skin, onSubmit, onCancel, isLoading }: ValorantSkinFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedSkinId, setSelectedSkinId] = useState('');
  const [variant, setVariant] = useState('');
  const [pricePaidRM, setPricePaidRM] = useState('');
  const [acquiredDate, setAcquiredDate] = useState(new Date().toISOString().split('T')[0]);

  const collections = useMemo(() => getCollections(), []);

  // Filter skins based on search or collection
  const filteredSkins = useMemo(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return VALORANT_SKINS.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.collection.toLowerCase().includes(query) ||
        s.weapon.toLowerCase().includes(query)
      );
    }
    if (selectedCollection) {
      return getSkinsByCollection(selectedCollection);
    }
    return [];
  }, [searchQuery, selectedCollection]);

  // Selected skin data
  const selectedSkin = useMemo(() => {
    return VALORANT_SKINS.find(s => s.id === selectedSkinId);
  }, [selectedSkinId]);

  useEffect(() => {
    if (skin) {
      setSelectedSkinId(skin.skinId);
      setVariant(skin.variant || '');
      setPricePaidRM(skin.pricePaidRM.toString());
      setAcquiredDate(skin.acquiredDate.split('T')[0]);
      
      const existingSkin = VALORANT_SKINS.find(s => s.id === skin.skinId);
      if (existingSkin) {
        setSelectedCollection(existingSkin.collection);
      }
    }
  }, [skin]);

  // Auto-fill price when skin is selected
  useEffect(() => {
    if (selectedSkin && !skin) {
      const estimatedRM = vpToMYR(selectedSkin.vpCost);
      setPricePaidRM(estimatedRM.toFixed(2));
    }
  }, [selectedSkin, skin]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedSkin) return;

    await onSubmit({
      skinId: selectedSkin.id,
      name: selectedSkin.name,
      weapon: selectedSkin.weapon,
      collection: selectedSkin.collection,
      tier: selectedSkin.tier,
      variant: variant || undefined,
      vpCost: selectedSkin.vpCost,
      pricePaidRM: parseFloat(pricePaidRM),
      acquiredDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Search or Browse */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search skins (e.g., Reaver Vandal, Prime, Elderflame...)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCollection('');
            }}
            className="input-clean pl-12"
          />
        </div>

        <div className="text-center text-white/40 text-sm">or browse by collection</div>

        <select
          value={selectedCollection}
          onChange={(e) => {
            setSelectedCollection(e.target.value);
            setSearchQuery('');
            setSelectedSkinId('');
          }}
          className="input-clean"
        >
          <option value="">Select a collection...</option>
          {collections.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Skin Selection */}
      {filteredSkins.length > 0 && (
        <div className="max-h-60 overflow-y-auto space-y-2 p-1">
          {filteredSkins.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedSkinId(s.id)}
              className={`w-full p-3 rounded-xl text-left transition-all ${
                selectedSkinId === s.id
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/03 border border-transparent hover:bg-white/05'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{s.name}</p>
                  <p className="text-sm text-white/50">{s.collection} • {s.weapon}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#c471f5]">{formatVP(s.vpCost)}</p>
                  <p className="text-xs text-white/50">~{formatRM(vpToMYR(s.vpCost))}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Skin Details */}
      {selectedSkin && (
        <div className="glass-card p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#fad663]" />
            <div>
              <p className="font-bold text-white">{selectedSkin.name}</p>
              <p className="text-sm text-white/50">{selectedSkin.collection}</p>
            </div>
            <span className={`ml-auto badge badge-tier-${selectedSkin.tier}`}>
              {selectedSkin.tier.charAt(0).toUpperCase() + selectedSkin.tier.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/05 rounded-lg p-3">
              <p className="text-white/50">VP Cost</p>
              <p className="text-lg font-bold text-[#c471f5]">{formatVP(selectedSkin.vpCost)}</p>
            </div>
            <div className="bg-white/05 rounded-lg p-3">
              <p className="text-white/50">Est. RM Value</p>
              <p className="text-lg font-bold text-white">{formatRM(vpToMYR(selectedSkin.vpCost))}</p>
            </div>
          </div>

          {/* Variants */}
          {selectedSkin.variants && selectedSkin.variants.length > 0 && (
            <div>
              <label className="block text-sm text-white/50 mb-2">Variant (Optional)</label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                className="input-clean"
              >
                <option value="">Default</option>
                {selectedSkin.variants.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Price and Date */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price Paid (RM)"
          type="number"
          placeholder="79.90"
          value={pricePaidRM}
          onChange={(e) => setPricePaidRM(e.target.value)}
          min="0"
          step="0.01"
          required
        />
        <Input
          label="Acquired Date"
          type="date"
          value={acquiredDate}
          onChange={(e) => setAcquiredDate(e.target.value)}
          required
        />
      </div>

      {/* Bundle Info */}
      {selectedSkin && (
        <div className="text-xs text-white/40 text-center">
          💡 Tip: Buying the full bundle usually saves 20-30% compared to individual skins!
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="valorant" isLoading={isLoading} disabled={!selectedSkin} className="flex-1">
          {skin ? 'Update Skin' : 'Add to Collection'}
        </Button>
      </div>
    </form>
  );
}