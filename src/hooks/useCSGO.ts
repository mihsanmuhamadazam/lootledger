import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import {
  getCSGOSkinsByUserId,
  createCSGOSkin,
  updateCSGOSkin,
  deleteCSGOSkin,
  generateId,
} from '../lib/db';
import type { CSGOSkin, CSGOWear } from '../types';

export function useCSGO() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: skins = [], isLoading } = useQuery({
    queryKey: ['csgoSkins', user?.id],
    queryFn: () => getCSGOSkinsByUserId(user!.id),
    enabled: !!user?.id,
  });

  const addMutation = useMutation({
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
      
      const newSkin: CSGOSkin = {
        id: generateId(),
        odId: user.id,
        name: data.name,
        weapon: data.weapon,
        skinName: data.skinName,
        wear: data.wear,
        statTrak: data.statTrak,
        floatValue: data.floatValue,
        pricePaidRM: data.pricePaidRM,
        currentMarketPriceRM: data.currentMarketPriceRM,
        acquiredDate: data.acquiredDate,
        createdAt: new Date().toISOString(),
      };
      
      return createCSGOSkin(newSkin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['csgoSkins', user?.id] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCSGOSkin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['csgoSkins', user?.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCSGOSkin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['csgoSkins', user?.id] });
    },
  });

  // Calculate stats
  const stats = {
    totalSkins: skins.length,
    totalPaidRM: skins.reduce((sum, s) => sum + s.pricePaidRM, 0),
    currentValueRM: skins.reduce((sum, s) => sum + s.currentMarketPriceRM, 0),
    profitLossRM: skins.reduce((sum, s) => sum + (s.currentMarketPriceRM - s.pricePaidRM), 0),
    statTrakCount: skins.filter(s => s.statTrak).length,
    wearBreakdown: {
      fn: skins.filter(s => s.wear === 'fn').length,
      mw: skins.filter(s => s.wear === 'mw').length,
      ft: skins.filter(s => s.wear === 'ft').length,
      ww: skins.filter(s => s.wear === 'ww').length,
      bs: skins.filter(s => s.wear === 'bs').length,
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