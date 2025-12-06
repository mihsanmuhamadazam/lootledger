import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Crosshair, DollarSign, Package, Sparkles } from 'lucide-react';
import { ValorantSkinCard } from './ValorantSkinCard';
import { ValorantSkinForm } from './ValorantSkinForm';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useValorant } from '../../hooks/useValorant';
import { useToast } from '../ui/Toast';
import { formatRM, formatVP } from '../../lib/utils';

export function ValorantPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { skins, isLoading, addSkin, isAdding, stats } = useValorant();
  const { showToast } = useToast();

  const handleAddSkin = async (data: Parameters<typeof addSkin>[0]) => {
    try {
      await addSkin(data);
      showToast('Skin added to collection!', 'success');
      setIsAddModalOpen(false);
    } catch {
      showToast('Failed to add skin', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 glass-card animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 glass-card animate-pulse" />
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff4655] to-[#ff6b9d] flex items-center justify-center shadow-lg glow-pink">
            <Crosshair className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-orbitron gradient-text-valorant">
              Valorant Collection
            </h1>
            <p className="text-white/50">Track your skins and account value</p>
          </div>
        </div>
        <Button variant="valorant" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Skin
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
          style={{ '--accent-color': '#ff4655' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-[#ff4655]" />
            <span className="text-white/50 text-sm">Total Skins</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-white">{stats.totalSkins}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
          style={{ '--accent-color': '#00d4ff' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-[#00d4ff]" />
            <span className="text-white/50 text-sm">Total VP</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-[#00d4ff]">{formatVP(stats.totalVP)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
          style={{ '--accent-color': '#ff6b9d' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[#ff6b9d]" />
            <span className="text-white/50 text-sm">Money Spent</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-white">{formatRM(stats.totalSpentRM)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
          style={{ '--accent-color': '#c471f5' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-[#c471f5]" />
            <span className="text-white/50 text-sm">Account Value</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-[#c471f5]">~{formatRM(stats.estimatedValueRM)}</p>
        </motion.div>
      </div>

      {/* Skins Grid */}
      {skins.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff4655]/20 to-[#ff6b9d]/20 flex items-center justify-center mx-auto mb-6">
            <Crosshair className="w-10 h-10 text-[#ff4655]" />
          </div>
          <h2 className="text-xl font-bold font-orbitron text-white mb-2">
            No skins yet
          </h2>
          <p className="text-white/50 mb-6 max-w-sm mx-auto">
            Start tracking your Valorant skin collection and see your account value grow!
          </p>
          <Button variant="valorant" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Skin
          </Button>
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
              <ValorantSkinCard skin={skin} />
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Valorant Skin" size="lg">
        <ValorantSkinForm
          onSubmit={handleAddSkin}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={isAdding}
        />
      </Modal>
    </div>
  );
}