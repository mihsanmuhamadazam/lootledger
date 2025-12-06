import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import {
  getFriendsByUserId,
  addFriend,
  deleteFriend,
  getUserByShareCode,
  generateId,
  getValorantSkinsByUserId,
  getCSGOSkinsByUserId,
} from '../lib/db';
import { vpToRM } from '../lib/utils';
import type { Friend, LeaderboardEntry } from '../types';

export function useFriends() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ['friends', user?.id],
    queryFn: () => getFriendsByUserId(user!.id),
    enabled: !!user?.id,
  });

  const addMutation = useMutation({
    mutationFn: async (shareCode: string) => {
      if (!user) throw new Error('Not authenticated');
      
      // Find user by share code
      const friendUser = await getUserByShareCode(shareCode);
      if (!friendUser) throw new Error('User not found');
      if (friendUser.id === user.id) throw new Error('Cannot add yourself as a friend');
      
      // Check if already friends
      const existing = friends.find(f => f.friendId === friendUser.id);
      if (existing) throw new Error('Already friends');
      
      const newFriend: Friend = {
        id: generateId(),
        odId: user.id,
        odName: user.name,
        odShareCode: user.shareCode,
        friendId: friendUser.id,
        friendName: friendUser.name,
        friendShareCode: friendUser.shareCode,
        addedAt: new Date().toISOString(),
      };
      
      return addFriend(newFriend);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends', user?.id] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends', user?.id] });
    },
  });

  // Get leaderboard data
  const { data: leaderboard = [], isLoading: isLoadingLeaderboard } = useQuery({
    queryKey: ['leaderboard', user?.id, friends.map(f => f.friendId).join(',')],
    queryFn: async () => {
      if (!user) return [];
      
      const entries: LeaderboardEntry[] = [];
      
      // Add current user
      const userValorant = await getValorantSkinsByUserId(user.id);
      const userCsgo = await getCSGOSkinsByUserId(user.id);
      
      entries.push({
        oderId: user.id,
        ownerName: user.name,
        totalSpentRM: userValorant.reduce((sum, s) => sum + s.pricePaidRM, 0) + 
                      userCsgo.reduce((sum, s) => sum + s.pricePaidRM, 0),
        valorantValue: userValorant.reduce((sum, s) => sum + vpToRM(s.vpCost), 0),
        csgoValue: userCsgo.reduce((sum, s) => sum + s.currentMarketPriceRM, 0),
        totalSkins: userValorant.length + userCsgo.length,
        rank: 0,
      });
      
      // Add friends
      for (const friend of friends) {
        const friendValorant = await getValorantSkinsByUserId(friend.friendId);
        const friendCsgo = await getCSGOSkinsByUserId(friend.friendId);
        
        entries.push({
          oderId: friend.friendId,
          ownerName: friend.friendName,
          totalSpentRM: friendValorant.reduce((sum, s) => sum + s.pricePaidRM, 0) + 
                        friendCsgo.reduce((sum, s) => sum + s.pricePaidRM, 0),
          valorantValue: friendValorant.reduce((sum, s) => sum + vpToRM(s.vpCost), 0),
          csgoValue: friendCsgo.reduce((sum, s) => sum + s.currentMarketPriceRM, 0),
          totalSkins: friendValorant.length + friendCsgo.length,
          rank: 0,
        });
      }
      
      // Sort and assign ranks (by total inventory value)
      entries.sort((a, b) => (b.valorantValue + b.csgoValue) - (a.valorantValue + a.csgoValue));
      entries.forEach((entry, index) => {
        entry.rank = index + 1;
      });
      
      return entries;
    },
    enabled: !!user?.id,
  });

  return {
    friends,
    isLoading,
    leaderboard,
    isLoadingLeaderboard,
    addFriend: addMutation.mutateAsync,
    removeFriend: removeMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    addError: addMutation.error?.message,
  };
}