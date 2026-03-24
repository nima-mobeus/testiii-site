import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

interface QuoteCardData {
    quote: string;
    speaker?: string;
    role?: string;
    date?: string;
}

export default function QuoteCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { quote, speaker, role, date } = data as QuoteCardData;

    return (
        <div className="flex flex-col justify-center h-full overflow-hidden gap-2 px-2">
            <div className="font-hero text-3xl leading-none" style={{ color: `${getColor(13)}` }}>&quot;</div>
            <p className="font-voice text-sm md:text-sm leading-relaxed italic line-clamp-4 -mt-2" style={{ color: `${getColor(70)}` }}>{quote}</p>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getColor(8)}` }}>
                    <span className="font-data text-sm font-bold" style={{ color: `${getColor(90)}` }}>{speaker?.[0]}</span>
                </div>
                <div>
                    <div className="font-data text-sm md:text-sm font-bold" style={{ color: `${getColor(90)}` }}>{speaker ?? ''}</div>
                    {role && <div className="font-data text-sm uppercase tracking-wider" style={{ color: `${getColor(70)}` }}>{role}{date ? ` · ${date}` : ''}</div>}
                </div>
            </div>
        </div>
    );
}
