import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

interface ProfileSide { name: string; title?: string; metrics: { label: string; value: string }[]; }

interface ComparisonProfileData {
    title?: string;
    left: ProfileSide;
    right: ProfileSide;
}

export default function ComparisonProfile({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, left, right } = data as ComparisonProfileData;
    if (!left || !right) return null;
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
                {[left, right].map((side, si) => (
                    <div key={si} className="flex flex-col items-center gap-2 p-2 rounded-sm" style={{ backgroundColor: `${getColor(2)}` }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getColor(8)}` }}>
                            <span className="font-data text-sm font-bold" style={{ color: `${getColor(90)}` }}>{side.name?.[0]}</span>
                        </div>
                        <div className="text-center">
                            <div className="font-data text-sm font-bold" style={{ color: `${getColor(90)}` }}>{side.name ?? ''}</div>
                            {side.title && <div className="font-data text-sm uppercase" style={{ color: `${getColor(85)}` }}>{side.title}</div>}
                        </div>
                        <div className="w-full space-y-1">
                            {(side.metrics || []).map((m, mi) => (
                                <div key={mi} className="flex justify-between">
                                    <span className="font-data text-sm" style={{ color: `${getColor(85)}` }}>{m.label}</span>
                                    <span className="font-data text-sm font-bold" style={{ color: `${getColor(90)}` }}>{m.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
