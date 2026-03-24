import React from 'react';
import { getColor } from './utils';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';
const SENTIMENT_CLR: Record<string, { bg: string; text: string; dot: string }> = {
  strong: { bg: '#22c55e10', text: '#22c55e', dot: '#22c55e' },
  watch: { bg: '#b4530910', text: '#b45309', dot: '#b45309' },
  'at-risk': { bg: '#ff404010', text: '#ff4040', dot: '#ff4040' },
  cold: { bg: '#6b728010', text: '#6b7280', dot: '#6b7280' },
};
const TRAJECTORY_ICON: Record<string, string> = { warming: '↑', stable: '→', cooling: '↓' };

interface RelationshipCardData {
  name: string;
  role?: string;
  sentiment: 'strong' | 'watch' | 'at-risk' | 'cold';
  trajectory?: 'warming' | 'stable' | 'cooling';
  lastContact?: string;
  daysSince?: number;
  commitments?: string[];
  actionNeeded?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

export default function RelationshipCard({ data }: TeleComponentProps) {
  const { name, role, sentiment, trajectory = 'stable', lastContact, daysSince, commitments = [], actionNeeded, riskLevel } = data as RelationshipCardData;
  const s = SENTIMENT_CLR[sentiment] || SENTIMENT_CLR.strong;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: getColor(8) }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={getColor(88)} strokeWidth={1.5} strokeLinecap="round">
            <circle cx={12} cy={8} r={4} />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-data text-sm md:text-sm font-bold leading-tight truncate" style={{ color: getColor(90) }}>{name}</div>
          {role && <div className="font-data text-sm uppercase tracking-wider truncate" style={{ color: getColor(60) }}>{role}</div>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.dot, ...(sentiment === 'at-risk' ? { animation: 'blink-dot 1.2s ease-in-out infinite' } : {}) }} />
          <span className="font-data text-sm uppercase tracking-wider font-bold" style={{ color: s.text }}>{sentiment.replace('-', ' ')}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-1">
          <span className="font-hero text-lg" style={{ color: trajectory === 'cooling' ? '#ff4040' : trajectory === 'warming' ? '#22c55e' : getColor(60) }}>
            {TRAJECTORY_ICON[trajectory] || '→'}
          </span>
          <span className="font-data text-sm uppercase tracking-wider" style={{ color: getColor(60) }}>{trajectory}</span>
        </div>
        {lastContact && (
          <div className="font-data text-sm" style={{ color: getColor(60) }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline -mt-0.5 mr-0.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {lastContact}
          </div>
        )}
        {daysSince !== undefined && (
          <span className="font-data text-sm font-bold px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: daysSince > 45 ? '#ff404015' : daysSince > 21 ? '#b4530915' : getColor(4),
              color: daysSince > 45 ? '#ff4040' : daysSince > 21 ? '#b45309' : getColor(70),
            }}>
            {daysSince}d ago
          </span>
        )}
      </div>

      {commitments.length > 0 && (
        <div className="flex flex-col gap-0.5 mb-2 flex-1 min-h-0 overflow-hidden">
          <span className="font-data text-sm uppercase tracking-wider" style={{ color: getColor(50) }}>Open commitments</span>
          {commitments.slice(0, 3).map((c, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: getColor(40) }} />
              <span className="font-voice text-sm leading-tight" style={{ color: getColor(75) }}>{c}</span>
            </div>
          ))}
        </div>
      )}

      {actionNeeded && (
        <div className="font-data text-sm md:text-sm px-2 py-1.5 rounded-sm mt-auto border-l-2"
          style={{ backgroundColor: '#ff404010', borderColor: '#f59e0b', color: getColor(90) }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline -mt-0.5 mr-1"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          {actionNeeded}
        </div>
      )}

      {riskLevel && (
        <div className="flex items-center gap-1 mt-1 pt-1 border-t" style={{ borderColor: getColor(8) }}>
          <span className="font-data text-sm uppercase tracking-wider" style={{ color: getColor(40) }}>Risk:</span>
          <span className="font-data text-sm uppercase tracking-wider font-bold"
            style={{ color: riskLevel === 'high' ? '#ff4040' : riskLevel === 'medium' ? '#b45309' : '#22c55e' }}>
            {riskLevel}
          </span>
        </div>
      )}
    </div>
  );
}
