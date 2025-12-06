import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSubscriptionsByUserId, createSubscription, updateSubscription, deleteSubscription, generateId } from '../lib/db';
import { useAuth } from '../context/AuthContext';
import type { GamingSubscription, SubscriptionService } from '../types';
import { useMemo } from 'react';

export function useSubscriptions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const subscriptionsQuery = useQuery({
    queryKey: ['subscriptions', user?.id],
    queryFn: () => getSubscriptionsByUserId(user!.id),
    enabled: !!user,
  });

  const addSubscriptionMutation = useMutation({
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
      const sub: GamingSubscription = {
        id: generateId(),
        userId: user.id,
        ...data,
        createdAt: new Date().toISOString(),
      };
      return createSubscription(sub);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', user?.id] });
    },
  });

  const updateSubscriptionMutation = useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', user?.id] });
    },
  });

  const deleteSubscriptionMutation = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', user?.id] });
    },
  });

  // Calculate stats
  const stats = useMemo(() => {
    const subs = subscriptionsQuery.data || [];
    const activeSubs = subs.filter(s => s.active);
    
    // Calculate monthly cost (normalize all to monthly)
    const monthlyTotalRM = activeSubs.reduce((sum, s) => {
      switch (s.billingCycle) {
        case 'yearly':
          return sum + (s.monthlyCostRM / 12);
        case 'quarterly':
          return sum + (s.monthlyCostRM / 3);
        default:
          return sum + s.monthlyCostRM;
      }
    }, 0);

    // Calculate yearly cost
    const yearlyTotalRM = monthlyTotalRM * 12;

    // Get upcoming renewals (next 30 days)
    const today = new Date();
    const thirtyDaysLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const upcomingRenewals = activeSubs.filter(s => {
      const renewalDate = new Date(s.renewalDate);
      return renewalDate >= today && renewalDate <= thirtyDaysLater;
    });

    return {
      totalSubscriptions: subs.length,
      activeSubscriptions: activeSubs.length,
      monthlyTotalRM,
      yearlyTotalRM,
      upcomingRenewals,
    };
  }, [subscriptionsQuery.data]);

  return {
    subscriptions: subscriptionsQuery.data || [],
    isLoading: subscriptionsQuery.isLoading,
    error: subscriptionsQuery.error,
    addSubscription: addSubscriptionMutation.mutateAsync,
    updateSubscription: updateSubscriptionMutation.mutateAsync,
    deleteSubscription: deleteSubscriptionMutation.mutateAsync,
    isAdding: addSubscriptionMutation.isPending,
    isUpdating: updateSubscriptionMutation.isPending,
    isDeleting: deleteSubscriptionMutation.isPending,
    stats,
  };
}
