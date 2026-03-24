import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

const STATUS_DOT: Record<string, string> = {
    good: '#22c55e', bad: '#ff4040', watch: '#b45309',
};

interface MetricItem {
    label: string;
    value: string;
    status?: 'good' | 'bad' | 'watch';
    change?: string;
}

interface MetricListData {
    title?: string;
    items: MetricItem[];
}

export default function MetricList({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, items = [] } = data as MetricListData;
    const { visible, overflow } = clampList(items, 6);
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && (
                <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>
                    {title}
                </h3>
            )}
            <div className="flex flex-col gap-1 flex-1 justify-start min-h-0 overflow-hidden">
                {visible.map((m, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                            {m.status && (
                                <span className="w-2 h-2 rounded-full shrink-0"
                                    style={{
                                        backgroundColor: STATUS_DOT[m.status] || STATUS_DOT.good,
                                        ...(m.status === 'bad' ? { animation: 'blink-dot 1.2s ease-in-out infinite' } : {}),
                                    }} />
                            )}
                            <span className="font-data text-sm md:text-sm uppercase tracking-wider font-bold truncate" style={{ color: `${getColor(88)}` }}>
                                {m.label}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="font-data text-sm md:text-base font-bold" style={{ color: `${getColor(90)}` }}>
                                {m.value}
                            </span>
                            {m.change && (
                                <span className="font-data text-sm font-bold" style={{ color: `${getColor(85)}` }}>
                                    {m.change}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <OverflowPill count={overflow} label="more" />
        </div>
    );
}
