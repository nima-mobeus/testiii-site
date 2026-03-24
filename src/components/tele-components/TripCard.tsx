/**
 * TripCard — Trip summary for GridView (flight + hotel)
 * All Lucide line icons, zero emojis.
 */

import React from 'react';
import {
    Plane, Hotel as HotelIcon, CalendarDays,
    Users, Zap
} from 'lucide-react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

interface TripCardData {
    destination: string;
    dates?: string;
    purpose?: string;
    flight?: string;
    flightTime?: string;
    duration?: string;
    hotel?: string;
    hotelRoom?: string;
    hotelNights?: number;
    companions?: string;
    keyMeeting?: string;
}

export default function TripCard({ data, accentColor, onAction }: TeleComponentProps) {
    const {
        destination,
        dates,
        purpose,
        flight,
        flightTime,
        duration,
        hotel,
        hotelRoom,
        hotelNights,
        companions,
        keyMeeting,
    } = data as TripCardData;
    return (
        <div className="flex flex-col h-full justify-start gap-1.5">
            <div className="flex items-center gap-2">
                <Plane size={14} color={`${getColor(60)}`} />
                <h3 className="font-data text-sm md:text-sm font-bold tracking-wide" style={{ color: `${getColor(90)}` }}>{destination}</h3>
            </div>
            {dates && (
                <span className="flex items-center gap-1 font-data text-sm tracking-wider" style={{ color: `${getColor(38)}` }}>
                    <CalendarDays size={10} /> {dates}
                </span>
            )}
            {purpose && (
                <p className="font-voice text-sm md:text-[11px] leading-snug" style={{ color: `${getColor(60)}` }}>{purpose}</p>
            )}
            {flight && (
                <div className="px-2 py-1.5 rounded" style={{ backgroundColor: `${getColor(2)}`, border: `1px solid ${getColor(6)}` }}>
                    <div className="flex items-center gap-1 font-data text-sm tracking-wide" style={{ color: `${getColor(60)}` }}>
                        <Plane size={10} /> {flight}
                    </div>
                    {flightTime && (
                        <div className="font-data text-sm tracking-wider" style={{ color: `${getColor(31)}` }}>
                            {flightTime}{duration ? ` · ${duration}` : ''}
                        </div>
                    )}
                </div>
            )}
            {hotel && (
                <div className="px-2 py-1.5 rounded" style={{ backgroundColor: `${getColor(2)}`, border: `1px solid ${getColor(3)}` }}>
                    <div className="flex items-center gap-1 font-data text-sm tracking-wide" style={{ color: `${getColor(60)}` }}>
                        <HotelIcon size={10} /> {hotel}
                    </div>
                    {(hotelRoom || hotelNights) && (
                        <div className="font-data text-sm tracking-wider" style={{ color: `${getColor(31)}` }}>
                            {hotelRoom}{hotelNights ? ` · ${hotelNights} night${hotelNights > 1 ? 's' : ''}` : ''}
                        </div>
                    )}
                </div>
            )}
            {companions && (
                <div className="flex items-center gap-1 font-data text-sm tracking-wider" style={{ color: `${getColor(25)}` }}>
                    <Users size={10} /> {companions}
                </div>
            )}
            {keyMeeting && (
                <div className="flex items-center gap-1 font-voice text-sm md:text-sm italic mt-auto" style={{ color: `${getColor(31)}` }}>
                    <Zap size={10} /> {keyMeeting}
                </div>
            )}
        </div>
    );
}
