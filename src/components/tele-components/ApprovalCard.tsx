import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

const PRIORITY_DOT: Record<string, string> = {
    critical: '#ff4040',
    high: '#b45309',
    normal: '#1d4ed8',
    low: '#6b7280',
};

const STATUS_STYLE: Record<string, { label: string; bg: string; text: string }> = {
    pending: { label: 'Awaiting', bg: 'bg-amber-50', text: 'text-amber-800' },
    signed: { label: 'Signed', bg: 'bg-green-50', text: 'text-green-800' },
    rejected: { label: 'Rejected', bg: 'bg-red-50', text: 'text-red-800' },
    expired: { label: 'Expired', bg: 'bg-gray-100', text: 'text-gray-600' },
};

interface ApprovalItem {
    subject: string;
    from?: string;
    fromTitle?: string;
    priority?: 'critical' | 'high' | 'normal' | 'low';
    deadline?: string;
    status?: 'pending' | 'signed' | 'rejected' | 'expired';
    attachment?: boolean;
}

interface ApprovalCardData {
    title?: string;
    items: ApprovalItem[];
}

export default function ApprovalCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, items = [] } = data as ApprovalCardData;
    const { visible, overflow } = clampList(items, 4);
    const pending = items.filter(i => !i.status || i.status === 'pending').length;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                {title && (
                    <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em]" style={{ color: `${getColor(90)}` }}>
                        {title}
                    </h3>
                )}
                {pending > 0 && (
                    <span className="font-data text-sm md:text-sm bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
                        {pending} pending
                    </span>
                )}
            </div>

            {/* Items */}
            <div className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-hidden">
                {visible.map((item, i) => {
                    const dot = PRIORITY_DOT[item.priority || 'normal'];
                    const st = STATUS_STYLE[item.status || 'pending'];
                    return (
                        <div key={i} className="flex items-start gap-2 py-1 border-b" style={{ borderColor: `${getColor(6)}` }}>
                            <span className="w-2 h-2 rounded-full shrink-0 mt-1"
                                style={{
                                    backgroundColor: dot,
                                    ...(item.priority === 'critical' ? { animation: 'blink-dot 1.2s ease-in-out infinite' } : {}),
                                }} />
                            <div className="flex-1 min-w-0">
                                <div className="font-data text-sm md:text-sm font-bold leading-tight" style={{ color: C }}>
                                    {item.subject}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    {item.from && (
                                        <span className="font-voice text-sm" style={{ color: `${getColor(70)}` }}>
                                            From: {item.from}{item.fromTitle ? ` (${item.fromTitle})` : ''}
                                        </span>
                                    )}
                                    {item.deadline && (
                                        <span className="font-data text-sm" style={{ color: `${getColor(60)}` }}>
                                            ⏰ {item.deadline}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className={`font-data text-sm md:text-sm uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${st.bg} ${st.text}`}>
                                {st.label}
                            </span>
                        </div>
                    );
                })}
            </div>
            <OverflowPill count={overflow} label="more" />
        </div>
    );
}
