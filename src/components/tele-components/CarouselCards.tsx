'use client';

import { useEffect, useRef, useState } from 'react';
import { TeleComponentProps } from './types';

/**
 * CarouselCards — Auto-scrolling card carousel. Pauses on hover.
 *
 * Props (via data):
 *   title?: string
 *   cards: Array<{
 *     title: string;
 *     description?: string;
 *     imageUrl?: string;
 *     badge?: string;
 *     ctaLabel?: string;
 *   }>
 *   autoPlay?: boolean      — Default: true
 *   interval?: number       — Milliseconds between slides (default: 3000)
 */
export default function CarouselCards({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const cards: Array<{
    title: string;
    description?: string;
    imageUrl?: string;
    badge?: string;
    ctaLabel?: string;
  }> = Array.isArray(data.cards) ? data.cards : [];
  const autoPlay = data.autoPlay !== false;
  const interval = typeof data.interval === 'number' ? data.interval : 3000;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (!autoPlay || paused || cards.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, paused, cards.length, interval]);

  if (cards.length === 0) return null;

  return (
    <div className="w-full space-y-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className="overflow-hidden rounded-lg border">
        {cards.map((card, i) => (
          <div
            key={i}
            className="w-full transition-all duration-500"
            style={{ display: i === current ? 'block' : 'none' }}
          >
            {card.imageUrl && (
              <img src={card.imageUrl} alt={card.title} className="h-40 w-full object-cover" />
            )}
            <div className="space-y-2 p-4">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">{card.title}</h4>
                {card.badge && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: accentColor }}>
                    {card.badge}
                  </span>
                )}
              </div>
              {card.description && <p className="text-xs text-muted-foreground">{card.description}</p>}
              {card.ctaLabel && (
                <button
                  className="text-xs font-medium"
                  style={{ color: accentColor }}
                  onClick={() => onAction?.(card.ctaLabel!)}
                >
                  {card.ctaLabel} →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Dots */}
      {cards.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-2 w-2 rounded-full transition-colors"
              style={{ backgroundColor: i === current ? accentColor : '#d1d5db' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
