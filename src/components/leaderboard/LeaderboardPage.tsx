import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, UserPlus, Copy, Share2, Trash2, Crown, Medal } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { useFriends } from '../../hooks/useFriends';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../ui/Toast';
import { formatRM, generateShareLink, copyToClipboard } from '../../lib/utils';

export function LeaderboardPage() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [shareCode, setShareCode] = useState('');
  const { user } = useAuth();
  const { friends, leaderboard, isLoading, isLoadingLeaderboard, addFriend, removeFriend, isAdding, addError } = useFriends();
  const { showToast } = useToast();

  const handleCopyShareLink = async () => {
    if (user?.shareCode) {
      const link = generateShareLink(user.shareCode);
      const success = await copyToClipboard(link);
      if (success) {
        showToast('Share link copied!', 'success');
      }
    }
  };

  const handleCopyCode = async () => {
    if (user?.shareCode) {
      const success = await copyToClipboard(user.shareCode);
      if (success) {
        showToast('Code copied!', 'success');
      }
    }
  };

  const handleAddFriend = async () => {
    if (!shareCode.trim()) return;
    
    try {
      await addFriend(shareCode.trim().toUpperCase());
      showToast('Friend added!', 'success');
      setShareCode('');
      setIsAddFriendOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add friend';
      showToast(message, 'error');
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend(friendId);
      showToast('Friend removed', 'success');
    } catch {
      showToast('Failed to remove friend', 'error');
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-white/50 font-bold">#{rank}</span>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'leaderboard-row top-1';
      case 2:
        return 'leaderboard-row top-2';
      case 3:
        return 'leaderboard-row top-3';
      default:
        return 'leaderboard-row';
    }
  };

  if (isLoading || isLoadingLeaderboard) {
    return (
      <div className="space-y-6">
        <div className="h-32 glass-card animate-pulse" />
        <div className="h-64 glass-card animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-orbitron">
              <span className="gradient-text">Friends</span>
              <span className="text-white"> & Leaderboard</span>
            </h1>
            <p className="text-white/50">Compare your spending with friends</p>
          </div>
        </div>
        <Button variant="primary" onClick={() => setIsAddFriendOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Friend
        </Button>
      </div>

      {/* Share Your Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Share2 className="w-5 h-5 text-[#c471f5]" />
          <span className="font-bold text-white">Your Share Code</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-white/05 rounded-xl p-4 flex items-center justify-between">
            <span className="font-mono text-2xl font-bold text-white tracking-wider">
              {user?.shareCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Copy code"
            >
              <Copy className="w-5 h-5 text-white/60" />
            </button>
          </div>
          <Button variant="secondary" onClick={handleCopyShareLink}>
            <Share2 className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>
        <p className="text-sm text-white/40 mt-3">
          Share this code with friends so they can add you and compare inventories!
        </p>
      </motion.div>

      {/* Friends List */}
      {friends.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-[#00d4ff]" />
            <span className="font-bold text-white">Your Friends ({friends.length})</span>
          </div>
          <div className="space-y-2">
            {friends.map(friend => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/05 hover:bg-white/08 transition-colors"
              >
                <div>
                  <p className="font-semibold text-white">{friend.friendName}</p>
                  <p className="text-sm text-white/50 font-mono">{friend.friendShareCode}</p>
                </div>
                <button
                  onClick={() => handleRemoveFriend(friend.id)}
                  className="p-2 rounded-lg text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Remove friend"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-white">Inventory Leaderboard</span>
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">Add friends to start comparing inventories!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry, index) => {
              const isCurrentUser = entry.oderId === user?.id;
              return (
                <motion.div
                  key={entry.oderId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`${getRankClass(entry.rank)} ${isCurrentUser ? 'ring-2 ring-[#c471f5]/50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {getRankIcon(entry.rank)}
                    <div>
                      <p className={`font-bold ${isCurrentUser ? 'text-[#c471f5]' : 'text-white'}`}>
                        {entry.ownerName}
                        {isCurrentUser && <span className="text-white/50 font-normal"> (You)</span>}
                      </p>
                      <p className="text-sm text-white/50">
                        {entry.totalSkins} skins
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#ffd700]">
                      {formatRM(entry.valorantValue + entry.csgoValue)}
                    </p>
                    <div className="text-xs text-white/40 space-x-2">
                      <span>VAL: {formatRM(entry.valorantValue)}</span>
                      <span>CS: {formatRM(entry.csgoValue)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Add Friend Modal */}
      <Modal isOpen={isAddFriendOpen} onClose={() => setIsAddFriendOpen(false)} title="Add Friend" size="sm">
        <div className="space-y-4">
          <p className="text-white/60">
            Enter your friend's share code to add them and compare inventories!
          </p>
          <Input
            label="Friend's Share Code"
            type="text"
            placeholder="e.g., ABC123XY"
            value={shareCode}
            onChange={(e) => setShareCode(e.target.value.toUpperCase())}
            maxLength={8}
            className="font-mono text-center text-lg tracking-wider"
          />
          {addError && (
            <p className="text-sm text-red-500">{addError}</p>
          )}
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setIsAddFriendOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddFriend}
              isLoading={isAdding}
              disabled={shareCode.length < 8}
              className="flex-1"
            >
              Add Friend
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}