import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const STATUS_DOT: Record<string, string> = { good: '#22c55e', bad: '#ff4040', watch: '#b45309' };

interface MiniMetric { label: string; value: string; trend?: 'up' | 'down'; status?: string; }

interface MiniDashboardCardData {
    title?: string;
    metrics: MiniMetric[];
    sparkline?: number[];
}

export default function MiniDashboardCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, metrics = [], sparkline } = data as MiniDashboardCardData;
    const W = 80; const H = 24;
    let sparkPath = '';
    if (sparkline && sparkline.length > 1) {
        const max = Math.max(...sparkline); const min = Math.min(...sparkline); const range = max - min || 1;
        sparkPath = sparkline.map((v, i) => {
            const x = (i / (sparkline.length - 1)) * W;
            const y = H - ((v - min) / range) * H;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 flex flex-col gap-1 justify-start">
                <div className="grid grid-cols-2 gap-1.5">
                    {metrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            {m.status && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: STATUS_DOT[m.status] || `${getColor(25)}` }} />}
                            <div className="min-w-0">
                                <div className="font-data text-sm uppercase truncate" style={{ color: `${getColor(85)}` }}>{m.label}</div>
                                <div className="font-data text-[11px] md:text-sm font-bold" style={{ color: `${getColor(90)}` }}>
                                    {m.value}
                                    {m.trend && <span className="text-sm ml-0.5" style={{ color: m.trend === 'up' ? '#22c55e' : '#ff4040' }}>{m.trend === 'up' ? '▲' : '▼'}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {sparkPath && (
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-6" preserveAspectRatio="none">
                        <path d={sparkPath} fill="none" stroke={`${getColor(88)}`} strokeWidth={1.5} opacity={0.4} />
                    </svg>
                )}
            </div>
        </div>
    );
}
