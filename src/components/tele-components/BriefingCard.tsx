import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

interface BriefingCardData {
    title: string;
    subtitle?: string;
    body: string;
    cta?: string;
    ctaPhrase?: string;
}

export default function BriefingCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, subtitle, body, cta, ctaPhrase } = data as BriefingCardData;

    return (
        <div className="flex flex-col h-full overflow-hidden justify-center gap-2 px-2">
            {/* Title */}
            <h3 className="font-hero text-lg md:text-xl lg:text-2xl leading-snug line-clamp-2" style={{ color: C }}>
                {title}
            </h3>

            {/* Subtitle / To line */}
            {subtitle && (
                <div className="font-data text-sm md:text-sm uppercase tracking-[0.15em]" style={{ color: `${getColor(70)}` }}>
                    {subtitle}
                </div>
            )}

            {/* Body text — full paragraph style */}
            <p className="font-voice text-sm md:text-sm leading-relaxed whitespace-pre-line line-clamp-4" style={{ color: `${getColor(88)}` }}>
                {body}
            </p>

            {/* CTA button */}
            {cta && (
                <button
                    className="self-start font-data text-sm md:text-sm uppercase tracking-wider px-4 py-2 rounded-sm transition-colors mt-1"
                    style={{ backgroundColor: `${getColor(4)}`, color: `${getColor(90)}`, border: `1px solid ${getColor(13)}` }}
                >
                    {cta}
                </button>
            )}
        </div>
    );
}
