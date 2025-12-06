import { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { CSGO_SKINS, CSGO_WEAPONS, WEAR_NAMES, getStatTrakPrice } from '../../data/csgoSkins';
import { formatRM } from '../../lib/utils';
import type { CSGOWear } from '../../types';

interface CSGOSkinBrowserProps {
  onClose: () => void;
}

export function CSGOSkinBrowser({ onClose }: CSGOSkinBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedWear, setSelectedWear] = useState<CSGOWear>('ft');

  const filteredSkins = useMemo(() => {
    let skins = CSGO_SKINS;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      skins = skins.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.weapon.toLowerCase().includes(query)
      );
    }
    
    if (selectedWeapon) {
      skins = skins.filter(s => s.weapon === selectedWeapon);
    }
    
    return skins.slice(0, 50);
  }, [searchQuery, selectedWeapon]);

  const popularSkins = useMemo(() => {
    return CSGO_SKINS
      .filter(s => s.pricesRM.ft && s.pricesRM.ft > 500)
      .sort((a, b) => (b.pricesRM.ft || 0) - (a.pricesRM.ft || 0))
      .slice(0, 10);
  }, []);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Search skins..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-clean pl-12"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={selectedWeapon}
          onChange={(e) => setSelectedWeapon(e.target.value)}
          className="input-clean flex-1"
        >
          <option value="">All Weapons</option>
          {CSGO_WEAPONS.map(w => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
        <select
          value={selectedWear}
          onChange={(e) => setSelectedWear(e.target.value as CSGOWear)}
          className="input-clean flex-1"
        >
          {(Object.entries(WEAR_NAMES) as [CSGOWear, string][]).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Popular Skins */}
      {!searchQuery && !selectedWeapon && (
        <div>
          <h3 className="text-lg font-bold font-orbitron text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#ffd700]" />
            High Value Skins
          </h3>
          <div className="space-y-2">
            {popularSkins.map(s => {
              const price = s.pricesRM[selectedWear] || s.pricesRM.ft;
              return (
                <div
                  key={`${s.weapon}-${s.name}`}
                  className="p-4 rounded-xl bg-white/03 border border-white/05 hover:bg-white/05 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{s.weapon} | {s.name}</p>
                      <p className="text-sm text-white/50">{s.collection}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#ffd700]">
                        {price ? formatRM(price) : 'N/A'}
                      </p>
                      <p className="text-xs text-white/50">{WEAR_NAMES[selectedWear]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Results */}
      {(searchQuery || selectedWeapon) && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredSkins.length === 0 ? (
            <p className="text-center text-white/50 py-8">No skins found</p>
          ) : (
            filteredSkins.map(s => {
              const price = s.pricesRM[selectedWear];
              const stattrakPrice = s.stattrakMultiplier ? getStatTrakPrice(s, selectedWear) : null;
              
              return (
                <div
                  key={`${s.weapon}-${s.name}`}
                  className="p-4 rounded-xl bg-white/03 border border-white/05 hover:bg-white/05 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white">{s.weapon} | {s.name}</p>
                        <span
                          className="px-2 py-0.5 rounded text-xs font-bold"
                          style={{ backgroundColor: `${s.rarity === 'Covert' ? '#eb4b4b' : '#4b69ff'}20`, color: s.rarity === 'Covert' ? '#eb4b4b' : '#4b69ff' }}
                        >
                          {s.rarity}
                        </span>
                      </div>
                      <p className="text-sm text-white/50">{s.collection}</p>
                    </div>
                    <div className="text-right">
                      {price ? (
                        <>
                          <p className="font-bold text-[#ffd700]">{formatRM(price)}</p>
                          {stattrakPrice && (
                            <p className="text-xs text-[#cf6a32]">
                              ST™ {formatRM(stattrakPrice)}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-white/40">N/A</p>
                      )}
                    </div>
                  </div>
                  
                  {/* All wear prices */}
                  <div className="mt-3 pt-3 border-t border-white/05 grid grid-cols-5 gap-2 text-xs">
                    {(Object.entries(WEAR_NAMES) as [CSGOWear, string][]).map(([w]) => (
                      <div key={w} className="text-center">
                        <p className="text-white/40">{w.toUpperCase()}</p>
                        <p className={`font-bold ${s.pricesRM[w] ? 'text-white' : 'text-white/20'}`}>
                          {s.pricesRM[w] ? formatRM(s.pricesRM[w]!) : '-'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}