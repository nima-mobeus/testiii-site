'use client';

import { TeleComponentProps } from './types';

/**
 * Checklist — Interactive checklist with items that can be checked/unchecked.
 *
 * Props (via data):
 *   title?: string
 *   items: Array<{ text: string; checked?: boolean; description?: string }>
 */
export default function Checklist({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const items: Array<{ text: string; checked?: boolean; description?: string }> = Array.isArray(data.items)
    ? data.items
    : [];

  if (items.length === 0) return null;

  const doneCount = items.filter((i) => i.checked).length;

  return (
    <div className="w-full space-y-3">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="text-xs text-muted-foreground">
            {doneCount}/{items.length} done
          </span>
        </div>
      )}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-md border px-3 py-2">
            <div
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs text-white"
              style={{ backgroundColor: item.checked ? accentColor : 'transparent', borderColor: item.checked ? accentColor : '#d1d5db' }}
            >
              {item.checked && '✓'}
            </div>
            <div className="min-w-0">
              <div className={`text-sm ${item.checked ? 'text-muted-foreground line-through' : 'font-medium'}`}>
                {item.text}
              </div>
              {item.description && (
                <div className="mt-0.5 text-xs text-muted-foreground">{item.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
