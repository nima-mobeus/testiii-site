import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

const CAT_CLR: Record<string, string> = {
  milestone: '#22c55e', product: '#1d4ed8', technology: '#6d28d9',
  financial: '#0369a1', regulatory: '#b45309', incident: '#ff4040',
  market: '#0891b2', energy: '#059669', default: getColor(60),
};

interface TimelineEvent { date: string; title: string; category?: string; impact?: string; }
interface TimelineCardData { title?: string; events: TimelineEvent[]; }

export default function TimelineCard({ data }: TeleComponentProps) {
  const { title, events = [] } = data as TimelineCardData;
  const { visible, overflow } = clampList(events, 4);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {title && (
        <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-2" style={{ color: getColor(90) }}>{title}</h3>
      )}
      <div className="flex-1 flex flex-col justify-start min-h-0 overflow-hidden overflow-auto space-y-1.5">
        {visible.map((e, i) => {
          const clr = CAT_CLR[e.category || 'default'] || CAT_CLR.default;
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="flex flex-col items-center shrink-0 mt-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: clr }} />
                {i < visible.length - 1 && <span className="w-px flex-1 min-h-[12px]" style={{ backgroundColor: getColor(13) }} />}
              </div>
              <div className="min-w-0 pb-1">
                <span className="font-data text-sm md:text-sm uppercase tracking-wider" style={{ color: clr }}>
                  {e.date}{e.category ? ` · ${e.category}` : ''}
                </span>
                <div className="font-data text-sm md:text-sm font-bold leading-tight" style={{ color: getColor(90) }}>{e.title}</div>
                {e.impact && (
                  <div className="font-voice text-sm md:text-sm leading-tight" style={{ color: getColor(70) }}>{e.impact}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <OverflowPill count={overflow} label="more" />
    </div>
  );
}
