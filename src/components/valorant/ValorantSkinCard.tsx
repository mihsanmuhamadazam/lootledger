import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Sparkles } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ValorantSkinForm } from './ValorantSkinForm';
import { formatRM, formatVP, getValorantTierInfo } from '../../lib/utils';
import { useValorant } from '../../hooks/useValorant';
import { useToast } from '../ui/Toast';
import type { ValorantSkin } from '../../types';

interface ValorantSkinCardProps {
  skin: ValorantSkin;
}

export function ValorantSkinCard({ skin }: ValorantSkinCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { updateSkin, deleteSkin, isUpdating, isDeleting } = useValorant();
  const { showToast } = useToast();

  const tierInfo = getValorantTierInfo(skin.tier);

  const handleUpdate = async (data: Parameters<typeof updateSkin>[0]) => {
    try {
      await updateSkin({ ...skin, ...data });
      showToast('Skin updated successfully', 'success');
      setIsEditModalOpen(false);
    } catch {
      showToast('Failed to update skin', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSkin(skin.id);
      showToast('Skin deleted', 'success');
      setIsDeleteModalOpen(false);
    } catch {
      showToast('Failed to delete skin', 'error');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="skin-card group relative overflow-hidden"
      >
        {/* Tier indicator */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{ background: `linear-gradient(90deg, ${tierInfo.color}, transparent)` }}
        />

        <div className="pt-2">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" style={{ color: tierInfo.color }} />
                <span className={`badge badge-tier-${skin.tier}`}>
                  {tierInfo.label}
                </span>
              </div>
              <h3 className="font-bold text-lg text-white">{skin.name}</h3>
              <p className="text-sm text-white/50">{skin.collection}</p>
            </div>
            <span className="text-xs text-white/40 capitalize">{skin.weapon}</span>
          </div>

          {/* Variant if exists */}
          {skin.variant && (
            <p className="text-sm text-[#c471f5] mb-3">Variant: {skin.variant}</p>
          )}

          {/* Price info */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/05 rounded-xl p-3">
              <p className="text-xs text-white/40 mb-1">VP Cost</p>
              <p className="font-bold text-[#00d4ff]">{formatVP(skin.vpCost)}</p>
            </div>
            <div className="bg-white/05 rounded-xl p-3">
              <p className="text-xs text-white/40 mb-1">Price Paid</p>
              <p className="font-bold text-white">{formatRM(skin.pricePaidRM)}</p>
            </div>
          </div>

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
        </div>
      </motion.div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Skin">
        <ValorantSkinForm
          skin={skin}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isUpdating}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Skin"
        size="sm"
      >
        <p className="text-white/60 mb-6">
          Are you sure you want to delete <strong className="text-white">{skin.name}</strong>?
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