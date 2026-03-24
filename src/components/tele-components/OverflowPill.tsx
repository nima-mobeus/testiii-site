import React from 'react';
import { getColor } from './utils';

interface OverflowPillProps {
  count: number;
  label?: string;
}

/**
 * OverflowPill — Subtle "+N more" indicator shown when a card's list is clamped.
 * Only renders when count > 0.  NOT registered in the component registry.
 */
export const OverflowPill: React.FC<OverflowPillProps> = ({ count, label = 'more' }) => {
  if (count <= 0) return null;
  return (
    <div className="flex justify-center mt-1 shrink-0">
      <span
        className="font-data text-sm uppercase tracking-wider px-2.5 py-0.5 rounded-full"
        style={{
          backgroundColor: getColor(3),
          color: getColor(70),
          border: `1px solid ${getColor(6)}`,
        }}
      >
        +{count} {label}
      </span>
    </div>
  );
};

export default OverflowPill;
