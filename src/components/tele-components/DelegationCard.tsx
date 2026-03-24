import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

const STATUS_STYLE: Record<string, { dot: string; label: string }> = {
    'in-progress': { dot: '#1d4ed8', label: 'In Progress' },
    'waiting': { dot: '#b45309', label: 'Waiting' },
    'complete': { dot: '#22c55e', label: 'Complete' },
    'blocked': { dot: '#ff4040', label: 'Blocked' },
    'overdue': { dot: '#ff4040', label: 'Overdue' },
};

interface DelegationItem {
    task: string;
    owner: string;
    ownerTitle?: string;
    status?: 'in-progress' | 'waiting' | 'complete' | 'blocked' | 'overdue';
    eta?: string;
    detail?: string;
}

interface DelegationCardData {
    title?: string;
    items: DelegationItem[];
}

export default function DelegationCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, items = [] } = data as DelegationCardData;
    const { visible, overflow } = clampList(items, 5);
    const active = items.filter(i => i.status !== 'complete').length;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                {title && (
                    <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em]" style={{ color: `${getColor(90)}` }}>
                        {title}
                    </h3>
                )}
                {active > 0 && (
                    <span className="font-data text-sm md:text-sm bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded-full font-bold">
                        {active} active
                    </span>
                )}
            </div>

            {/* Items */}
            <div className="flex flex-col gap-1 flex-1 min-h-0 overflow-hidden">
                {visible.map((item, i) => {
                    const st = STATUS_STYLE[item.status || 'in-progress'];
                    return (
                        <div key={i} className="flex items-start gap-2 py-1">
                            {/* Status dot */}
                            <span className="w-2 h-2 rounded-full shrink-0 mt-1"
                                style={{
                                    backgroundColor: st.dot,
                                    ...(item.status === 'overdue' ? { animation: 'blink-dot 1.2s ease-in-out infinite' } : {}),
                                }} />
                            <div className="flex-1 min-w-0">
                                {/* Task */}
                                <div className="font-data text-sm md:text-sm leading-tight" style={{
                                    color: item.status === 'complete' ? `${getColor(38)}` : C,
                                    textDecoration: item.status === 'complete' ? 'line-through' : 'none',
                                }}>
                                    {item.task}
                                </div>
                                {/* Owner + ETA row */}
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="font-voice text-sm" style={{ color: `${getColor(70)}` }}>
                                        → {item.owner}{item.ownerTitle ? ` (${item.ownerTitle})` : ''}
                                    </span>
                                    {item.eta && (
                                        <span className="font-data text-sm" style={{ color: `${getColor(60)}` }}>
                                            ETA: {item.eta}
                                        </span>
                                    )}
                                    <span className="font-data text-sm uppercase" style={{ color: st.dot }}>
                                        {st.label}
                                    </span>
                                </div>
                                {/* Optional detail */}
                                {item.detail && (
                                    <div className="font-voice text-sm leading-tight mt-0.5 line-clamp-1" style={{ color: `${getColor(60)}` }}>
                                        {item.detail}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <OverflowPill count={overflow} label="more" />

            {/* Footer summary */}
            <div className="font-data text-sm mt-2" style={{ color: `${getColor(70)}` }}>
                {items.filter(i => i.status === 'complete').length}/{items.length} complete
            </div>
        </div>
    );
}
