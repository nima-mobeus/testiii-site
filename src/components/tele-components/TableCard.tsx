import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

interface TableCardData {
    title?: string;
    headers: string[];
    rows: string[][];
    highlights?: number[];
}

export default function TableCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, headers = [], rows = [], highlights = [] } = data as TableCardData;
    const { visible, overflow } = clampList(rows, 6);
    const highlightSet = new Set(highlights);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && (
                <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>
                    {title}
                </h3>
            )}
            <div className="flex-1 overflow-auto table-scroll-container min-h-0">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            {headers.map((h, i) => (
                                <th key={i} className="font-data text-sm md:text-sm uppercase tracking-wider py-1.5 pr-2 border-b font-bold"
                                    style={{ color: `${getColor(70)}`, borderColor: `${getColor(10)}` }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visible.map((row, ri) => (
                            <tr key={ri} style={highlightSet.has(ri) ? { backgroundColor: `${getColor(3)}` } : {}}>
                                {row.map((cell, ci) => (
                                    <td key={ci}
                                        className={`font-data text-sm md:text-sm py-1.5 pr-2 border-b ${ci === 0 ? 'font-bold' : 'font-medium'}`}
                                        style={{ color: ci === 0 ? C : `${getColor(88)}`, borderColor: `${getColor(4)}` }}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <OverflowPill count={overflow} label="rows" />
        </div>
    );
}
