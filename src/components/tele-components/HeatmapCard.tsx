import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

interface HeatmapCell {
    label: string;
    value: number;
    displayValue?: string;
}

interface HeatmapCardData {
    title?: string;
    rows: string[];
    cols: string[];
    cells: HeatmapCell[][];
    minColor?: string;
    maxColor?: string;
}

export default function HeatmapCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, rows = [], cols = [], cells = [], minColor = '#f0f9ff', maxColor = C } = data as HeatmapCardData;
    const flat = cells.flat();
    if (flat.length === 0) return null;
    const min = Math.min(...flat.map(c => c.value ?? 0));
    const max = Math.max(...flat.map(c => c.value ?? 0));
    const range = max - min || 1;

    const interpolate = (val: number) => {
        const t = (val - min) / range;
        return `color-mix(in srgb, ${maxColor} ${Math.round(t * 100)}%, ${minColor})`;
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && (
                <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>
                    {title}
                </h3>
            )}
            <div className="flex-1 overflow-auto table-scroll-container min-h-0">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th />
                            {cols.map((c, i) => (
                                <th key={i} className="font-data text-sm md:text-sm uppercase tracking-wider px-1 py-1 text-center" style={{ color: `${getColor(85)}` }}>
                                    {c}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ri) => (
                            <tr key={ri}>
                                <td className="font-data text-sm md:text-sm uppercase tracking-wider pr-2 py-1 text-left whitespace-nowrap font-bold" style={{ color: `${getColor(85)}` }}>
                                    {row}
                                </td>
                                {(cells[ri] || []).map((cell, ci) => (
                                    <td key={ci} className="px-1 py-1 text-center rounded-sm" style={{ backgroundColor: interpolate(cell.value ?? 0) }}>
                                        <span className="font-data text-sm font-bold" style={{ color: ((cell.value ?? 0) - min) / range > 0.5 ? '#fff' : C }}>
                                            {cell.displayValue || cell.value}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
