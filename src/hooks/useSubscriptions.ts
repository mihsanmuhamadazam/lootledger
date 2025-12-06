import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import {
  getSubscriptionsByUserId,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  generateId,
} from '../lib/db';
import type { GamingSubscription, SubscriptionService } from '../types';

export function useSubscriptions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ['subscriptions', user?.id],
    queryFn: () => getSubscriptionsByUserId(user!.id),
    enabled: !!user?.id,
  });

  const addMutation = useMutation({
    mutationFn: async (data: {
      service: SubscriptionService;
      tier: string;
      monthlyCostRM: number;
      billingCycle: 'monthly' | 'quarterly' | 'yearly';
      startDate: string;
      renewalDate: string;
      autoRenew: boolean;
      active: boolean;
    }) => {
      if (!user) throw new Error('Not authenticated');
      
      const newSub: GamingSubscription = {
        id: generateId(),
        odId: user.id,
        service: data.service,
        tier: data.tier,
        monthlyCostRM: data.monthlyCostRM,
        billingCycle: data.billingCycle,
        startDate: data.startDate,
        renewalDate: data.renewalDate,
        autoRenew: data.autoRenew,
        active: data.active,
        createdAt: new Date().toISOString(),
      };
      
      return createSubscription(newSub);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', user?.id] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', user?.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', user?.id] });
    },
  });

  // Active subscriptions
  const activeSubscriptions = subscriptions.filter(s => s.active);

  // Calculate stats
  const stats = {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: activeSubscriptions.length,
    monthlyTotalRM: activeSubscriptions.reduce((sum, s) => sum + s.monthlyCostRM, 0),
    yearlyTotalRM: activeSubscriptions.reduce((sum, s) => sum + (s.monthlyCostRM * 12), 0),
    upcomingRenewals: subscriptions
      .filter(s => s.active && s.autoRenew)
      .filter(s => {
        const renewalDate = new Date(s.renewalDate);
        const today = new Date();
        const daysUntil = Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil <= 7 && daysUntil >= 0;
      }),
  };

  return {
    subscriptions,
    activeSubscriptions,
    isLoading,
    stats,
    addSubscription: addMutation.mutateAsync,
    updateSubscription: updateMutation.mutateAsync,
    deleteSubscription: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}