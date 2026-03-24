'use client';

import { TeleComponentProps } from './types';

/**
 * Timeline — Vertical timeline with entries, icons, and connectors.
 *
 * Props (via data):
 *   title?: string
 *   entries: Array<{
 *     label: string;
 *     description?: string;
 *     date?: string;
 *     icon?: string;
 *     status?: 'done' | 'active' | 'pending';
 *   }>
 */
export default function Timeline({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const entries: Array<{
    label: string;
    description?: string;
    date?: string;
    icon?: string;
    status?: string;
  }> = Array.isArray(data.entries) ? data.entries : [];

  if (entries.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className="relative ml-3 space-y-0">
        {/* Vertical line */}
        <div className="absolute left-2.5 top-1 bottom-1 w-px bg-gray-200" />

        {entries.map((entry, i) => {
          const isDone = entry.status === 'done';
          const isActive = entry.status === 'active';
          const dotColor = isDone ? accentColor : isActive ? accentColor : '#d1d5db';
          const dotSize = isActive ? 'h-6 w-6' : 'h-5 w-5';

          return (
            <div key={i} className="relative flex gap-4 pb-4 last:pb-0">
              <div
                className={`relative z-10 flex ${dotSize} shrink-0 items-center justify-center rounded-full border-2 bg-white text-[10px] font-bold`}
                style={{ borderColor: dotColor, color: isDone ? 'white' : dotColor, backgroundColor: isDone ? dotColor : 'white' }}
              >
                {isDone ? '✓' : entry.icon || (i + 1)}
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isActive ? 'font-semibold' : isDone ? 'font-medium' : 'text-muted-foreground'}`}>
                    {entry.label}
                  </span>
                  {entry.date && <span className="text-xs text-muted-foreground">{entry.date}</span>}
                </div>
                {entry.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{entry.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
