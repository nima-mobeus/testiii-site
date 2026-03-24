import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const RISK_CLR = ['#22c55e', '#b45309', '#ff4040'];

interface RiskItem { label: string; likelihood: number; impact: number; }

interface RiskMatrixCardData {
    title?: string;
    risks: RiskItem[];
}

export default function RiskMatrixCard({ data, accentColor, onAction }: TeleComponentProps) {
    const { title, risks = [] } = data as RiskMatrixCardData;
    const labels = { y: ['High', 'Med', 'Low'], x: ['Low', 'Med', 'High'] };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 flex items-center min-h-0 overflow-hidden justify-center min-h-0 overflow-hidden">
                <div className="flex gap-1 w-full h-full max-h-full">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-around items-end pr-0.5 shrink-0">
                        <span className="font-data text-sm uppercase" style={{ color: `${getColor(70)}` }}>High</span>
                        <span className="font-data text-sm uppercase" style={{ color: `${getColor(70)}` }}>Med</span>
                        <span className="font-data text-sm uppercase" style={{ color: `${getColor(70)}` }}>Low</span>
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                        <div className="grid grid-cols-3 gap-0.5 flex-1">
                            {[2, 1, 0].map(row => (
                                [0, 1, 2].map(col => {
                                    const cellRisk = row + col;
                                    const bg = cellRisk <= 1 ? `${RISK_CLR[0]}25` : cellRisk <= 2 ? `${RISK_CLR[1]}30` : `${RISK_CLR[2]}30`;
                                    const borderClr = cellRisk <= 1 ? `${RISK_CLR[0]}40` : cellRisk <= 2 ? `${RISK_CLR[1]}50` : `${RISK_CLR[2]}50`;
                                    const cellRisks = risks.filter(r => r.impact === col && r.likelihood === row);
                                    return (
                                        <div key={`${row}-${col}`} className="rounded-sm flex flex-col items-center justify-center gap-0.5 p-1 border" style={{ backgroundColor: bg, borderColor: borderClr }}>
                                            {cellRisks.map((r, i) => (
                                                <span key={i} className="font-data text-sm md:text-sm text-center leading-tight truncate w-full font-bold" style={{ color: `${getColor(90)}` }}>{r.label}</span>
                                            ))}
                                        </div>
                                    );
                                })
                            ))}
                        </div>
                        {/* X-axis labels */}
                        <div className="flex justify-between mt-0.5 px-1 shrink-0">
                            <span className="font-data text-sm uppercase" style={{ color: `${getColor(70)}` }}>Low</span>
                            <span className="font-data text-sm uppercase" style={{ color: `${getColor(70)}` }}>Med</span>
                            <span className="font-data text-sm uppercase" style={{ color: `${getColor(70)}` }}>High</span>
                        </div>
                        <div className="text-center shrink-0">
                            <span className="font-data text-sm uppercase tracking-wider" style={{ color: `${getColor(70)}` }}>Impact →</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
