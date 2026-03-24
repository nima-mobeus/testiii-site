import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const TREND_CLR: Record<string, string> = { up: '#22c55e', down: '#ff4040', flat: '#6b7280' };
const TREND_ARROW: Record<string, string> = { up: '▲', down: '▼', flat: '—' };

interface SplitStatData {
    leftLabel: string;
    leftValue: string;
    rightLabel: string;
    rightValue: string;
    comparison?: string;
    trend?: 'up' | 'down' | 'flat';
}

export default function SplitStat({ data, accentColor, onAction }: TeleComponentProps) {
    const { leftLabel, leftValue, rightLabel, rightValue, comparison, trend } = data as SplitStatData;
    return (
        <div className="flex flex-col h-full justify-center gap-1.5">
            <div className="flex items-stretch gap-3">
                <div className="flex-1 text-center">
                    <div className="font-data text-sm md:text-sm uppercase tracking-wider" style={{ color: `${getColor(70)}` }}>{leftLabel}</div>
                    <div className="font-hero text-2xl md:text-3xl leading-none mt-1" style={{ color: `${getColor(90)}` }}>{leftValue}</div>
                </div>
                <div className="w-px self-stretch" style={{ backgroundColor: `${getColor(13)}` }} />
                <div className="flex-1 text-center">
                    <div className="font-data text-sm md:text-sm uppercase tracking-wider" style={{ color: `${getColor(70)}` }}>{rightLabel}</div>
                    <div className="font-hero text-2xl md:text-3xl leading-none mt-1" style={{ color: `${getColor(90)}` }}>{rightValue}</div>
                </div>
            </div>
            {comparison && (
                <div className="text-center font-data text-sm md:text-sm font-bold" style={{ color: trend ? TREND_CLR[trend] : `${getColor(70)}` }}>
                    {trend && TREND_ARROW[trend]} {comparison}
                </div>
            )}
        </div>
    );
}
