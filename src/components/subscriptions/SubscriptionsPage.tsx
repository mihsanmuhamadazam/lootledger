import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CreditCard, DollarSign, Calendar, Bell, Power } from 'lucide-react';
import { SubscriptionCard } from './SubscriptionCard';
import { SubscriptionForm } from './SubscriptionForm';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useToast } from '../ui/Toast';
import { formatRM, daysUntil } from '../../lib/utils';

export function SubscriptionsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { subscriptions, isLoading, addSubscription, isAdding, stats } = useSubscriptions();
  const { showToast } = useToast();

  const handleAddSubscription = async (data: Parameters<typeof addSubscription>[0]) => {
    try {
      await addSubscription(data);
      showToast('Subscription added!', 'success');
      setIsAddModalOpen(false);
    } catch {
      showToast('Failed to add subscription', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 glass-card animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c471f5] to-[#8b5cf6] flex items-center justify-center shadow-lg glow-purple">
            <CreditCard className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-orbitron gradient-text">
              Gaming Subscriptions
            </h1>
            <p className="text-white/50">Track your recurring gaming costs</p>
          </div>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
          style={{ '--accent-color': '#c471f5' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Power className="w-5 h-5 text-green-500" />
            <span className="text-white/50 text-sm">Active</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-white">{stats.activeSubscriptions}</p>
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
            <span className="text-white/50 text-sm">Monthly Cost</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-[#ff6b9d]">{formatRM(stats.monthlyTotalRM)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
          style={{ '--accent-color': '#00d4ff' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-[#00d4ff]" />
            <span className="text-white/50 text-sm">Yearly Cost</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-[#00d4ff]">{formatRM(stats.yearlyTotalRM)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
          style={{ '--accent-color': '#ffd700' } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-5 h-5 text-yellow-500" />
            <span className="text-white/50 text-sm">Renewals Soon</span>
          </div>
          <p className="text-3xl font-bold font-orbitron text-yellow-500">{stats.upcomingRenewals.length}</p>
        </motion.div>
      </div>

      {/* Upcoming Renewals Alert */}
      {stats.upcomingRenewals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 border-yellow-500/30"
        >
          <div className="flex items-center gap-3 mb-3">
            <Bell className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-white">Upcoming Renewals</span>
          </div>
          <div className="space-y-2">
            {stats.upcomingRenewals.map(sub => (
              <div key={sub.id} className="flex items-center justify-between text-sm">
                <span className="text-white/70">{sub.service}</span>
                <span className="text-yellow-500">Renews in {daysUntil(sub.renewalDate)} days</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Subscriptions Grid */}
      {subscriptions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#c471f5]/20 to-[#8b5cf6]/20 flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-[#c471f5]" />
          </div>
          <h2 className="text-xl font-bold font-orbitron text-white mb-2">
            No subscriptions yet
          </h2>
          <p className="text-white/50 mb-6 max-w-sm mx-auto">
            Track your gaming subscriptions like Game Pass, PS Plus, EA Play, and more!
          </p>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Subscription
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subscriptions.map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <SubscriptionCard subscription={sub} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Subscription" size="lg">
        <SubscriptionForm
          onSubmit={handleAddSubscription}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={isAdding}
        />
      </Modal>
    </div>
  );
}