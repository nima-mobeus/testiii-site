import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const STATUS_DOT: Record<string, string> = {
    good: '#22c55e', bad: '#ff4040', watch: '#b45309',
};
const TREND_ARROW: Record<string, string> = { up: '▲', down: '▼', flat: '—' };
const TREND_CLR: Record<string, string> = { up: '#22c55e', down: '#ff4040', flat: '#6b7280' };

interface StatCardData {
    label: string;
    value: string;
    subtitle?: string;
    trend?: 'up' | 'down' | 'flat';
    change?: string;
    status?: 'good' | 'bad' | 'watch';
}

export default function StatCard({ data, accentColor, onAction }: TeleComponentProps) {
    const raw = data as Record<string, any>;
    const label = raw.label || raw.title || '';
    const value = raw.value || '';
    const subtitle = raw.subtitle || raw.unit || undefined;
    const trend = raw.trend as StatCardData['trend'];
    const change = raw.change as string | undefined;
    const status = raw.status as StatCardData['status'];
    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-1">
            <div className="flex items-center gap-1.5">
                {status && (
                    <span className="w-2.5 h-2.5 rounded-full"
                        style={{
                            backgroundColor: STATUS_DOT[status] || STATUS_DOT.good,
                            ...(status === 'bad' ? { animation: 'blink-dot 1.2s ease-in-out infinite' } : {}),
                        }} />
                )}
                <span className="font-data text-sm md:text-sm uppercase tracking-[0.15em]" style={{ color: `${getColor(70)}` }}>
                    {label}
                </span>
            </div>
            <div className="font-hero text-3xl md:text-4xl lg:text-5xl leading-none" style={{ color: `${getColor(90)}` }}>
                {value}
            </div>
            {subtitle && (
                <p className="font-voice text-sm md:text-sm leading-tight mt-1 line-clamp-2" style={{ color: `${getColor(70)}` }}>
                    {subtitle}
                </p>
            )}
            {trend && change && (
                <div className="font-data text-sm font-semibold mt-0.5" style={{ color: TREND_CLR[trend] }}>
                    {TREND_ARROW[trend]} {change}
                </div>
            )}
        </div>
    );
}
