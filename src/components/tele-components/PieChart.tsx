'use client';

import { TeleComponentProps } from './types';

const DEFAULT_COLORS = ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

/**
 * PieChart — SVG donut/pie chart with legend.
 *
 * Props (via data):
 *   title?: string
 *   slices: Array<{ label: string; value: number; color?: string }>
 *   donut?: boolean          — Show as donut (default: true)
 *   showPercent?: boolean    — Show percentages in legend (default: true)
 */
export default function PieChart({ data }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const slices: Array<{ label: string; value: number; color?: string }> = Array.isArray(data.slices) ? data.slices : [];
  const donut = data.donut !== false;
  const showPercent = data.showPercent !== false;

  if (slices.length === 0) return null;

  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;
  const R = 80;
  const CX = 100;
  const CY = 100;
  const INNER = donut ? R * 0.55 : 0;

  let cumAngle = -Math.PI / 2;

  const paths = slices.map((slice, i) => {
    const angle = (slice.value / total) * 2 * Math.PI;
    const startAngle = cumAngle;
    const endAngle = cumAngle + angle;
    cumAngle = endAngle;

    const largeArc = angle > Math.PI ? 1 : 0;
    const x1 = CX + R * Math.cos(startAngle);
    const y1 = CY + R * Math.sin(startAngle);
    const x2 = CX + R * Math.cos(endAngle);
    const y2 = CY + R * Math.sin(endAngle);
    const ix1 = CX + INNER * Math.cos(startAngle);
    const iy1 = CY + INNER * Math.sin(startAngle);
    const ix2 = CX + INNER * Math.cos(endAngle);
    const iy2 = CY + INNER * Math.sin(endAngle);

    const d = donut
      ? `M ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${INNER} ${INNER} 0 ${largeArc} 0 ${ix1} ${iy1} Z`
      : `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return (
      <path key={i} d={d} fill={slice.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]} className="transition-opacity hover:opacity-80" />
    );
  });

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <svg viewBox="0 0 200 200" className="h-40 w-40 shrink-0">
          {paths}
        </svg>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {slices.map((slice, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: slice.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length] }}
              />
              <span>
                {slice.label}
                {showPercent && (
                  <span className="text-muted-foreground"> ({((slice.value / total) * 100).toFixed(0)}%)</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
