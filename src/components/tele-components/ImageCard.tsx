import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

interface ImageCardData {
    imageUrl?: string;
    caption?: string;
    subtitle?: string;
}

export default function ImageCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { imageUrl, caption, subtitle } = data as ImageCardData;

    return (
        <div className="relative h-full overflow-hidden w-full overflow-hidden">
            {imageUrl ? (
                <img src={imageUrl} alt={caption || ''} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${getColor(3)}` }}>
                    <span className="font-data text-sm uppercase" style={{ color: `${getColor(25)}` }}>Image</span>
                </div>
            )}
            {(caption || subtitle) && (
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5" style={{ background: `linear-gradient(transparent, ${getColor(88)})` }}>
                    <span className="font-data text-sm md:text-sm font-bold text-white">{caption}</span>
                    {subtitle && <p className="font-voice text-sm md:text-sm text-white/70 leading-tight">{subtitle}</p>}
                </div>
            )}
        </div>
    );
}
