import { useState, FormEvent, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SUBSCRIPTION_SERVICES } from '../../types';
import type { GamingSubscription, SubscriptionService } from '../../types';
import { formatRM } from '../../lib/utils';

interface SubscriptionFormProps {
  subscription?: GamingSubscription;
  onSubmit: (data: {
    service: SubscriptionService;
    tier: string;
    monthlyCostRM: number;
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
    startDate: string;
    renewalDate: string;
    autoRenew: boolean;
    active: boolean;
  }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SubscriptionForm({ subscription, onSubmit, onCancel, isLoading }: SubscriptionFormProps) {
  const [service, setService] = useState<SubscriptionService>('xbox_gamepass_pc');
  const [tier, setTier] = useState('');
  const [monthlyCostRM, setMonthlyCostRM] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [renewalDate, setRenewalDate] = useState('');
  const [autoRenew, setAutoRenew] = useState(true);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (subscription) {
      setService(subscription.service);
      setTier(subscription.tier);
      setMonthlyCostRM(subscription.monthlyCostRM.toString());
      setBillingCycle(subscription.billingCycle);
      setStartDate(subscription.startDate.split('T')[0]);
      setRenewalDate(subscription.renewalDate.split('T')[0]);
      setAutoRenew(subscription.autoRenew);
      setActive(subscription.active);
    }
  }, [subscription]);

  // Auto-fill cost when service selected
  useEffect(() => {
    if (!subscription) {
      const serviceInfo = SUBSCRIPTION_SERVICES.find(s => s.value === service);
      if (serviceInfo && serviceInfo.monthlyRM > 0) {
        setMonthlyCostRM(serviceInfo.monthlyRM.toString());
        setTier(serviceInfo.label);
      }
    }
  }, [service, subscription]);

  // Auto-calculate renewal date
  useEffect(() => {
    if (startDate && !subscription) {
      const start = new Date(startDate);
      let renewalMs = start.getTime();
      
      switch (billingCycle) {
        case 'monthly':
          start.setMonth(start.getMonth() + 1);
          break;
        case 'quarterly':
          start.setMonth(start.getMonth() + 3);
          break;
        case 'yearly':
          start.setFullYear(start.getFullYear() + 1);
          break;
      }
      
      setRenewalDate(start.toISOString().split('T')[0]);
    }
  }, [startDate, billingCycle, subscription]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await onSubmit({
      service,
      tier,
      monthlyCostRM: parseFloat(monthlyCostRM),
      billingCycle,
      startDate,
      renewalDate,
      autoRenew,
      active,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Service selector */}
      <div>
        <label className="block text-sm text-white/50 mb-2">Service</label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {SUBSCRIPTION_SERVICES.map(s => (
            <button
              key={s.value}
              type="button"
              onClick={() => setService(s.value)}
              className={`p-3 rounded-xl text-left transition-all flex items-center gap-3 ${
                service === s.value
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/03 border border-transparent hover:bg-white/05'
              }`}
            >
              <span className="text-xl">{s.icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">{s.label}</p>
                <p className="text-xs text-white/50">{formatRM(s.monthlyRM)}/mo</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tier name */}
      <Input
        label="Plan/Tier Name"
        type="text"
        placeholder="e.g., Ultimate, Premium, Pro"
        value={tier}
        onChange={(e) => setTier(e.target.value)}
        required
      />

      {/* Cost and billing */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Monthly Cost (RM)"
          type="number"
          placeholder="44.90"
          value={monthlyCostRM}
          onChange={(e) => setMonthlyCostRM(e.target.value)}
          min="0"
          step="0.01"
          required
        />
        <div>
          <label className="block text-sm text-white/50 mb-2">Billing Cycle</label>
          <select
            value={billingCycle}
            onChange={(e) => setBillingCycle(e.target.value as typeof billingCycle)}
            className="input-clean"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <Input
          label="Next Renewal Date"
          type="date"
          value={renewalDate}
          onChange={(e) => setRenewalDate(e.target.value)}
          required
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setAutoRenew(!autoRenew)}
          className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
            autoRenew
              ? 'bg-[#c471f5]/20 border border-[#c471f5]/30 text-[#c471f5]'
              : 'bg-white/03 border border-transparent text-white/40 hover:bg-white/05'
          }`}
        >
          <span className={`w-4 h-4 rounded-full border-2 ${
            autoRenew ? 'bg-[#c471f5] border-[#c471f5]' : 'border-white/30'
          }`} />
          Auto-renew
        </button>
        <button
          type="button"
          onClick={() => setActive(!active)}
          className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
            active
              ? 'bg-green-500/20 border border-green-500/30 text-green-500'
              : 'bg-white/03 border border-transparent text-white/40 hover:bg-white/05'
          }`}
        >
          <span className={`w-4 h-4 rounded-full border-2 ${
            active ? 'bg-green-500 border-green-500' : 'border-white/30'
          }`} />
          Active
        </button>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading} className="flex-1">
          {subscription ? 'Update Subscription' : 'Add Subscription'}
        </Button>
      </div>
    </form>
  );
}