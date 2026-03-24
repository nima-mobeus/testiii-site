import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const REGION_CLR: Record<string, string> = {
    'north-america': C, 'china': '#ff4040', 'europe': '#1d4ed8',
    'india': '#b45309', 'southeast-asia': '#059669', 'middle-east': '#6d28d9',
    'latin-america': '#0891b2', 'africa': '#22c55e', 'oceania': '#9ca3af',
};

interface MapRegion {
    name: string;
    value: string;
    code?: string;
    color?: string;
    subtext?: string;
}

interface WorldMapCardData {
    title?: string;
    regions: MapRegion[];
}

export default function WorldMapCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, regions = [] } = data as WorldMapCardData;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-1.5 content-start overflow-auto">
                {regions.map((r, i) => {
                    const clr = r.color || REGION_CLR[r.code || ''] || `${getColor(88)}`;
                    return (
                        <div key={i} className="flex items-center gap-2 p-1.5 rounded-sm" style={{ backgroundColor: `${getColor(2)}`, borderLeft: `3px solid ${clr}` }}>
                            <div className="min-w-0">
                                <div className="font-data text-sm md:text-sm font-bold uppercase truncate" style={{ color: `${getColor(90)}` }}>{r.name}</div>
                                <div className="font-data text-sm md:text-sm font-bold" style={{ color: clr }}>{r.value}</div>
                                {r.subtext && <div className="font-data text-sm" style={{ color: `${getColor(70)}` }}>{r.subtext}</div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
