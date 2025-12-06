import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calculator, DollarSign, Clock, ThumbsUp } from 'lucide-react';
import { GameWorthCard } from './GameWorthCard';
import { GameWorthForm } from './GameWorthForm';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useGameWorth } from '../../hooks/useGameWorth';
import { useToast } from '../ui/Toast';
import { formatRM } from '../../lib/utils';

export function GameWorthPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { entries, isLoading, addEntry, isAdding, stats } = useGameWorth();
  const { showToast } = useToast();

  const handleAddEntry = async (data: Parameters<typeof addEntry>[0]) => {
    try {
      await addEntry(data);
      showToast('Game added to tracker!', 'success');
      setIsAddModalOpen(false);
    } catch {
      showToast('Failed to add game', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 glass-card animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 glass-card animate-pulse" />
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-lg">
            <Calculator className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-orbitron">
              <span className="text-white">Was it </span>
              <span className="gradient-text">Worth It?</span>
            </h1>
            <p className="text-white/50">Track game value: RM per hour of gameplay</p>
          </div>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Game
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
          style={{ '--accent-color': '#22c55e' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-5 h-5 text-[#22c55e]" />
            <span className="text-white/50 text-sm">Games Tracked</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-white">{stats.totalGames}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
          style={{ '--accent-color': '#ff6b9d' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[#ff6b9d]" />
            <span className="text-white/50 text-sm">Total Spent</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-[#ff6b9d]">{formatRM(stats.totalSpentRM)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
          style={{ '--accent-color': '#00d4ff' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-[#00d4ff]" />
            <span className="text-white/50 text-sm">Avg RM/Hour</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-[#00d4ff]">{formatRM(stats.avgRmPerHour)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
          style={{ '--accent-color': '#10b981' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <ThumbsUp className="w-5 h-5 text-green-500" />
            <span className="text-white/50 text-sm">Worth It Rate</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-green-500">
            {stats.totalGames > 0
              ? `${Math.round((stats.worthItCount / stats.totalGames) * 100)}%`
              : '0%'}
          </p>
        </motion.div>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">💡</span>
          <span className="font-bold text-white">How it works</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center text-xs font-bold">🎯</span>
            <span className="text-white/60">RM 0-2/hr = Excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center text-xs font-bold">👍</span>
            <span className="text-white/60">RM 2-5/hr = Good</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#eab308]/20 text-[#eab308] flex items-center justify-center text-xs font-bold">😐</span>
            <span className="text-white/60">RM 5-10/hr = Okay</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#f97316]/20 text-[#f97316] flex items-center justify-center text-xs font-bold">👎</span>
            <span className="text-white/60">RM 10-20/hr = Poor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#ef4444]/20 text-[#ef4444] flex items-center justify-center text-xs font-bold">💸</span>
            <span className="text-white/60">RM 20+/hr = Terrible</span>
          </div>
        </div>
      </motion.div>

      {/* Games Grid */}
      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#22c55e]/20 to-[#10b981]/20 flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-10 h-10 text-[#22c55e]" />
          </div>
          <h2 className="text-xl font-bold font-orbitron text-white mb-2">
            No games tracked yet
          </h2>
          <p className="text-white/50 mb-6 max-w-sm mx-auto">
            Add games you've played to see if they were worth the money!
          </p>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Track Your First Game
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GameWorthCard entry={entry} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Track Game Value" size="md">
        <GameWorthForm
          onSubmit={handleAddEntry}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={isAdding}
        />
      </Modal>
    </div>
  );
}