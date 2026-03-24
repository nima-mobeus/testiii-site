'use client';

import { TeleComponentProps } from './types';

/**
 * DonutChart — SVG donut chart optimized for dark scene backgrounds.
 *
 * Props (via data):
 *   title?: string
 *   segments: Array<{ label: string; value: number; color?: string }>
 *   centerValue?: string | number   — Big number in center
 *   centerLabel?: string            — Small label below center value
 *   size?: number                   — Diameter in px (default: 140)
 */

const PALETTE = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
];

export default function DonutChart({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const segments: Array<{ label: string; value: number; color?: string }> = Array.isArray(data.segments)
    ? data.segments
    : [];
  const centerValue = data.centerValue;
  const centerLabel = data.centerLabel as string | undefined;
  const size = (data.size as number) || 140;
  const cta = data.cta as string | undefined;

  if (segments.length === 0) return null;

  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = size / 2 - 4;
  const innerRadius = radius * 0.62;
  const cx = size / 2;
  const cy = size / 2;

  // Build donut arcs
  let currentAngle = -90; // start from top
  const arcs = segments.map((seg, i) => {
    const fraction = total > 0 ? seg.value / total : 0;
    const angle = fraction * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Small gap between segments
    const gap = segments.length > 1 ? 1.5 : 0;
    const startGapRad = (gap / 2 * Math.PI) / 180;
    const endGapRad = (gap / 2 * Math.PI) / 180;

    const outerStartX = cx + radius * Math.cos(startRad + startGapRad);
    const outerStartY = cy + radius * Math.sin(startRad + startGapRad);
    const outerEndX = cx + radius * Math.cos(endRad - endGapRad);
    const outerEndY = cy + radius * Math.sin(endRad - endGapRad);

    const innerStartX = cx + innerRadius * Math.cos(endRad - endGapRad);
    const innerStartY = cy + innerRadius * Math.sin(endRad - endGapRad);
    const innerEndX = cx + innerRadius * Math.cos(startRad + startGapRad);
    const innerEndY = cy + innerRadius * Math.sin(startRad + startGapRad);

    const largeArc = angle > 180 ? 1 : 0;

    const d = [
      `M ${outerStartX} ${outerStartY}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}`,
      `L ${innerStartX} ${innerStartY}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerEndX} ${innerEndY}`,
      'Z',
    ].join(' ');

    const color = seg.color || PALETTE[i % PALETTE.length];

    return { d, color, label: seg.label, value: seg.value, fraction };
  });

  return (
    <div
      className="flex flex-col items-center h-full select-none"
      onClick={cta ? () => onAction?.(cta) : undefined}
    >
      {title && <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2 self-start">{title}</h4>}

      <div className="flex items-center gap-4 flex-1">
        {/* SVG donut */}
        <div className="relative flex-shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {arcs.map((arc, i) => (
              <path key={i} d={arc.d} fill={arc.color} opacity={0.85} />
            ))}
          </svg>
          {/* Center text */}
          {(centerValue !== undefined || centerLabel) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {centerValue !== undefined && (
                <span className="text-lg font-bold text-white leading-tight">
                  {typeof centerValue === 'number' ? centerValue.toLocaleString() : centerValue}
                </span>
              )}
              {centerLabel && (
                <span className="text-[10px] text-gray-400">{centerLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 min-w-0">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: seg.color || PALETTE[i % PALETTE.length] }}
              />
              <span className="text-gray-300 truncate">{seg.label}</span>
              <span className="text-gray-500 ml-auto tabular-nums">
                {total > 0 ? `${Math.round((seg.value / total) * 100)}%` : '0%'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
