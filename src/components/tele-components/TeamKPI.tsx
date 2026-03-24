import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const STATUS_DOT: Record<string, string> = { good: '#22c55e', bad: '#ff4040', watch: '#b45309' };

interface TeamKPIItem { label: string; value: string; status?: string; change?: string; }

interface TeamKPIData {
    teamName: string;
    teamLead?: string;
    kpis: TeamKPIItem[];
}

export default function TeamKPI({ data, accentColor, onAction }: TeleComponentProps) {
    const { teamName, teamLead, kpis = [] } = data as TeamKPIData;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getColor(8)}` }}>
                    <span className="font-data text-[11px] font-bold" style={{ color: `${getColor(90)}` }}>{teamName?.[0]}</span>
                </div>
                <div>
                    <div className="font-data text-sm md:text-sm font-bold" style={{ color: `${getColor(90)}` }}>{teamName ?? ''}</div>
                    {teamLead && <div className="font-data text-sm uppercase tracking-wider" style={{ color: `${getColor(70)}` }}>Lead: {teamLead}</div>}
                </div>
            </div>
            <div className="flex-1 space-y-1.5">
                {kpis.map((k, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b" style={{ borderColor: `${getColor(4)}` }}>
                        <div className="flex items-center gap-1.5">
                            {k.status && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_DOT[k.status] || `${getColor(25)}` }} />}
                            <span className="font-data text-sm md:text-sm" style={{ color: `${getColor(88)}` }}>{k.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-data text-sm md:text-sm font-bold" style={{ color: `${getColor(90)}` }}>{k.value}</span>
                            {k.change && <span className="font-data text-sm font-bold" style={{ color: k.change.startsWith('+') ? '#22c55e' : '#ff4040' }}>{k.change}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
