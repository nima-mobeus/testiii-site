import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

interface StockCardData {
    title?: string;
    ticker: string;
    price: string;
    change: string;
    changePercent: string;
    trend: 'up' | 'down' | 'flat';
    marketCap?: string;
    volume?: string;
    dayHigh?: string;
    dayLow?: string;
    sparkline?: number[];
}

export default function StockCard({ data, accentColor, onAction }: TeleComponentProps) {
    const {
        title, ticker, price, change, changePercent, trend,
        marketCap, volume, dayHigh, dayLow, sparkline,
    } = data as StockCardData;
    const trendClr = trend === 'up' ? '#22c55e' : trend === 'down' ? '#ff4040' : `${getColor(60)}`;
    const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—';

    // Sparkline
    let sparkPath = '';
    const W = 120, H = 32;
    if (sparkline && sparkline.length > 1) {
        const max = Math.max(...sparkline); const min = Math.min(...sparkline); const range = max - min || 1;
        sparkPath = sparkline.map((v, i) => {
            const x = (i / (sparkline.length - 1)) * W;
            const y = H - ((v - min) / range) * H;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 flex flex-col justify-start min-h-0 overflow-hidden gap-1.5">
                {/* Ticker + price */}
                <div className="flex items-baseline gap-2">
                    <span className="font-data text-sm font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: `${getColor(3)}`, color: `${getColor(88)}` }}>{ticker}</span>
                    <span className="font-data text-lg md:text-xl font-bold" style={{ color: `${getColor(90)}` }}>{price}</span>
                </div>
                {/* Change */}
                <div className="flex items-center gap-2">
                    <span className="font-data text-sm font-bold" style={{ color: trendClr }}>{arrow} {change} ({changePercent})</span>
                </div>
                {/* Sparkline */}
                {sparkPath && (
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-8 mt-0.5" preserveAspectRatio="none">
                        <path d={sparkPath} fill="none" stroke={trendClr} strokeWidth={1.5} opacity={0.6} />
                    </svg>
                )}
                {/* Metadata grid */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-auto">
                    {marketCap && (
                        <div><span className="font-data text-sm uppercase" style={{ color: `${getColor(60)}` }}>Mkt Cap</span>
                            <span className="font-data text-sm font-bold ml-1" style={{ color: `${getColor(70)}` }}>{marketCap}</span></div>
                    )}
                    {volume && (
                        <div><span className="font-data text-sm uppercase" style={{ color: `${getColor(60)}` }}>Vol</span>
                            <span className="font-data text-sm font-bold ml-1" style={{ color: `${getColor(70)}` }}>{volume}</span></div>
                    )}
                    {dayHigh && (
                        <div><span className="font-data text-sm uppercase" style={{ color: `${getColor(60)}` }}>High</span>
                            <span className="font-data text-sm font-bold ml-1" style={{ color: `${getColor(70)}` }}>{dayHigh}</span></div>
                    )}
                    {dayLow && (
                        <div><span className="font-data text-sm uppercase" style={{ color: `${getColor(60)}` }}>Low</span>
                            <span className="font-data text-sm font-bold ml-1" style={{ color: `${getColor(70)}` }}>{dayLow}</span></div>
                    )}
                </div>
            </div>
        </div>
    );
}
