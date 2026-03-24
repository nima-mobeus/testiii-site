import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const TREND_CLR: Record<string, string> = { up: '#22c55e', down: '#ff4040', flat: '#6b7280' };

interface ClusterMetric { label: string; value: string; trend?: 'up' | 'down' | 'flat'; change?: string; }

interface DataClusterCardData {
    title?: string;
    metrics: ClusterMetric[];
}

export default function DataClusterCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, metrics = [] } = data as DataClusterCardData;
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-2 content-center">
                {metrics.map((m, i) => (
                    <div key={i} className="text-center p-1.5 rounded-sm" style={{ backgroundColor: `${getColor(2)}` }}>
                        <div className="font-data text-sm md:text-sm uppercase tracking-wider" style={{ color: `${getColor(85)}` }}>{m.label}</div>
                        <div className="font-hero text-base md:text-lg leading-tight" style={{ color: `${getColor(90)}` }}>{m.value}</div>
                        {m.trend && m.change && (
                            <div className="font-data text-sm md:text-sm font-bold" style={{ color: TREND_CLR[m.trend] }}>
                                {m.trend === 'up' ? '▲' : m.trend === 'down' ? '▼' : '—'} {m.change}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
