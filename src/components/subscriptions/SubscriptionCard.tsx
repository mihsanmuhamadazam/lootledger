import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Calendar, RefreshCw, Power, PowerOff } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { SubscriptionForm } from './SubscriptionForm';
import { formatRM, formatDate, daysUntil, getSubscriptionServiceInfo } from '../../lib/utils';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useToast } from '../ui/Toast';
import type { GamingSubscription, SubscriptionService } from '../../types';

interface SubscriptionCardProps {
  subscription: GamingSubscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { updateSubscription, deleteSubscription, isUpdating, isDeleting } = useSubscriptions();
  const { showToast } = useToast();

  const serviceInfo = getSubscriptionServiceInfo(subscription.service);
  const daysToRenewal = daysUntil(subscription.renewalDate);
  const isRenewingSoon = daysToRenewal <= 7 && daysToRenewal >= 0;

  const handleUpdate = async (data: {
    service: SubscriptionService;
    tier: string;
    monthlyCostRM: number;
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
    startDate: string;
    renewalDate: string;
    autoRenew: boolean;
    active: boolean;
  }) => {
    try {
      await updateSubscription({ ...subscription, ...data });
      showToast('Subscription updated', 'success');
      setIsEditModalOpen(false);
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  const handleToggleActive = async () => {
    try {
      await updateSubscription({ ...subscription, active: !subscription.active });
      showToast(subscription.active ? 'Subscription paused' : 'Subscription activated', 'success');
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSubscription(subscription.id);
      showToast('Subscription deleted', 'success');
      setIsDeleteModalOpen(false);
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-card p-5 group relative overflow-hidden ${
          !subscription.active ? 'opacity-60' : ''
        }`}
      >
        {/* Service color indicator */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{ background: `linear-gradient(90deg, ${serviceInfo.color}, transparent)` }}
        />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${serviceInfo.color}20` }}
            >
              {serviceInfo.icon}
            </div>
            <div>
              <h3 className="font-bold text-white">{serviceInfo.label}</h3>
              <p className="text-sm text-white/50">{subscription.tier}</p>
            </div>
          </div>
          <button
            onClick={handleToggleActive}
            className={`p-2 rounded-full transition-all ${
              subscription.active
                ? 'text-green-500 hover:bg-green-500/10'
                : 'text-white/40 hover:bg-white/05'
            }`}
            title={subscription.active ? 'Pause subscription' : 'Activate subscription'}
          >
            {subscription.active ? <Power className="w-5 h-5" /> : <PowerOff className="w-5 h-5" />}
          </button>
        </div>

        {/* Cost info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/05 rounded-xl p-3">
            <p className="text-xs text-white/40 mb-1">Monthly</p>
            <p className="font-bold text-[#ff6b9d]">{formatRM(subscription.monthlyCostRM)}</p>
          </div>
          <div className="bg-white/05 rounded-xl p-3">
            <p className="text-xs text-white/40 mb-1">Billing</p>
            <p className="font-bold text-white capitalize">{subscription.billingCycle}</p>
          </div>
        </div>

        {/* Renewal info */}
        <div className={`flex items-center justify-between p-3 rounded-xl ${
          isRenewingSoon ? 'bg-yellow-500/10' : 'bg-white/05'
        }`}>
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${isRenewingSoon ? 'text-yellow-500' : 'text-white/40'}`} />
            <span className="text-sm text-white/60">Next renewal</span>
          </div>
          <div className="text-right">
            <p className={`font-bold ${isRenewingSoon ? 'text-yellow-500' : 'text-white'}`}>
              {formatDate(subscription.renewalDate)}
            </p>
            {isRenewingSoon && (
              <p className="text-xs text-yellow-500">
                {daysToRenewal === 0 ? 'Today!' : `In ${daysToRenewal} days`}
              </p>
            )}
          </div>
        </div>

        {/* Auto-renew indicator */}
        {subscription.autoRenew && (
          <div className="flex items-center gap-2 mt-3 text-sm text-white/40">
            <RefreshCw className="w-4 h-4" />
            <span>Auto-renew enabled</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="flex-1"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex-1 text-red-500 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Subscription">
        <SubscriptionForm
          subscription={subscription}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isUpdating}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Subscription"
        size="sm"
      >
        <p className="text-white/60 mb-6">
          Are you sure you want to delete <strong className="text-white">{serviceInfo.label}</strong>?
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting} className="flex-1">
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}