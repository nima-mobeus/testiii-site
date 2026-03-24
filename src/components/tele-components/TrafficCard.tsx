import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

const STATUS_CLR: Record<string, string> = {
    clear: '#22c55e', moderate: '#b45309', heavy: '#ff4040', severe: '#7f1d1d',
};

interface TrafficRoute {
    route: string;
    status: 'clear' | 'moderate' | 'heavy' | 'severe';
    eta?: string;
    delay?: string;
    detail?: string;
}

interface TrafficCardData {
    title?: string;
    routes: TrafficRoute[];
}

export default function TrafficCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, routes = [] } = data as TrafficCardData;
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 flex flex-col justify-start min-h-0 overflow-hidden gap-1 overflow-auto">
                {routes.map((r, i) => {
                    const clr = STATUS_CLR[r.status] || STATUS_CLR.moderate;
                    return (
                        <div key={i} className="flex items-center gap-2 p-1.5 rounded-sm border-l-2" style={{ backgroundColor: `${clr}08`, borderColor: clr }}>
                            <div className="flex-1 min-w-0">
                                <div className="font-data text-sm md:text-sm font-bold truncate" style={{ color: `${getColor(90)}` }}>{r.route}</div>
                                {r.detail && <div className="font-voice text-sm leading-tight mt-0.5" style={{ color: `${getColor(60)}` }}>{r.detail}</div>}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                {r.eta && <span className="font-data text-sm font-bold" style={{ color: `${getColor(90)}` }}>{r.eta}</span>}
                                {r.delay && <span className="font-data text-sm font-bold px-1 py-0.5 rounded-sm" style={{ backgroundColor: `${clr}20`, color: clr }}>{r.delay}</span>}
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: clr }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
