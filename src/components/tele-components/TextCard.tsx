import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

interface TextCardData {
    title?: string;
    body?: string;
    bullets?: string[];
}

export default function TextCard({ data, accentColor, onAction }: TeleComponentProps) {
    const raw = data as Record<string, any>;
    const title = raw.title as string | undefined;
    const body = (raw.body || raw.text || raw.content) as string | undefined;
    const bullets = (raw.bullets || raw.items) as string[] | undefined;
    const { visible: visibleBullets, overflow } = clampList(bullets || [], 5);
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && (
                <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>
                    {title}
                </h3>
            )}
            <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
                {body && (
                    <p className="font-voice text-sm md:text-base leading-relaxed line-clamp-4" style={{ color: `${getColor(70)}` }}>
                        {body}
                    </p>
                )}
                {visibleBullets.length > 0 && (
                    <ul className={`space-y-1.5 ${body ? 'mt-3' : ''}`}>
                        {visibleBullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: `${getColor(25)}` }} />
                                <span className="font-voice text-sm md:text-sm leading-snug" style={{ color: `${getColor(88)}` }}>
                                    {b}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <OverflowPill count={overflow} label="more" />
        </div>
    );
}
