import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

interface OrgMember { name: string; role: string; badge?: string; }

interface OrgRosterData {
    title?: string;
    members?: OrgMember[];
    profiles?: OrgMember[]; // alias — tele sometimes sends this instead of members
}

export default function OrgRoster({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, members, profiles } = data as OrgRosterData;
    const items = members || profiles || [];
    const { visible, overflow } = clampList(items, 6);
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2 shrink-0" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 grid grid-cols-3 gap-2 content-center overflow-hidden">
                {visible.map((m, i) => {
                    const firstName = (m.name || '').split(' ')[0];
                    const shortRole = (m.role || '').length > 22 ? (m.role || '').slice(0, 20) + '…' : (m.role || '');
                    return (
                        <div key={i} className="flex flex-col items-center text-center gap-1 min-w-0 p-2 rounded-lg" style={{ backgroundColor: `${getColor(2)}` }}>
                            {/* First name as badge */}
                            <span className="font-data text-sm font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: `${getColor(6)}`, color: `${getColor(90)}` }}>
                                {firstName}
                            </span>
                            {/* Role */}
                            <div className="font-data text-sm leading-tight truncate w-full" style={{ color: `${getColor(50)}` }}>
                                {shortRole}
                            </div>
                            {/* Badge (metric) */}
                            {m.badge && (
                                <span className="font-data text-sm whitespace-nowrap" style={{ color: `${getColor(40)}` }}>
                                    {m.badge}
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
