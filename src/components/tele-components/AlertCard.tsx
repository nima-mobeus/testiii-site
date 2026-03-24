import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

const SEVERITY_STYLE: Record<string, { dot: string; border: string }> = {
    critical: { dot: '#ff4040', border: 'border-l-[#ff4040]' },
    warning: { dot: '#f59e0b', border: 'border-l-[#f59e0b]' },
    info: { dot: '#38bdf8', border: 'border-l-[#38bdf8]' },
};

interface Alert {
    severity: 'critical' | 'warning' | 'info';
    title: string;
    detail: string;
}

interface AlertCardData {
    title?: string;
    alerts: Alert[];
}

export default function AlertCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, alerts = [] } = data as AlertCardData;
    const { visible, overflow } = clampList(alerts, 3);

    // Compute badge text based on highest severity
    const critCount = alerts.filter(a => a.severity === 'critical').length;
    const warnCount = alerts.filter(a => a.severity === 'warning').length;
    const badgeText = critCount > 0
        ? `${critCount} CRITICAL`
        : warnCount > 0
            ? `${warnCount} WARNING`
            : `${alerts.length} ALERT${alerts.length !== 1 ? 'S' : ''}`;
    const badgeBg = critCount > 0 ? '#ff4040' : warnCount > 0 ? '#f59e0b' : '#38bdf8';

    return (
        <div className="flex flex-col h-full overflow-hidden relative">
            {/* Severity badge — top-0 right-0 is the actual card corner since we render flush (no card-glass padding) */}
            <span
                className="absolute top-0 right-0 font-data text-sm font-bold uppercase tracking-wider text-white px-2 py-0.5 z-10"
                style={{
                    backgroundColor: badgeBg,
                    borderRadius: '0 0.75rem 0 0.5rem',
                }}
            >
                {badgeText}
            </span>

            {/* Content with its own padding */}
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden p-4">
                {title && (
                    <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2 pr-16" style={{ color: `${getColor(90)}` }}>{title}</h3>
                )}
                <div className="flex flex-col gap-1 flex-1 justify-start min-h-0 overflow-hidden">
                    {visible.map((a, i) => {
                        const sev = SEVERITY_STYLE[a.severity] || SEVERITY_STYLE.info;
                        return (
                            <div key={i}
                                className={`flex items-start gap-2 border-l-2 pl-2 py-1 ${sev.border}`}
                            >
                                <span className="w-2 h-2 rounded-full shrink-0 mt-0.5"
                                    style={{
                                        backgroundColor: sev.dot,
                                        ...(a.severity === 'critical' ? { animation: 'blink-dot 1.2s ease-in-out infinite' } : {}),
                                    }} />
                                <div className="min-w-0">
                                    <div className="font-data text-sm md:text-sm font-bold uppercase tracking-wider leading-tight" style={{ color: sev.dot }}>
                                        {a.title}
                                    </div>
                                    <div className="font-voice text-sm md:text-[11px] leading-tight mt-0.5 line-clamp-2" style={{ color: 'var(--theme-card-data)' }}>
                                        {a.detail}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <OverflowPill count={overflow} label="more" />
            </div>
        </div>
    );
}
