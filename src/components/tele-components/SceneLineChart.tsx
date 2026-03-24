import React, { useId } from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

interface SceneLineChartData {
    title?: string;
    data: number[];
    labels?: string[];
    color?: string;
    unit?: string;
}

export default function SceneLineChart({ data: propData, accentColor, onAction }: TeleComponentProps) {
    const { title, data: rawData = [], labels: rawLabels, color = `${getColor(88)}`, unit } = propData as SceneLineChartData;
    const gradId = useId().replace(/:/g, '_'); // unique per instance
    // Normalize: if AI sends data as an object { "2024": 0.05, ... }, convert to array
    let data: number[];
    let labels: string[] | undefined;
    if (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) {
        const entries = Object.entries(rawData as Record<string, number>);
        labels = entries.map(([k]) => k);
        data = entries.map(([, v]) => Number(v) || 0);
    } else {
        data = Array.isArray(rawData) ? rawData : [];
        labels = rawLabels;
    }
    if (data.length < 2) return null;
    const mn = Math.min(...data);
    const mx = Math.max(...data);
    const range = mx - mn || 1;
    const w = 200, h = 60;

    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - mn) / range) * (h - 8) - 4;
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = `0,${h} ${points} ${w},${h}`;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && (
                <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>
                    {title}
                </h3>
            )}
            <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden min-h-0">
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full flex-1" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient id={`lg_${gradId}`} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
                            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                        </linearGradient>
                    </defs>
                    <polygon points={areaPoints} fill={`url(#lg_${gradId})`} />
                    <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Labels row */}
                {labels && labels.length > 0 && (
                    <div className="flex justify-between mt-1">
                        {labels.map((l, i) => (
                            <span key={i} className="font-data text-sm md:text-sm uppercase" style={{ color: `${getColor(85)}` }}>
                                {l}
                            </span>
                        ))}
                    </div>
                )}
                {/* Min/Max annotation */}
                <div className="flex justify-between mt-1">
                    <span className="font-data text-sm font-medium" style={{ color: `${getColor(85)}` }}>
                        {mn.toLocaleString()}{unit ? ` ${unit}` : ''}
                    </span>
                    <span className="font-data text-sm font-bold" style={{ color: `${getColor(90)}` }}>
                        {mx.toLocaleString()}{unit ? ` ${unit}` : ''}
                    </span>
                </div>
            </div>
        </div>
    );
}
