import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const PALETTE = ['var(--theme-chart-line)', '#1d4ed8', '#0891b2', '#22c55e', '#6d28d9'];

interface FunnelStage { label: string; value: number; displayValue?: string; }
interface FunnelCardData { title?: string; stages: FunnelStage[]; unit?: string; }

export default function FunnelCard({ data }: TeleComponentProps) {
  const { title, stages = [], unit } = data as FunnelCardData;
  const max = Math.max(...stages.map(s => s.value), 1);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {title && (
        <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: getColor(90) }}>{title}</h3>
      )}
      <div className="flex flex-col gap-1.5 flex-1 justify-center items-center">
        {stages.map((s, i) => {
          const widthPct = Math.max((s.value / max) * 100, 20);
          const clr = PALETTE[i % PALETTE.length];
          const convRate = i > 0 && stages[i - 1].value ? ((s.value / stages[i - 1].value) * 100).toFixed(0) : null;
          return (
            <div key={i} className="w-full flex flex-col items-center">
              {convRate && (
                <span className="font-data text-sm mb-0.5" style={{ color: getColor(70) }}>↓ {convRate}%</span>
              )}
              <div
                className="h-5 rounded-sm flex items-center justify-between px-2 transition-all"
                style={{ width: `${widthPct}%`, backgroundColor: clr, minWidth: 80 }}
              >
                <span className="font-data text-sm md:text-sm text-white font-bold truncate">{s.label}</span>
                <span className="font-data text-sm md:text-sm text-white font-bold">
                  {s.displayValue || s.value.toLocaleString()}{unit ? ` ${unit}` : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
