'use client';

import { useState } from 'react';
import { TeleComponentProps } from './types';

/**
 * Quiz — Single or multi-question quiz with immediate feedback.
 *
 * Props (via data):
 *   title?: string
 *   question: string
 *   options: Array<{ label: string; correct?: boolean }>
 *   explanation?: string       — Shown after answering
 */
export default function Quiz({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const question = data.question as string;
  const options: Array<{ label: string; correct?: boolean }> = Array.isArray(data.options) ? data.options : [];
  const explanation = data.explanation as string | undefined;

  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  if (!question || options.length === 0) return null;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (onAction) {
      onAction(`Selected: ${options[i].label}`);
    }
  };

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <p className="text-sm font-medium">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          let borderColor = '#e5e7eb';
          let bg = 'transparent';
          if (answered && i === selected) {
            if (opt.correct) {
              borderColor = '#10b981';
              bg = '#f0fdf4';
            } else {
              borderColor = '#ef4444';
              bg = '#fef2f2';
            }
          } else if (answered && opt.correct) {
            borderColor = '#10b981';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className="flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 disabled:cursor-default"
              style={{ borderColor, backgroundColor: bg }}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
                style={i === selected ? { backgroundColor: accentColor, borderColor: accentColor, color: 'white' } : {}}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>
      {answered && explanation && (
        <div className="rounded-md bg-blue-50 px-4 py-2.5 text-sm text-blue-800">{explanation}</div>
      )}
    </div>
  );
}
