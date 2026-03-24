'use client';

import { TeleComponentProps } from './types';

/**
 * MetricCard — Rich metric display with trend bar, optimized for dark scene backgrounds.
 *
 * Props (via data):
 *   title: string                — Metric name
 *   value: string | number       — Current value
 *   target?: string | number     — Target/goal value
 *   progress?: number            — 0-100 progress bar fill
 *   trend?: string               — Trend text (e.g., "+14% vs last quarter")
 *   trendDirection?: 'up' | 'down' | 'neutral'
 *   description?: string         — Additional context text
 *   status?: 'on-track' | 'at-risk' | 'behind' | 'exceeded'
 */
export default function MetricCard({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const title = (data.title as string) || '';
  const value = data.value ?? '—';
  const target = data.target;
  const progress = typeof data.progress === 'number' ? Math.min(100, Math.max(0, data.progress)) : undefined;
  const trend = data.trend as string | undefined;
  const trendDirection = (data.trendDirection as string) || 'neutral';
  const description = data.description as string | undefined;
  const status = data.status as string | undefined;
  const cta = data.cta as string | undefined;

  const statusConfig: Record<string, { color: string; label: string }> = {
    'on-track':  { color: 'bg-emerald-500', label: 'On Track' },
    'at-risk':   { color: 'bg-amber-500',   label: 'At Risk' },
    'behind':    { color: 'bg-red-500',      label: 'Behind' },
    'exceeded':  { color: 'bg-blue-500',     label: 'Exceeded' },
  };

  const trendColor =
    trendDirection === 'up' ? 'text-emerald-400' :
    trendDirection === 'down' ? 'text-red-400' :
    'text-gray-400';

  const st = status ? statusConfig[status] : undefined;

  return (
    <div
      className="flex flex-col justify-between h-full min-h-[120px] cursor-default select-none"
      onClick={cta ? () => onAction?.(cta) : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{title}</span>
        {st && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full text-white ${st.color}`}>
            {st.label}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {target && (
          <span className="text-sm text-gray-500">
            / {typeof target === 'number' ? target.toLocaleString() : target}
          </span>
        )}
      </div>

      {/* Trend */}
      {trend && (
        <span className={`text-xs mt-1 ${trendColor}`}>{trend}</span>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-3 w-full">
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                backgroundColor: accentColor,
              }}
            />
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-[11px] text-gray-500 mt-2 leading-snug">{description}</p>
      )}
    </div>
  );
}
