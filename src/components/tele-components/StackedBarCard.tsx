import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const PALETTE = [C, '#1d4ed8', '#22c55e', '#b45309', '#6d28d9', '#0891b2', '#9ca3af'];

interface StackedSegment { label: string; value: number; color?: string; }
interface StackedGroup { label: string; segments: StackedSegment[]; }
interface StackedBarCardData { title?: string; groups: StackedGroup[]; unit?: string; }

export default function StackedBarCard({ data }: TeleComponentProps) {
  const { title, groups = [], unit } = data as StackedBarCardData;
  const maxTotal = Math.max(...groups.map(g => (g.segments || []).reduce((s, seg) => s + (seg.value ?? 0), 0)), 1);
  const allLabels = [...new Set(groups.flatMap(g => (g.segments || []).map(s => s.label)))];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {title && (
        <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: getColor(90) }}>{title}</h3>
      )}
      <div className="flex flex-col gap-1 flex-1 justify-center">
        {groups.map((g, gi) => {
          const total = (g.segments || []).reduce((s, seg) => s + (seg.value ?? 0), 0);
          return (
            <div key={gi} className="flex items-center gap-1.5">
              <span className="font-data text-sm md:text-sm w-14 text-left truncate font-bold" style={{ color: getColor(70) }}>{g.label}</span>
              <div className="flex-1 h-3 rounded-sm overflow-hidden flex" style={{ backgroundColor: getColor(5) }}>
                {(g.segments || []).map((seg, si) => {
                  const w = (seg.value / maxTotal) * 100;
                  return <div key={si} className="h-full" style={{ width: `${w}%`, backgroundColor: seg.color || PALETTE[si % PALETTE.length] }} title={`${seg.label}: ${seg.value}`} />;
                })}
              </div>
              <span className="font-data text-sm font-bold min-w-[36px] text-right" style={{ color: getColor(90) }}>
                {total.toLocaleString()}{unit ? ` ${unit}` : ''}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
        {allLabels.map((l, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
            <span className="font-data text-sm md:text-sm" style={{ color: getColor(70) }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
