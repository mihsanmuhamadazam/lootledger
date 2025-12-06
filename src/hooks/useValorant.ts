import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getValorantSkinsByUserId, createValorantSkin, updateValorantSkin, deleteValorantSkin, generateId } from '../lib/db';
import { useAuth } from '../context/AuthContext';
import type { ValorantSkin, ValorantTier } from '../types';
import { useMemo } from 'react';
import { vpToRM } from '../lib/utils';

export function useValorant() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const skinsQuery = useQuery({
    queryKey: ['valorantSkins', user?.id],
    queryFn: () => getValorantSkinsByUserId(user!.id),
    enabled: !!user,
  });

  const addSkinMutation = useMutation({
    mutationFn: async (data: {
      skinId: string;
      name: string;
      weapon: string;
      collection: string;
      tier: ValorantTier;
      variant?: string;
      vpCost: number;
      pricePaidRM: number;
      acquiredDate: string;
    }) => {
      if (!user) throw new Error('Not authenticated');
      const skin: ValorantSkin = {
        id: generateId(),
        userId: user.id,
        ...data,
        createdAt: new Date().toISOString(),
      };
      return createValorantSkin(skin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valorantSkins', user?.id] });
    },
  });

  const updateSkinMutation = useMutation({
    mutationFn: updateValorantSkin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valorantSkins', user?.id] });
    },
  });

  const deleteSkinMutation = useMutation({
    mutationFn: deleteValorantSkin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valorantSkins', user?.id] });
    },
  });

  // Calculate stats
  const stats = useMemo(() => {
    const skins = skinsQuery.data || [];
    const totalSpentRM = skins.reduce((sum, s) => sum + s.pricePaidRM, 0);
    const totalVP = skins.reduce((sum, s) => sum + s.vpCost, 0);
    
    // Count by tier
    const byTier = skins.reduce((acc, s) => {
      acc[s.tier] = (acc[s.tier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Count by weapon
    const byWeapon = skins.reduce((acc, s) => {
      acc[s.weapon] = (acc[s.weapon] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Count by collection
    const byCollection = skins.reduce((acc, s) => {
      acc[s.collection] = (acc[s.collection] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSkins: skins.length,
      totalSpentRM,
      totalVP,
      byTier,
      byWeapon,
      byCollection,
      // Estimated account value based on VP cost
      estimatedValueRM: vpToRM(totalVP),
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
