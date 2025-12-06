import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGameWorthEntriesByUserId, createGameWorthEntry, updateGameWorthEntry, deleteGameWorthEntry, generateId } from '../lib/db';
import { useAuth } from '../context/AuthContext';
import type { GameWorthEntry } from '../types';
import { useMemo } from 'react';
import { calculateGameWorth } from '../lib/utils';

export function useGameWorth() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const entriesQuery = useQuery({
    queryKey: ['gameWorth', user?.id],
    queryFn: () => getGameWorthEntriesByUserId(user!.id),
    enabled: !!user,
  });

  const addEntryMutation = useMutation({
    mutationFn: async (data: {
      gameName: string;
      priceRM: number;
      hoursToComplete: number;
      notes?: string;
    }) => {
      if (!user) throw new Error('Not authenticated');
      
      const { rmPerHour, rating, worthIt } = calculateGameWorth(data.priceRM, data.hoursToComplete);
      
      const entry: GameWorthEntry = {
        id: generateId(),
        userId: user.id,
        ...data,
        rmPerHour,
        worthIt,
        rating: rating as GameWorthEntry['rating'],
        createdAt: new Date().toISOString(),
      };
      return createGameWorthEntry(entry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameWorth', user?.id] });
    },
  });

  const updateEntryMutation = useMutation({
    mutationFn: async (entry: GameWorthEntry) => {
      const { rmPerHour, rating, worthIt } = calculateGameWorth(entry.priceRM, entry.hoursToComplete);
      return updateGameWorthEntry({
        ...entry,
        rmPerHour,
        rating: rating as GameWorthEntry['rating'],
        worthIt,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameWorth', user?.id] });
    },
  });

  const deleteEntryMutation = useMutation({
    mutationFn: deleteGameWorthEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameWorth', user?.id] });
    },
  });

  // Calculate stats
  const stats = useMemo(() => {
    const entries = entriesQuery.data || [];
    const totalSpentRM = entries.reduce((sum, e) => sum + e.priceRM, 0);
    const totalHours = entries.reduce((sum, e) => sum + e.hoursToComplete, 0);
    const avgRmPerHour = totalHours > 0 ? totalSpentRM / totalHours : 0;
    
    const worthItCount = entries.filter(e => e.worthIt).length;
    const notWorthItCount = entries.length - worthItCount;

    // Best and worst value games
    const sortedByValue = [...entries].sort((a, b) => a.rmPerHour - b.rmPerHour);
    const bestValue = sortedByValue.slice(0, 3);
    const worstValue = sortedByValue.slice(-3).reverse();

    return {
      totalGames: entries.length,
      totalSpentRM,
      totalHours,
      avgRmPerHour,
      worthItCount,
      notWorthItCount,
      bestValue,
      worstValue,
    };
  }, [entriesQuery.data]);

  return {
    entries: entriesQuery.data || [],
    isLoading: entriesQuery.isLoading,
    error: entriesQuery.error,
    addEntry: addEntryMutation.mutateAsync,
    updateEntry: updateEntryMutation.mutateAsync,
    deleteEntry: deleteEntryMutation.mutateAsync,
    isAdding: addEntryMutation.isPending,
    isUpdating: updateEntryMutation.isPending,
    isDeleting: deleteEntryMutation.isPending,
    stats,
  };
}
