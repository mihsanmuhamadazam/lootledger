import { useState, FormEvent, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { calculateGameWorth, getWorthRatingInfo, formatRM } from '../../lib/utils';
import type { GameWorthEntry } from '../../types';

interface GameWorthFormProps {
  entry?: GameWorthEntry;
  onSubmit: (data: {
    gameName: string;
    priceRM: number;
    hoursToComplete: number;
    notes?: string;
  }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function GameWorthForm({ entry, onSubmit, onCancel, isLoading }: GameWorthFormProps) {
  const [gameName, setGameName] = useState('');
  const [priceRM, setPriceRM] = useState('');
  const [hoursToComplete, setHoursToComplete] = useState('');
  const [notes, setNotes] = useState('');

  // Preview calculation
  const preview = priceRM && hoursToComplete
    ? calculateGameWorth(parseFloat(priceRM), parseFloat(hoursToComplete))
    : null;
  const previewRating = preview ? getWorthRatingInfo(preview.rating) : null;

  useEffect(() => {
    if (entry) {
      setGameName(entry.gameName);
      setPriceRM(entry.priceRM.toString());
      setHoursToComplete(entry.hoursToComplete.toString());
      setNotes(entry.notes || '');
    }
  }, [entry]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await onSubmit({
      gameName,
      priceRM: parseFloat(priceRM),
      hoursToComplete: parseFloat(hoursToComplete),
      notes: notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Game Name"
        type="text"
        placeholder="e.g., Elden Ring, Cyberpunk 2077"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price Paid (RM)"
          type="number"
          placeholder="199.00"
          value={priceRM}
          onChange={(e) => setPriceRM(e.target.value)}
          min="0"
          step="0.01"
          required
        />
        <Input
          label="Hours Played/Expected"
          type="number"
          placeholder="60"
          value={hoursToComplete}
          onChange={(e) => setHoursToComplete(e.target.value)}
          min="0.5"
          step="0.5"
          required
        />
      </div>

      {/* Live Preview */}
      {preview && previewRating && (
        <div
          className="p-4 rounded-xl border-2 transition-all"
          style={{
            backgroundColor: `${previewRating.color}10`,
            borderColor: `${previewRating.color}30`,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{previewRating.emoji}</span>
            <span
              className="font-bold text-lg"
              style={{ color: previewRating.color }}
            >
              {previewRating.label}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Cost per hour</span>
            <span
              className="font-bold"
              style={{ color: previewRating.color }}
            >
              {formatRM(preview.rmPerHour)}/hr
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-white/60">Verdict</span>
            <span className={preview.worthIt ? 'text-green-500' : 'text-red-500'}>
              {preview.worthIt ? '✓ Worth it!' : '✗ Not worth it'}
            </span>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm text-white/50 mb-2">Notes (Optional)</label>
        <textarea
          placeholder="Any thoughts about the game..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="input-clean resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading} className="flex-1">
          {entry ? 'Update Entry' : 'Calculate & Save'}
        </Button>
      </div>
    </form>
  );
}