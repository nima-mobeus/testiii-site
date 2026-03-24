import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

interface Bar {
    label: string;
    value: number;
    previousValue?: number;
}

interface SceneBarChartData {
    title?: string;
    bars: Bar[];
    unit?: string;
}

export default function SceneBarChart({ data, accentColor, onAction }: TeleComponentProps) {
    const raw = data as Record<string, any>;
    const title = raw.title as string | undefined;
    const unit = raw.unit as string | undefined;
    // Accept both {bars: [{label, value}]} and {categories: [...], values: [...]} formats
    let bars: Bar[] = [];
    if (Array.isArray(raw.bars)) {
        bars = raw.bars;
    } else if (Array.isArray(raw.categories) && Array.isArray(raw.values)) {
        bars = raw.categories.map((cat: string, i: number) => ({
            label: cat,
            value: raw.values[i] ?? 0,
            previousValue: raw.previousValues?.[i],
        }));
    }
    const { visible, overflow } = clampList(bars, 6);
    const max = Math.max(...bars.map(b => b.value ?? 0), 1);

    const fmt = (n: number) => {
        if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
        if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
        return n.toLocaleString();
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && (
                <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>
                    {title}
                </h3>
            )}
            <div className="flex flex-col gap-1 flex-1 justify-center min-h-0 overflow-hidden">
                {visible.map((bar, i) => {
                    const pct = (bar.value / max) * 100;
                    const delta = bar.previousValue ? bar.value - bar.previousValue : null;
                    return (
                        <div key={i} className="flex items-center gap-1.5">
                            <span className="font-data text-sm md:text-sm w-14 sm:w-16 text-left truncate font-bold" style={{ color: `${getColor(85)}` }}>
                                {bar.label}
                            </span>
                            <div className="flex-1 h-3 rounded-sm overflow-hidden" style={{ backgroundColor: `${getColor(5)}` }}>
                                <div
                                    className="h-full rounded-sm transition-all duration-700"
                                    style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${getColor(88)}, ${getColor(56)})` }}
                                />
                            </div>
                            <span className="font-data text-sm font-bold min-w-[36px] sm:min-w-[48px] text-right" style={{ color: `${getColor(90)}` }}>
                                {fmt(bar.value)}{unit ? ` ${unit}` : ''}
                            </span>
                            {delta !== null && delta !== 0 && (
                                <span className="font-data text-sm font-bold min-w-[32px] sm:min-w-[40px]" style={{ color: delta > 0 ? '#22c55e' : '#ff4040' }}>
                                    {delta > 0 ? '+' : ''}{fmt(delta)}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
            <OverflowPill count={overflow} label="more" />
        </div>
    );
}
