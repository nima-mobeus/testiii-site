import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const CLUSTER_COLORS = [C, '#1d4ed8', '#22c55e', '#b45309', '#ff4040', '#6d28d9'];

interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
  cluster?: number;
  size?: number;
}

interface ScatterPlotData {
  title?: string;
  points: ScatterPoint[];
  xLabel?: string;
  yLabel?: string;
}

export default function ScatterPlot({ data }: TeleComponentProps) {
  const { title, points = [], xLabel, yLabel } = data as ScatterPlotData;
  if (points.length === 0) return null;
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const xMin = Math.min(...xs); const xMax = Math.max(...xs);
  const yMin = Math.min(...ys); const yMax = Math.max(...ys);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;
  const W = 280; const H = 140; const PAD = 24;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {title && (
        <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: getColor(90) }}>{title}</h3>
      )}
      <div className="flex-1 flex items-center min-h-0 overflow-hidden justify-center">
        <svg viewBox={`0 0 ${W + PAD * 2} ${H + PAD * 2}`} className="w-full h-full max-h-full" preserveAspectRatio="xMidYMid meet">
          <line x1={PAD} y1={H + PAD} x2={W + PAD} y2={H + PAD} stroke={getColor(19)} strokeWidth={1} />
          <line x1={PAD} y1={PAD} x2={PAD} y2={H + PAD} stroke={getColor(19)} strokeWidth={1} />
          {xLabel && <text x={W / 2 + PAD} y={H + PAD + 16} textAnchor="middle" className="font-data" fontSize={8} fill={getColor(70)}>{xLabel}</text>}
          {yLabel && <text x={6} y={H / 2 + PAD} textAnchor="middle" className="font-data" fontSize={8} fill={getColor(70)} transform={`rotate(-90, 6, ${H / 2 + PAD})`}>{yLabel}</text>}
          {points.map((p, i) => {
            const cx = PAD + ((p.x - xMin) / xRange) * W;
            const cy = PAD + H - ((p.y - yMin) / yRange) * H;
            const r = p.size || 4;
            const fill = CLUSTER_COLORS[(p.cluster || 0) % CLUSTER_COLORS.length];
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r} fill={fill} opacity={0.8} />
                {p.label && <text x={cx + r + 2} y={cy + 3} className="font-data" fontSize={7} fill={getColor(88)}>{p.label}</text>}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
