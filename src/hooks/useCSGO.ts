import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCSGOSkinsByUserId, createCSGOSkin, updateCSGOSkin, deleteCSGOSkin, generateId } from '../lib/db';
import { useAuth } from '../context/AuthContext';
import type { CSGOSkin, CSGOWear } from '../types';
import { useMemo } from 'react';

export function useCSGO() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const skinsQuery = useQuery({
    queryKey: ['csgoSkins', user?.id],
    queryFn: () => getCSGOSkinsByUserId(user!.id),
    enabled: !!user,
  });

  const addSkinMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      weapon: string;
      skinName: string;
      wear: CSGOWear;
      statTrak: boolean;
      floatValue?: number;
      pricePaidRM: number;
      currentMarketPriceRM: number;
      acquiredDate: string;
    }) => {
      if (!user) throw new Error('Not authenticated');
      const skin: CSGOSkin = {
        id: generateId(),
        userId: user.id,
        ...data,
        createdAt: new Date().toISOString(),
      };
      return createCSGOSkin(skin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['csgoSkins', user?.id] });
    },
  });

  const updateSkinMutation = useMutation({
    mutationFn: updateCSGOSkin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['csgoSkins', user?.id] });
    },
  });

  const deleteSkinMutation = useMutation({
    mutationFn: deleteCSGOSkin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['csgoSkins', user?.id] });
    },
  });

  // Calculate stats
  const stats = useMemo(() => {
    const skins = skinsQuery.data || [];
    const totalPaidRM = skins.reduce((sum, s) => sum + s.pricePaidRM, 0);
    const currentValueRM = skins.reduce((sum, s) => sum + s.currentMarketPriceRM, 0);
    const profitLossRM = currentValueRM - totalPaidRM;
    const profitLossPercent = totalPaidRM > 0 ? ((profitLossRM / totalPaidRM) * 100) : 0;

    // Count by weapon
    const byWeapon = skins.reduce((acc, s) => {
      acc[s.weapon] = (acc[s.weapon] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Count StatTrak items
    const statTrakCount = skins.filter(s => s.statTrak).length;

    // Most valuable items
    const topSkins = [...skins].sort((a, b) => b.currentMarketPriceRM - a.currentMarketPriceRM).slice(0, 5);

    return {
      totalSkins: skins.length,
      totalPaidRM,
      currentValueRM,
      profitLossRM,
      profitLossPercent,
      byWeapon,
      statTrakCount,
      topSkins,
    };
  }, [skinsQuery.data]);

  return {
    skins: skinsQuery.data || [],
    isLoading: skinsQuery.isLoading,
    error: skinsQuery.error,
    addSkin: addSkinMutation.mutateAsync,
    updateSkin: updateSkinMutation.mutateAsync,
    deleteSkin: deleteSkinMutation.mutateAsync,
    isAdding: addSkinMutation.isPending,
    isUpdating: updateSkinMutation.isPending,
    isDeleting: deleteSkinMutation.isPending,
    stats,
  };
}
