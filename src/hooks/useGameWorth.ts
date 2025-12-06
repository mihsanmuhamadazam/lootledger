import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import {
  getGameWorthEntriesByUserId,
  createGameWorthEntry,
  updateGameWorthEntry,
  deleteGameWorthEntry,
  generateId,
} from '../lib/db';
import { calculateGameWorth } from '../lib/utils';
import type { GameWorthEntry } from '../types';

export function useGameWorth() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['gameWorth', user?.id],
    queryFn: () => getGameWorthEntriesByUserId(user!.id),
    enabled: !!user?.id,
  });

  const addMutation = useMutation({
    mutationFn: async (data: {
      gameName: string;
      priceRM: number;
      hoursToComplete: number;
      notes?: string;
    }) => {
      if (!user) throw new Error('Not authenticated');
      
      const worth = calculateGameWorth(data.priceRM, data.hoursToComplete);
      
      const newEntry: GameWorthEntry = {
        id: generateId(),
        odId: user.id,
        gameName: data.gameName,
        priceRM: data.priceRM,
        hoursToComplete: data.hoursToComplete,
        rmPerHour: worth.rmPerHour,
        worthIt: worth.worthIt,
        rating: worth.rating as GameWorthEntry['rating'],
        notes: data.notes,
        createdAt: new Date().toISOString(),
      };
      
      return createGameWorthEntry(newEntry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameWorth', user?.id] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateGameWorthEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameWorth', user?.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGameWorthEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameWorth', user?.id] });
    },
  });

  // Calculate stats
  const stats = {
    totalGames: entries.length,
    totalSpentRM: entries.reduce((sum, e) => sum + e.priceRM, 0),
    totalHours: entries.reduce((sum, e) => sum + e.hoursToComplete, 0),
    avgRmPerHour: entries.length > 0
      ? entries.reduce((sum, e) => sum + e.rmPerHour, 0) / entries.length
      : 0,
    worthItCount: entries.filter(e => e.worthIt).length,
    ratingBreakdown: {
      excellent: entries.filter(e => e.rating === 'excellent').length,
      good: entries.filter(e => e.rating === 'good').length,
      okay: entries.filter(e => e.rating === 'okay').length,
      poor: entries.filter(e => e.rating === 'poor').length,
      terrible: entries.filter(e => e.rating === 'terrible').length,
    },
  };

  return {
    entries,
    isLoading,
    stats,
    addEntry: addMutation.mutateAsync,
    updateEntry: updateMutation.mutateAsync,
    deleteEntry: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}