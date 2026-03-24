/**
 * EventCard — Single calendar event for GridView
 * All Lucide line icons, zero emojis.
 */

import React from 'react';
import {
    Briefcase, Utensils, Plane, Hotel, Home, Car,
    Phone, Search, Wine, Dumbbell, CalendarDays,
    Clock, MapPin, Users
} from 'lucide-react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

const TYPE_ICON: Record<string, React.FC<any>> = {
    meeting: Briefcase,
    dinner: Utensils,
    flight: Plane,
    hotel: Hotel,
    personal: Home,
    travel: Car,
    call: Phone,
    review: Search,
    social: Wine,
    workout: Dumbbell,
    default: CalendarDays,
};

interface EventCardData {
    title: string;
    date?: string;
    time?: string;
    endTime?: string;
    type?: string;
    location?: string;
    venue?: string;
    attendees?: string;
    note?: string;
    status?: 'confirmed' | 'tentative' | 'cancelled';
}

export default function EventCard({ data, accentColor, onAction }: TeleComponentProps) {
    const {
        title,
        date,
        time,
        endTime,
        type = 'default',
        location,
        venue,
        attendees,
        note,
        status,
    } = data as EventCardData;
    const IconComp = TYPE_ICON[type] || TYPE_ICON.default;
    const isCancelled = status === 'cancelled';

    return (
        <div className={`flex flex-col h-full justify-start gap-1.5 ${isCancelled ? 'opacity-40' : ''}`}>
            <div className="flex items-center gap-2">
                <IconComp size={14} color={`${getColor(40)}`} />
                <span className="font-data text-sm md:text-sm tracking-wider uppercase" style={{ color: `${getColor(40)}` }}>{type}</span>
                {status === 'tentative' && (
                    <span className="font-data text-sm tracking-wider uppercase px-1.5 py-0.5 rounded-full" style={{ color: '#d97706', border: '1px solid #d9770633' }}>Tentative</span>
                )}
            </div>
            <h3 className={`font-data text-sm md:text-sm font-bold leading-tight ${isCancelled ? 'line-through' : ''}`} style={{ color: `${getColor(90)}` }}>{title}</h3>
            <div className="flex items-center gap-2 flex-wrap">
                {date && (
                    <span className="flex items-center gap-1 font-data text-sm md:text-[11px] tracking-wider" style={{ color: `${getColor(60)}` }}>
                        <CalendarDays size={10} /> {date}
                    </span>
                )}
                {time && (
                    <span className="flex items-center gap-1 font-data text-sm md:text-[11px] tracking-wider" style={{ color: `${getColor(60)}` }}>
                        <Clock size={10} /> {time}{endTime ? ` – ${endTime}` : ''}
                    </span>
                )}
            </div>
            {(venue || location) && (
                <div className="flex items-center gap-1 font-voice text-sm md:text-sm leading-snug" style={{ color: `${getColor(40)}` }}>
                    <MapPin size={10} />
                    {venue || location}{venue && location && ` · ${location}`}
                </div>
            )}
            {attendees && (
                <div className="flex items-center gap-1 font-data text-sm tracking-wider" style={{ color: `${getColor(31)}` }}>
                    <Users size={10} /> {attendees}
                </div>
            )}
            {note && (
                <div className="font-voice text-sm md:text-sm italic leading-snug mt-auto" style={{ color: `${getColor(25)}` }}>{note}</div>
            )}
        </div>
    );
}
