import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const STATUS_CLR: Record<string, string> = { good: '#22c55e', bad: '#ff4040', watch: '#b45309' };

interface GaugeCardData {
  title?: string;
  value: number;
  max?: number;
  unit?: string;
  status?: 'good' | 'bad' | 'watch';
  label?: string;
}

export default function GaugeCard({ data }: TeleComponentProps) {
  const { title, value = 0, max = 100, unit = '%', status, label } = data as GaugeCardData;
  const pct = Math.min((value ?? 0) / (max || 100), 1);
  const angle = pct * 180;
  const R = 60;
  const cx = 80; const cy = 72;
  const startX = cx - R;
  const endX = cx + R * Math.cos(Math.PI - angle * Math.PI / 180);
  const endY = cy - R * Math.sin(angle * Math.PI / 180);
  const largeArc = angle > 180 ? 1 : 0;
  const fillColor = status ? STATUS_CLR[status] || C : C;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {title && (
        <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-1" style={{ color: getColor(90) }}>{title}</h3>
      )}
      <svg viewBox="0 0 160 90" className="w-full max-w-[200px]">
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke={getColor(8)} strokeWidth={10} strokeLinecap="round" />
        {pct > 0 && (
          <path d={`M ${startX} ${cy} A ${R} ${R} 0 ${largeArc} 1 ${endX} ${endY}`} fill="none" stroke={fillColor} strokeWidth={10} strokeLinecap="round" />
        )}
        <text x={cx} y={cy - 8} textAnchor="middle" className="font-hero" fontSize={22} fill={getColor(90)}>
          {value}{unit}
        </text>
        {label && (
          <text x={cx} y={cy + 8} textAnchor="middle" className="font-data" fontSize={8} fill={getColor(85)}>{label}</text>
        )}
      </svg>
    </div>
  );
}
