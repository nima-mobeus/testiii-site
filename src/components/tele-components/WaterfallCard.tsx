import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

interface WaterfallSegment {
    label: string;
    value: number;
    isTotal?: boolean;
}

interface WaterfallCardData {
    title?: string;
    segments: WaterfallSegment[];
    unit?: string;
}

export default function WaterfallCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, segments = [], unit = '' } = data as WaterfallCardData;
    if (segments.length === 0) return null;
    const fmt = (n: number) => {
        const abs = Math.abs(n);
        if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
        if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
        if (abs >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
        return n.toString();
    };

    let running = 0;
    const items = segments.map(s => {
        if (s.isTotal) {
            const base = 0;
            const height = running;
            return { ...s, base, height, running };
        }
        const base = running;
        running += s.value;
        return { ...s, base, height: s.value, running };
    });

    const allValues = items.map(i => [i.base, i.base + i.height]).flat();
    const minV = Math.min(0, ...allValues);
    const maxV = Math.max(...allValues);
    const range = maxV - minV || 1;
    const chartH = 120;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && (
                <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>
            )}
            <div className="flex-1 flex items-end gap-1 min-h-0">
                {items.map((item, i) => {
                    const barH = Math.abs(item.height / range) * chartH;
                    const bottom = ((item.height >= 0 ? item.base : item.base + item.height) - minV) / range * chartH;
                    const isPositive = item.height >= 0;
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center relative" style={{ height: chartH }}>
                            <div
                                className="w-full max-w-[40px] rounded-sm absolute"
                                style={{
                                    height: Math.max(barH, 4),
                                    bottom,
                                    backgroundColor: item.isTotal ? C : isPositive ? '#22c55e' : '#ff4040',
                                    opacity: item.isTotal ? 1 : 0.85,
                                }}
                            />
                            <div className="absolute -bottom-4 w-full text-center">
                                <span className="font-data text-sm md:text-sm uppercase" style={{ color: `${getColor(70)}` }}>{item.label}</span>
                            </div>
                            <div className="absolute w-full text-center" style={{ bottom: bottom + barH + 2 }}>
                                <span className="font-data text-sm font-bold" style={{ color: item.isTotal ? C : isPositive ? '#22c55e' : '#ff4040' }}>
                                    {unit}{fmt(item.height)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="h-4" />
        </div>
    );
}
