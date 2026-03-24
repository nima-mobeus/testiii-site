import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const STATUS_CLR: Record<string, { bg: string; dot: string }> = {
    green: { bg: '#0a7c4215', dot: '#22c55e' }, red: { bg: '#b91c1c15', dot: '#ff4040' },
    yellow: { bg: '#b4530915', dot: '#b45309' }, gray: { bg: `${getColor(3)}`, dot: `${getColor(25)}` },
};

interface StatusItem { label: string; status: 'green' | 'red' | 'yellow' | 'gray'; detail?: string; }

interface StatusGridCardData {
    title?: string;
    items: StatusItem[];
}

export default function StatusGridCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, items = [] } = data as StatusGridCardData;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-1.5 content-center overflow-auto">
                {items.map((item, i) => {
                    const st = STATUS_CLR[item.status] || STATUS_CLR.gray;
                    return (
                        <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 rounded-sm" style={{ backgroundColor: st.bg }}>
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: st.dot, ...(item.status === 'red' ? { animation: 'blink-dot 1.2s ease-in-out infinite' } : {}) }} />
                            <div className="min-w-0">
                                <div className="font-data text-sm md:text-sm font-bold truncate" style={{ color: `${getColor(90)}` }}>{item.label}</div>
                                {item.detail && <div className="font-data text-sm truncate" style={{ color: `${getColor(70)}` }}>{item.detail}</div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
