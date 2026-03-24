'use client';

import { useState } from 'react';
import { TeleComponentProps } from './types';

/**
 * FAQ — Accordion-style FAQ with expandable Q&A items.
 *
 * Props (via data):
 *   title?: string
 *   items: Array<{ question: string; answer: string }>
 *   allowMultiple?: boolean   — Allow multiple items open at once (default: false)
 */
export default function FAQ({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const items: Array<{ question: string; answer: string }> = Array.isArray(data.items) ? data.items : [];
  const allowMultiple = data.allowMultiple === true;
  const [open, setOpen] = useState<Set<number>>(new Set());

  if (items.length === 0) return null;

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className="divide-y rounded-lg border">
        {items.map((item, i) => {
          const isOpen = open.has(i);
          return (
            <div key={i}>
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-gray-50"
                onClick={() => toggle(i)}
              >
                {item.question}
                <span className="ml-2 shrink-0 transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', color: accentColor }}>
                  ▼
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-3 text-sm text-muted-foreground">{item.answer}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
