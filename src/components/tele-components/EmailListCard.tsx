/**
 * EmailListCard — Up to 3 emails stacked for GridView
 * All Lucide line icons, zero emojis.
 */

import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

const PRIORITY_COLOR: Record<string, string> = {
    critical: '#ef4444',
    high: '#f59e0b',
    normal: '#94a3b8',
    low: '#60a5fa',
};

interface EmailItem {
    from: string;
    fromTitle?: string;
    subject: string;
    time?: string;
    priority?: 'critical' | 'high' | 'normal' | 'low';
    unread?: boolean;
    replyNeeded?: boolean;
}

interface EmailListCardData {
    title?: string;
    emails?: EmailItem[];
}

export default function EmailListCard({ data, accentColor, onAction }: TeleComponentProps) {
    const {
        title,
        emails = [],
    } = data as EmailListCardData;
    const items = emails.slice(0, 3);

    return (
        <div className="flex flex-col h-full justify-start gap-2">
            {title && (
                <h3 className="flex items-center gap-1.5 font-data text-sm md:text-sm tracking-[0.15em] uppercase font-semibold" style={{ color: `${getColor(60)}` }}>
                    <Mail size={12} /> {title}
                </h3>
            )}
            <div className="flex-1 flex flex-col justify-start min-h-0 overflow-hidden gap-1.5">
                {items.map((email, i) => (
                    <div key={i} className="flex items-start gap-2 py-1.5 border-b" style={{ borderColor: `${getColor(4)}` }}>
                        <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: PRIORITY_COLOR[email.priority || 'normal'] }} />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-1.5">
                                <span className={`font-data text-sm md:text-[11px] tracking-wide truncate ${email.unread ? 'font-bold' : ''}`} style={{ color: `${getColor(88)}` }}>{email.from}</span>
                                {email.fromTitle && (
                                    <span className="font-data text-sm tracking-wider uppercase hidden md:inline" style={{ color: `${getColor(25)}` }}>{email.fromTitle}</span>
                                )}
                            </div>
                            <div className="font-voice text-sm md:text-sm truncate leading-snug" style={{ color: `${getColor(44)}` }}>{email.subject}</div>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-0.5">
                            {email.time && (
                                <span className="font-data text-sm tracking-wider" style={{ color: `${getColor(21)}` }}>{email.time}</span>
                            )}
                            {email.replyNeeded && (
                                <span className="flex items-center gap-0.5 font-data text-sm tracking-wider uppercase px-1 py-0.5 rounded-full" style={{ color: '#ef4444', border: '1px solid #ef444425' }}>
                                    <ArrowUpRight size={7} /> Reply
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
