'use client';

import { TeleComponentProps } from './types';

/**
 * StatsRow — Horizontal row of key statistics/metrics.
 *
 * Props (via data):
 *   title?: string
 *   stats: Array<{ label: string; value: string | number; unit?: string; icon?: string }>
 */
export default function StatsRow({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const stats: Array<{ label: string; value: string | number; unit?: string }> = Array.isArray(data.stats)
    ? data.stats
    : [];

  if (stats.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)` }}>
        {stats.map((stat, i) => (
          <div key={i} className="rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: accentColor }}>
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              {stat.unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{stat.unit}</span>}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
