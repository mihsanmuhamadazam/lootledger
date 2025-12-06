import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CSGOSkinForm } from './CSGOSkinForm';
import { formatRM, getCSGOWearInfo, getWearShorthand, getPercentChange } from '../../lib/utils';
import { useCSGO } from '../../hooks/useCSGO';
import { useToast } from '../ui/Toast';
import { RARITY_COLORS } from '../../data/csgoSkins';
import type { CSGOSkin } from '../../types';

interface CSGOSkinCardProps {
  skin: CSGOSkin;
}

export function CSGOSkinCard({ skin }: CSGOSkinCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { updateSkin, deleteSkin, isUpdating, isDeleting } = useCSGO();
  const { showToast } = useToast();

  const wearInfo = getCSGOWearInfo(skin.wear);
  const profitLoss = skin.currentMarketPriceRM - skin.pricePaidRM;
  const percentChange = getPercentChange(skin.currentMarketPriceRM, skin.pricePaidRM);
  const isProfit = profitLoss >= 0;

  const handleUpdate = async (data: {
    name: string;
    weapon: string;
    skinName: string;
    wear: CSGOSkin['wear'];
    statTrak: boolean;
    floatValue?: number;
    pricePaidRM: number;
    currentMarketPriceRM: number;
    acquiredDate: string;
  }) => {
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
        className="skin-card-csgo group relative overflow-hidden"
      >
        {/* Gradient top bar */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{ background: `linear-gradient(90deg, ${RARITY_COLORS['Covert'] || '#4b69ff'}, transparent)` }}
        />

        <div className="pt-2">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {skin.statTrak && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#cf6a32]/20 text-[#cf6a32] text-xs font-bold">
                    <Zap className="w-3 h-3" />
                    StatTrak™
                  </span>
                )}
                <span className="badge badge-wear">
                  {getWearShorthand(skin.wear)}
                </span>
              </div>
              <h3 className="font-bold text-lg text-white">{skin.weapon} | {skin.skinName}</h3>
              <p className="text-sm text-white/50">{wearInfo.label}</p>
            </div>
          </div>

          {/* Float Value */}
          {skin.floatValue !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>Float Value</span>
                <span>{skin.floatValue.toFixed(6)}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                  style={{ width: `${skin.floatValue * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Price info */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/05 rounded-xl p-3">
              <p className="text-xs text-white/40 mb-1">Price Paid</p>
              <p className="font-bold text-white">{formatRM(skin.pricePaidRM)}</p>
            </div>
            <div className="bg-white/05 rounded-xl p-3">
              <p className="text-xs text-white/40 mb-1">Market Value</p>
              <p className="font-bold text-[#ffd700]">{formatRM(skin.currentMarketPriceRM)}</p>
            </div>
          </div>

          {/* Profit/Loss */}
          <div className={`flex items-center justify-between p-3 rounded-xl ${isProfit ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            <span className="text-sm text-white/60">Profit/Loss</span>
            <div className="flex items-center gap-2">
              {isProfit ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`font-bold ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                {isProfit ? '+' : ''}{formatRM(profitLoss)}
              </span>
              <span className={`text-xs ${isProfit ? 'text-green-500/60' : 'text-red-500/60'}`}>
                ({isProfit ? '+' : ''}{percentChange.toFixed(1)}%)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
        <CSGOSkinForm
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
          Are you sure you want to delete <strong className="text-white">{skin.weapon} | {skin.skinName}</strong>?
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