'use client';

import { TeleComponentProps } from './types';

/**
 * TrioColumns — Three-column layout for features, benefits, or comparisons.
 *
 * Props (via data):
 *   title?: string
 *   subtitle?: string
 *   columns: Array<{
 *     title: string;
 *     description: string;
 *     icon?: string;
 *     stat?: string;
 *     ctaLabel?: string;
 *   }>
 */
export default function TrioColumns({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const subtitle = data.subtitle as string | undefined;
  const columns: Array<{
    title: string;
    description: string;
    icon?: string;
    stat?: string;
    ctaLabel?: string;
  }> = Array.isArray(data.columns) ? data.columns : [];

  if (columns.length === 0) return null;

  const colCount = Math.min(columns.length, 4);

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}>
        {columns.map((col, i) => (
          <div key={i} className="rounded-lg border-l-4 p-4" style={{ borderColor: accentColor }}>
            {col.stat ? (
              <div className="mb-2 text-2xl font-bold" style={{ color: accentColor }}>{col.stat}</div>
            ) : col.icon ? (
              <div className="mb-2 text-2xl">{col.icon}</div>
            ) : null}
            <h4 className="text-sm font-semibold">{col.title}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{col.description}</p>
            {col.ctaLabel && (
              <button
                className="mt-2 text-xs font-medium"
                style={{ color: accentColor }}
                onClick={() => onAction?.(col.ctaLabel!)}
              >
                {col.ctaLabel} →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
