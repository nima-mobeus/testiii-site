import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

const WEATHER_ICON: Record<string, string> = {
    sunny: '☀️', cloudy: '☁️', rainy: '🌧️', stormy: '⛈️', snowy: '❄️',
    windy: '💨', foggy: '🌫️', clear: '🌙', partlyCloudy: '⛅',
};

interface WeatherCardData {
    title?: string;
    location: string;
    temperature: string;
    condition: string;
    high?: string;
    low?: string;
    humidity?: string;
    wind?: string;
    forecast?: { day: string; high: string; low: string; condition: string }[];
}

export default function WeatherCard({ data, accentColor, onAction }: TeleComponentProps) {
    const {
        title, location, temperature, condition, high, low, humidity, wind, forecast = [],
    } = data as WeatherCardData;
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {title && <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: `${getColor(90)}` }}>{title}</h3>}
            <div className="flex-1 flex flex-col justify-start min-h-0 overflow-hidden gap-1.5">
                {/* Current conditions */}
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{WEATHER_ICON[condition] || '🌡️'}</span>
                    <div>
                        <div className="font-data text-lg md:text-xl font-bold leading-none" style={{ color: `${getColor(90)}` }}>{temperature}</div>
                        <div className="font-data text-sm uppercase tracking-wider" style={{ color: `${getColor(60)}` }}>{location}</div>
                    </div>
                    <div className="ml-auto text-right">
                        {high && <div className="font-data text-sm" style={{ color: `${getColor(70)}` }}>H: {high}</div>}
                        {low && <div className="font-data text-sm" style={{ color: `${getColor(70)}` }}>L: {low}</div>}
                    </div>
                </div>
                {/* Metadata */}
                <div className="flex gap-3">
                    {humidity && <span className="font-data text-sm" style={{ color: `${getColor(60)}` }}>💧 {humidity}</span>}
                    {wind && <span className="font-data text-sm" style={{ color: `${getColor(60)}` }}>💨 {wind}</span>}
                </div>
                {/* Forecast */}
                {forecast.length > 0 && (
                    <div className="flex gap-1 mt-1">
                        {forecast.slice(0, 5).map((f, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-0.5 p-1 rounded-sm" style={{ backgroundColor: `${getColor(2)}` }}>
                                <span className="font-data text-sm uppercase" style={{ color: `${getColor(60)}` }}>{f.day}</span>
                                <span className="text-sm">{WEATHER_ICON[f.condition] || '🌡️'}</span>
                                <span className="font-data text-sm font-bold" style={{ color: `${getColor(90)}` }}>{f.high}</span>
                                <span className="font-data text-sm" style={{ color: `${getColor(60)}` }}>{f.low}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
