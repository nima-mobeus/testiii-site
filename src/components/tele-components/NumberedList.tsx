'use client';

import { TeleComponentProps } from './types';

/**
 * NumberedList — Ordered list with numbered items, titles, and descriptions.
 *
 * Props (via data):
 *   title?: string
 *   subtitle?: string
 *   items: Array<{ title: string; description?: string; badge?: string }>
 */
export default function NumberedList({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const subtitle = data.subtitle as string | undefined;
  const items: Array<{ title: string; description?: string; badge?: string }> = Array.isArray(data.items)
    ? data.items
    : [];

  if (items.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {i + 1}
            </div>
            <div className="min-w-0 pt-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{item.title}</span>
                {item.badge && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
