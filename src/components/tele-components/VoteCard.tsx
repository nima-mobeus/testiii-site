import React from 'react';
import { clampList, getColor } from './utils';
import { OverflowPill } from './OverflowPill';
import type { TeleComponentProps } from './types';

const C = 'var(--theme-chart-line)';

const VOTE_CLR: Record<string, string> = {
    yes: '#22c55e',
    no: '#ff4040',
    conditional: '#f59e0b',
    abstain: '#6b7280',
    unknown: '#6b7280',
};

const VOTE_ICON: Record<string, string> = {
    yes: '✓',
    no: '✗',
    conditional: '⚠',
    abstain: '—',
    unknown: '?',
};

interface Position {
    director: string;
    vote: 'yes' | 'no' | 'conditional' | 'abstain' | 'unknown';
    condition?: string;
}

interface VoteCardData {
    title?: string;
    resolution?: string;
    description?: string;
    positions?: Position[];
    predictedOutcome?: string;
    prepActions?: string[];
}

export default function VoteCard({ data, accentColor, onAction }: TeleComponentProps) {
    const {
        title,
        resolution,
        description,
        positions = [],
        predictedOutcome,
        prepActions = [],
    } = data as VoteCardData;
    const { visible, overflow } = clampList(positions, 6);

    const tally = positions.reduce(
        (acc, p) => {
            if (p.vote === 'yes') acc.yes++;
            else if (p.vote === 'no') acc.no++;
            else if (p.vote === 'conditional') acc.conditional++;
            else acc.other++;
            return acc;
        },
        { yes: 0, no: 0, conditional: 0, other: 0 }
    );

    const total = positions.length;
    const yesWidth = total > 0 ? ((tally.yes + tally.conditional) / total) * 100 : 0;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            {title && (
                <h3 className="font-data text-sm md:text-sm uppercase tracking-[0.12em] mb-0.5" style={{ color: `${getColor(90)}` }}>
                    {title}
                </h3>
            )}

            {/* Resolution ID */}
            {resolution && (
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-data text-sm uppercase tracking-wider px-1.5 py-0.5 rounded font-bold"
                        style={{ backgroundColor: `${getColor(8)}`, color: `${getColor(70)}` }}>
                        {resolution}
                    </span>
                </div>
            )}

            {/* Description */}
            {description && (
                <p className="font-voice text-sm md:text-sm leading-tight mb-2 line-clamp-2" style={{ color: `${getColor(70)}` }}>
                    {description}
                </p>
            )}

            {/* Vote Tally Bar */}
            <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${getColor(8)}` }}>
                    <div className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${yesWidth}%`,
                            background: `linear-gradient(90deg, ${VOTE_CLR.yes} 0%, ${VOTE_CLR.conditional} 100%)`,
                        }}
                    />
                </div>
                <span className="font-data text-sm font-bold shrink-0" style={{ color: VOTE_CLR.yes }}>
                    {tally.yes + tally.conditional}–{tally.no}
                </span>
            </div>

            {/* Director Positions */}
            {visible.length > 0 && (
                <div className="flex flex-col gap-0.5 flex-1 min-h-0 overflow-hidden">
                    {visible.map((pos, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
                                style={{ backgroundColor: VOTE_CLR[pos.vote] || VOTE_CLR.unknown, fontSize: '9px' }}>
                                {VOTE_ICON[pos.vote] || '?'}
                            </span>
                            <span className="font-data text-sm leading-tight truncate" style={{ color: C }}>
                                {pos.director}
                            </span>
                            {pos.condition && (
                                <span className="font-voice text-sm italic truncate" style={{ color: `${getColor(50)}` }}>
                                    — {pos.condition}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <OverflowPill count={overflow} label="more directors" />

            {/* Predicted Outcome */}
            {predictedOutcome && (
                <div className="font-data text-sm md:text-sm px-2 py-1 rounded-sm mt-auto" style={{ backgroundColor: `${getColor(3)}`, color: `${getColor(85)}` }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="inline -mt-0.5 mr-0.5"><path d="M12 22V12M12 12l4 4M12 12l-4 4M20 6H4" /></svg>
                    {predictedOutcome}
                </div>
            )}

            {/* Prep Actions */}
            {prepActions.length > 0 && (
                <div className="mt-1 pt-1 border-t" style={{ borderColor: `${getColor(8)}` }}>
                    {prepActions.slice(0, 2).map((action, i) => (
                        <div key={i} className="font-voice text-sm leading-tight" style={{ color: `${getColor(60)}` }}>
                            → {action}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
