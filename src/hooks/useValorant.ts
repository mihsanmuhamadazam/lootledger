import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import {
  getValorantSkinsByUserId,
  createValorantSkin,
  updateValorantSkin,
  deleteValorantSkin,
  generateId,
} from '../lib/db';
import { vpToRM } from '../lib/utils';
import type { ValorantSkin, ValorantTier } from '../types';

export function useValorant() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: skins = [], isLoading } = useQuery({
    queryKey: ['valorantSkins', user?.id],
    queryFn: () => getValorantSkinsByUserId(user!.id),
    enabled: !!user?.id,
  });

  const addMutation = useMutation({
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
      
      const newSkin: ValorantSkin = {
        id: generateId(),
        odId: user.id,
        skinId: data.skinId,
        name: data.name,
        weapon: data.weapon,
        collection: data.collection,
        tier: data.tier,
        variant: data.variant,
        vpCost: data.vpCost,
        pricePaidRM: data.pricePaidRM,
        acquiredDate: data.acquiredDate,
        createdAt: new Date().toISOString(),
      };
      
      return createValorantSkin(newSkin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valorantSkins', user?.id] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateValorantSkin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valorantSkins', user?.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteValorantSkin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valorantSkins', user?.id] });
    },
  });

  // Calculate stats
  const stats = {
    totalSkins: skins.length,
    totalVP: skins.reduce((sum, s) => sum + s.vpCost, 0),
    totalSpentRM: skins.reduce((sum, s) => sum + s.pricePaidRM, 0),
    estimatedValueRM: skins.reduce((sum, s) => sum + vpToRM(s.vpCost), 0),
    tierBreakdown: {
      select: skins.filter(s => s.tier === 'select').length,
      deluxe: skins.filter(s => s.tier === 'deluxe').length,
      premium: skins.filter(s => s.tier === 'premium').length,
      ultra: skins.filter(s => s.tier === 'ultra').length,
      exclusive: skins.filter(s => s.tier === 'exclusive').length,
    },
  };

  return {
    skins,
    isLoading,
    stats,
    addSkin: addMutation.mutateAsync,
    updateSkin: updateMutation.mutateAsync,
    deleteSkin: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}