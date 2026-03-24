/**
 * EmailCard — Single email summary for GridView
 * All Lucide line icons, zero emojis.
 */

import React from 'react';
import { Paperclip, ArrowUpRight } from 'lucide-react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

const PRIORITY_COLOR: Record<string, string> = {
    critical: '#ef4444',
    high: '#f59e0b',
    normal: '#94a3b8',
    low: '#60a5fa',
};

interface EmailCardData {
    from: string;
    fromTitle?: string;
    fromCompany?: string;
    subject: string;
    snippet?: string;
    time?: string;
    priority?: 'critical' | 'high' | 'normal' | 'low';
    unread?: boolean;
    hasAttachment?: boolean;
    replyNeeded?: boolean;
}

export default function EmailCard({ data, accentColor, onAction }: TeleComponentProps) {
    const {
        from,
        fromTitle,
        fromCompany,
        subject,
        snippet,
        time,
        priority = 'normal',
        unread,
        hasAttachment,
        replyNeeded,
    } = data as EmailCardData;
    const dotColor = PRIORITY_COLOR[priority] || PRIORITY_COLOR.normal;

    return (
        <div className="flex flex-col h-full justify-start gap-1.5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
                    {replyNeeded && (
                        <span className="flex items-center gap-0.5 font-data text-sm tracking-wider uppercase px-1.5 py-0.5 rounded-full" style={{ color: '#ef4444', border: '1px solid #ef444433' }}>
                            <ArrowUpRight size={8} /> Reply
                        </span>
                    )}
                    {hasAttachment && <Paperclip size={10} color={`${getColor(25)}`} />}
                </div>
                {time && (
                    <span className="font-data text-sm tracking-wider" style={{ color: `${getColor(25)}` }}>{time}</span>
                )}
            </div>
            <div className="flex items-baseline gap-1.5">
                <span className={`font-data text-sm md:text-sm tracking-wide ${unread ? 'font-bold' : ''}`} style={{ color: `${getColor(90)}` }}>{from}</span>
                {fromTitle && (
                    <span className="font-data text-sm tracking-wider uppercase" style={{ color: `${getColor(25)}` }}>{fromTitle}</span>
                )}
            </div>
            <h3 className={`font-data text-[11px] md:text-sm leading-tight ${unread ? 'font-semibold' : ''}`} style={{ color: `${getColor(85)}` }}>{subject}</h3>
            {snippet && (
                <p className="font-voice text-sm md:text-sm leading-relaxed line-clamp-2" style={{ color: `${getColor(38)}` }}>{snippet}</p>
            )}
            {fromCompany && (
                <div className="font-data text-sm tracking-wider uppercase mt-auto" style={{ color: `${getColor(19)}` }}>{fromCompany}</div>
            )}
        </div>
    );
}
