'use client';

import { TeleComponentProps } from './types';

/**
 * KPICard — Single big-number KPI display optimized for dark scene backgrounds.
 *
 * Props (via data):
 *   value: string | number       — The big number/value
 *   label: string                — Short label below the value
 *   change?: string              — Change indicator (e.g., "+12.4%", "−3.1%")
 *   changeDirection?: 'up' | 'down' | 'neutral'
 *   icon?: string                — Emoji or icon character
 *   unit?: string                — Unit suffix (e.g., "%", "M", "kWh")
 *   sparkline?: number[]         — Tiny sparkline data points (optional)
 */
export default function KPICard({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const value = data.value ?? '—';
  const label = (data.label as string) || '';
  const change = data.change as string | undefined;
  const direction = (data.changeDirection as string) || 'neutral';
  const icon = data.icon as string | undefined;
  const unit = data.unit as string | undefined;
  const sparkline = Array.isArray(data.sparkline) ? data.sparkline as number[] : undefined;
  const cta = data.cta as string | undefined;

  const changeColor =
    direction === 'up' ? 'text-emerald-400' :
    direction === 'down' ? 'text-red-400' :
    'text-gray-400';

  const changeArrow =
    direction === 'up' ? '↑' :
    direction === 'down' ? '↓' :
    '';

  // Normalize sparkline for SVG rendering
  const sparklinePath = sparkline && sparkline.length > 1 ? (() => {
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min || 1;
    const w = 80;
    const h = 24;
    const step = w / (sparkline.length - 1);
    return sparkline
      .map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - ((v - min) / range) * h}`)
      .join(' ');
  })() : null;

  return (
    <div
      className="flex flex-col justify-between h-full min-h-[100px] cursor-default select-none"
      onClick={cta ? () => onAction?.(cta) : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {icon && <span className="text-lg mb-1 block">{icon}</span>}
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-white tracking-tight">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && <span className="text-lg text-gray-400 font-medium">{unit}</span>}
          </div>
        </div>
        {sparklinePath && (
          <svg width="80" height="24" className="mt-1 flex-shrink-0 opacity-60">
            <path d={sparklinePath} fill="none" stroke={accentColor} strokeWidth="1.5" />
          </svg>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
        {change && (
          <span className={`text-xs font-medium ${changeColor}`}>
            {changeArrow} {change}
          </span>
        )}
      </div>
    </div>
  );
}
