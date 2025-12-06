import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Clock, DollarSign, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { GameWorthForm } from './GameWorthForm';
import { formatRM, getWorthRatingInfo } from '../../lib/utils';
import { useGameWorth } from '../../hooks/useGameWorth';
import { useToast } from '../ui/Toast';
import type { GameWorthEntry } from '../../types';

interface GameWorthCardProps {
  entry: GameWorthEntry;
}

export function GameWorthCard({ entry }: GameWorthCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { updateEntry, deleteEntry, isUpdating, isDeleting } = useGameWorth();
  const { showToast } = useToast();

  const ratingInfo = getWorthRatingInfo(entry.rating);

  const handleUpdate = async (data: Parameters<typeof updateEntry>[0]) => {
    try {
      await updateEntry({ ...entry, ...data });
      showToast('Entry updated', 'success');
      setIsEditModalOpen(false);
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEntry(entry.id);
      showToast('Entry deleted', 'success');
      setIsDeleteModalOpen(false);
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 group relative overflow-hidden"
      >
        {/* Rating color indicator */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{ background: `linear-gradient(90deg, ${ratingInfo.color}, transparent)` }}
        />

        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-white">{entry.gameName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold rating-${entry.rating}`}
              >
                {ratingInfo.emoji} {ratingInfo.label}
              </span>
            </div>
          </div>
          {entry.worthIt ? (
            <ThumbsUp className="w-6 h-6 text-green-500" />
          ) : (
            <ThumbsDown className="w-6 h-6 text-red-500" />
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/05 rounded-xl p-3 text-center">
            <DollarSign className="w-4 h-4 text-[#ff6b9d] mx-auto mb-1" />
            <p className="text-xs text-white/40">Price</p>
            <p className="font-bold text-white">{formatRM(entry.priceRM)}</p>
          </div>
          <div className="bg-white/05 rounded-xl p-3 text-center">
            <Clock className="w-4 h-4 text-[#00d4ff] mx-auto mb-1" />
            <p className="text-xs text-white/40">Hours</p>
            <p className="font-bold text-white">{entry.hoursToComplete}h</p>
          </div>
          <div className="bg-white/05 rounded-xl p-3 text-center">
            <span className="text-lg block mb-1">⚡</span>
            <p className="text-xs text-white/40">RM/Hour</p>
            <p className="font-bold" style={{ color: ratingInfo.color }}>
              {formatRM(entry.rmPerHour)}
            </p>
          </div>
        </div>

        {/* Notes */}
        {entry.notes && (
          <p className="text-sm text-white/50 mb-4 line-clamp-2">{entry.notes}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="flex-1"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex-1 text-red-500 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Game">
        <GameWorthForm
          entry={entry}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isUpdating}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Entry"
        size="sm"
      >
        <p className="text-white/60 mb-6">
          Are you sure you want to delete <strong className="text-white">{entry.gameName}</strong>?
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting} className="flex-1">
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}