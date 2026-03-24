import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const ACCURACY_CLR: Record<string, { bg: string; text: string; label: string }> = {
  correct: { bg: '#22c55e18', text: '#22c55e', label: '✓ Correct' },
  partial: { bg: '#b4530918', text: '#b45309', label: '⚠ Partially Right' },
  wrong: { bg: '#ff404018', text: '#ff4040', label: '✗ Wrong' },
  pending: { bg: '#6b728018', text: '#6b7280', label: '⏳ Pending' },
};

interface JournalEntryCardData {
  decision: string;
  date?: string;
  context?: string;
  dataAvailable?: string[];
  dataMissing?: string[];
  expectedOutcome?: string;
  actualOutcome?: string;
  accuracy?: 'correct' | 'partial' | 'wrong' | 'pending';
  speed?: string;
  dissenters?: string[];
}

export default function JournalEntryCard({ data }: TeleComponentProps) {
  const { decision, date, context, dataAvailable = [], dataMissing = [], expectedOutcome, actualOutcome, accuracy = 'pending', speed, dissenters = [] } = data as JournalEntryCardData;
  const acc = ACCURACY_CLR[accuracy] || ACCURACY_CLR.pending;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-start gap-2 mb-1">
        <div className="flex-1 min-w-0">
          <h3 className="font-data text-sm md:text-sm font-bold leading-tight" style={{ color: C }}>{decision}</h3>
          {context && <p className="font-voice text-sm leading-tight" style={{ color: getColor(55) }}>{context}</p>}
        </div>
        {date && <span className="font-data text-sm shrink-0 tracking-wider" style={{ color: getColor(50) }}>{date}</span>}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="font-data text-sm uppercase tracking-wider px-1.5 py-0.5 rounded font-bold"
          style={{ backgroundColor: acc.bg, color: acc.text }}>{acc.label}</span>
        {speed && (
          <span className="font-data text-sm px-1.5 py-0.5 rounded"
            style={{ backgroundColor: getColor(5), color: getColor(65) }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline -mt-0.5 mr-0.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {speed}
          </span>
        )}
      </div>

      <div className="flex gap-3 mb-2 flex-1 min-h-0 overflow-hidden">
        {dataAvailable.length > 0 && (
          <div className="flex-1 min-w-0">
            <div className="font-data text-sm uppercase tracking-wider mb-0.5" style={{ color: '#22c55e' }}>Had ✓</div>
            {dataAvailable.slice(0, 3).map((d, i) => (
              <div key={i} className="font-voice text-sm leading-tight truncate" style={{ color: getColor(65) }}>{d}</div>
            ))}
          </div>
        )}
        {dataMissing.length > 0 && (
          <div className="flex-1 min-w-0">
            <div className="font-data text-sm uppercase tracking-wider mb-0.5" style={{ color: '#b45309' }}>Missing ⚠</div>
            {dataMissing.slice(0, 3).map((d, i) => (
              <div key={i} className="font-voice text-sm leading-tight truncate" style={{ color: getColor(65) }}>{d}</div>
            ))}
          </div>
        )}
      </div>

      {(expectedOutcome || actualOutcome) && (
        <div className="pt-1 border-t space-y-0.5" style={{ borderColor: getColor(8) }}>
          {expectedOutcome && (
            <div className="font-voice text-sm leading-tight" style={{ color: getColor(60) }}>
              <span className="font-data text-sm uppercase tracking-wider" style={{ color: getColor(40) }}>Expected: </span>{expectedOutcome}
            </div>
          )}
          {actualOutcome && (
            <div className="font-voice text-sm leading-tight" style={{ color: acc.text }}>
              <span className="font-data text-sm uppercase tracking-wider" style={{ color: getColor(40) }}>Actual: </span>{actualOutcome}
            </div>
          )}
        </div>
      )}

      {dissenters.length > 0 && (
        <div className="flex items-center gap-1 mt-1" style={{ color: getColor(40) }}>
          <span className="font-data text-sm uppercase tracking-wider">Dissent:</span>
          <span className="font-data text-sm" style={{ color: getColor(65) }}>{dissenters.join(', ')}</span>
        </div>
      )}
    </div>
  );
}
