import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Target, DollarSign, Package, TrendingUp, TrendingDown, Search, Zap } from 'lucide-react';
import { CSGOSkinCard } from './CSGOSkinCard';
import { CSGOSkinForm } from './CSGOSkinForm';
import { CSGOSkinBrowser } from './CSGOSkinBrowser';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useCSGO } from '../../hooks/useCSGO';
import { useToast } from '../ui/Toast';
import { formatRM } from '../../lib/utils';

export function CSGOPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const { skins, isLoading, addSkin, isAdding, stats } = useCSGO();
  const { showToast } = useToast();

  const handleAddSkin = async (data: Parameters<typeof addSkin>[0]) => {
    try {
      await addSkin(data);
      showToast('Skin added to inventory!', 'success');
      setIsAddModalOpen(false);
    } catch {
      showToast('Failed to add skin', 'error');
    }
  };

  const isProfit = stats.profitLossRM >= 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 glass-card animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 glass-card animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#de9b35] to-[#f5a623] flex items-center justify-center shadow-lg">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-orbitron gradient-text-csgo">
              CS:GO / CS2 Inventory
            </h1>
            <p className="text-white/50">Track skins, market value & profit/loss</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={() => setIsBrowseOpen(true)}
            className="text-[#de9b35] hover:text-[#ffd700] hover:bg-[#de9b35]/10"
          >
            <Search className="w-4 h-4 mr-2" />
            Browse Skins
          </Button>
          <Button variant="csgo" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Skin
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
          style={{ '--accent-color': '#de9b35' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-[#de9b35]" />
            <span className="text-white/50 text-sm">Total Skins</span>
          </div>
          <p className="text-2xl font-bold font-orbitron text-white">{stats.totalSkins}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
          style={{ '--accent-color': '#4b69ff' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[#4b69ff]" />
            <span className="text-white/50 text-sm">Total Paid</span>
          </div>
          <p className="text-2xl font-bold font-orbitron text-white">{formatRM(stats.totalPaidRM)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
          style={{ '--accent-color': '#ffd700' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#ffd700]" />
            <span className="text-white/50 text-sm">Market Value</span>
          </div>
          <p className="text-2xl font-bold font-orbitron text-[#ffd700]">{formatRM(stats.currentValueRM)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
          style={{ '--accent-color': isProfit ? '#22c55e' : '#ef4444' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            {isProfit ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <span className="text-white/50 text-sm">Profit/Loss</span>
          </div>
          <p className={`text-2xl font-bold font-orbitron ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
            {isProfit ? '+' : ''}{formatRM(stats.profitLossRM)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="stat-card"
          style={{ '--accent-color': '#eb4b4b' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-[#eb4b4b]" />
            <span className="text-white/50 text-sm">StatTrak™</span>
          </div>
          <p className="text-2xl font-bold font-orbitron text-white">{stats.statTrakCount}</p>
        </motion.div>
      </div>

      {/* Skins Grid */}
      {skins.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#de9b35]/20 to-[#f5a623]/20 flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-[#de9b35]" />
          </div>
          <h2 className="text-xl font-bold font-orbitron text-white mb-2">
            Empty Inventory
          </h2>
          <p className="text-white/50 mb-6 max-w-sm mx-auto">
            Start tracking your CS:GO skins, knives, and gloves. Monitor market values and your profit/loss!
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" onClick={() => setIsBrowseOpen(true)}>
              <Search className="w-4 h-4 mr-2" />
              Browse Skins
            </Button>
            <Button variant="csgo" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skin
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skins.map((skin, index) => (
            <motion.div
              key={skin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CSGOSkinCard skin={skin} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Skin Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add CS:GO Skin" size="lg">
        <CSGOSkinForm
          onSubmit={handleAddSkin}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={isAdding}
        />
      </Modal>

      {/* Browse Skins Modal */}
      <Modal isOpen={isBrowseOpen} onClose={() => setIsBrowseOpen(false)} title="Browse Skin Prices" size="lg">
        <CSGOSkinBrowser onClose={() => setIsBrowseOpen(false)} />
      </Modal>
    </div>
  );
}