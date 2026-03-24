import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

interface ChainStep { step: number; event: string; impact?: string; }
interface DominoCardData { title?: string; probability?: number; exposure?: string; chain?: ChainStep[]; }

export default function DominoCard({ data }: TeleComponentProps) {
  const { title, probability, exposure, chain = [] } = data as DominoCardData;
  const { visible, overflow } = clampList(chain, 5);
  const probColor = (probability ?? 0) >= 20 ? '#ff4040' : (probability ?? 0) >= 10 ? '#b45309' : '#22c55e';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {title && (
        <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] font-bold mb-1" style={{ color: getColor(90) }}>{title}</h3>
      )}

      <div className="flex items-center gap-2 mb-2">
        {probability !== undefined && (
          <span className="font-data text-sm uppercase tracking-wider px-1.5 py-0.5 rounded font-bold"
            style={{ backgroundColor: `${probColor}18`, color: probColor }}>
            {probability}% probability
          </span>
        )}
        {exposure && (
          <span className="font-data text-sm font-bold" style={{ color: getColor(80) }}>{exposure}</span>
        )}
      </div>

      {visible.length > 0 && (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {visible.map((step, i) => {
            const isLast = i === visible.length - 1 && overflow === 0;
            const stepPct = visible.length > 1 ? i / (visible.length - 1) : 0;
            const stepColor = stepPct < 0.33 ? '#f59e0b' : stepPct < 0.66 ? '#ff6b35' : '#ff4040';
            return (
              <div key={i} className="flex items-stretch gap-2">
                <div className="flex flex-col items-center shrink-0 w-4">
                  <div className="w-3 h-3 rounded-full shrink-0 border-2 mt-0.5"
                    style={{ borderColor: stepColor, backgroundColor: isLast ? stepColor : 'transparent' }} />
                  {!isLast && <div className="flex-1 w-px" style={{ backgroundColor: getColor(15) }} />}
                </div>
                <div className="pb-1.5 flex-1 min-w-0">
                  <div className="font-data text-sm leading-tight" style={{ color: C }}>{step.event}</div>
                  {step.impact && (
                    <div className="font-voice text-sm italic leading-tight" style={{ color: stepColor }}>{step.impact}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <OverflowPill count={overflow} label="more effects" />
    </div>
  );
}
