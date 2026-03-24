import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const SENT_CLR: Record<string, string> = { positive: '#22c55e', negative: '#ff4040', neutral: '#6b7280' };

interface NewsItem {
    headline: string;
    source?: string;
    time?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
    url?: string;
}

interface NewsFeedCardData {
    title?: string;
    articles: NewsItem[];
}

export default function NewsFeedCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, articles = [] } = data as NewsFeedCardData;
    const { visible, overflow } = clampList(articles, 4);
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 flex flex-col justify-start min-h-0 overflow-hidden gap-1 overflow-auto">
                {visible.map((a, i) => (
                    <div key={i} className="flex items-start gap-2 p-1.5 rounded-sm border-b" style={{ borderColor: `${getColor(4)}` }}>
                        {a.sentiment && (
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: SENT_CLR[a.sentiment] || SENT_CLR.neutral }} />
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="font-data text-sm md:text-sm font-bold leading-tight" style={{ color: `${getColor(90)}` }}>{a.headline}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                                {a.source && <span className="font-data text-sm uppercase" style={{ color: `${getColor(60)}` }}>{a.source}</span>}
                                {a.time && <span className="font-data text-sm" style={{ color: `${getColor(38)}` }}>{a.time}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <OverflowPill count={overflow} label="articles" />
        </div>
    );
}
