'use client';

import { TeleComponentProps } from './types';

/**
 * LineChart — SVG line chart with data points, axis labels, and grid.
 *
 * Props (via data):
 *   title?: string
 *   points: Array<{ x: string | number; y: number }>
 *   xLabel?: string
 *   yLabel?: string
 *   showDots?: boolean     — Show data point dots (default: true)
 *   showGrid?: boolean     — Show horizontal grid lines (default: true)
 *   lineColor?: string     — Override line color
 */
export default function LineChart({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const points: Array<{ x: string | number; y: number }> = Array.isArray(data.points) ? data.points : [];
  const xLabel = data.xLabel as string | undefined;
  const yLabel = data.yLabel as string | undefined;
  const showDots = data.showDots !== false;
  const showGrid = data.showGrid !== false;
  const lineColor = (data.lineColor as string) || accentColor;

  if (points.length === 0) return null;

  const yValues = points.map((p) => p.y);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  const yRange = yMax - yMin || 1;

  const W = 400;
  const H = 200;
  const PAD = { top: 20, right: 20, bottom: 30, left: 50 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const toX = (i: number) => PAD.left + (i / Math.max(points.length - 1, 1)) * plotW;
  const toY = (v: number) => PAD.top + plotH - ((v - yMin) / yRange) * plotH;

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(p.y)}`).join(' ');

  const gridLines = 4;
  const gridSteps = Array.from({ length: gridLines + 1 }, (_, i) => yMin + (yRange * i) / gridLines);

  return (
    <div className="w-full space-y-2">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 260 }}>
        {/* Grid */}
        {showGrid &&
          gridSteps.map((v) => (
            <g key={v}>
              <line x1={PAD.left} y1={toY(v)} x2={W - PAD.right} y2={toY(v)} stroke="#e5e7eb" strokeWidth={1} />
              <text x={PAD.left - 6} y={toY(v) + 4} textAnchor="end" className="fill-gray-400" fontSize={10}>
                {Math.round(v).toLocaleString()}
              </text>
            </g>
          ))}

        {/* Line */}
        <path d={pathD} fill="none" stroke={lineColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {showDots &&
          points.map((p, i) => (
            <circle key={i} cx={toX(i)} cy={toY(p.y)} r={3.5} fill={lineColor} stroke="white" strokeWidth={1.5} />
          ))}

        {/* X labels */}
        {points.map((p, i) => (
          <text key={i} x={toX(i)} y={H - 6} textAnchor="middle" className="fill-gray-500" fontSize={9}>
            {String(p.x)}
          </text>
        ))}

        {/* Axis labels */}
        {xLabel && (
          <text x={W / 2} y={H} textAnchor="middle" className="fill-gray-400" fontSize={10}>
            {xLabel}
          </text>
        )}
        {yLabel && (
          <text x={12} y={H / 2} textAnchor="middle" className="fill-gray-400" fontSize={10} transform={`rotate(-90, 12, ${H / 2})`}>
            {yLabel}
          </text>
        )}
      </svg>
    </div>
  );
}
