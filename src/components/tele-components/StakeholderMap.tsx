import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

interface Stakeholder { name: string; role: string; stake?: string; change?: string; }

interface StakeholderMapData {
    title?: string;
    stakeholders: Stakeholder[];
}

export default function StakeholderMap({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, stakeholders = [] } = data as StakeholderMapData;
    const { visible, overflow } = clampList(stakeholders, 4);
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 flex flex-col justify-start min-h-0 overflow-hidden overflow-auto space-y-1">
                {visible.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 py-1 border-b" style={{ borderColor: `${getColor(6)}` }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${getColor(7)}` }}>
                            <span className="font-data text-sm font-bold" style={{ color: `${getColor(90)}` }}>{s.name?.[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-data text-sm md:text-sm font-bold truncate" style={{ color: `${getColor(90)}` }}>{s.name ?? ''}</div>
                            <div className="font-data text-sm md:text-sm uppercase tracking-wider" style={{ color: `${getColor(70)}` }}>{s.role ?? ''}</div>
                        </div>
                        {s.stake && <span className="font-data text-sm font-bold shrink-0" style={{ color: `${getColor(90)}` }}>{s.stake}</span>}
                        {s.change && (
                            <span className="font-data text-sm font-bold shrink-0" style={{ color: s.change.startsWith('+') ? '#22c55e' : s.change.startsWith('-') ? '#ff4040' : `${getColor(60)}` }}>
                                {s.change}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <OverflowPill count={overflow} label="more" />
        </div>
    );
}
