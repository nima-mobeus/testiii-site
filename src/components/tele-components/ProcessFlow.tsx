'use client';

import { TeleComponentProps } from './types';

/**
 * ProcessFlow — Horizontal process steps with arrows/connectors.
 *
 * Props (via data):
 *   title?: string
 *   steps: Array<{ title: string; description?: string; icon?: string }>
 */
export default function ProcessFlow({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const steps: Array<{ title: string; description?: string; icon?: string }> = Array.isArray(data.steps)
    ? data.steps
    : [];

  if (steps.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className="flex items-start gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start">
            <div className="flex min-w-[120px] flex-col items-center text-center">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: accentColor }}
              >
                {step.icon || (i + 1)}
              </div>
              <div className="mt-2 text-xs font-semibold">{step.title}</div>
              {step.description && (
                <p className="mt-0.5 max-w-[120px] text-[10px] text-muted-foreground">{step.description}</p>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="mt-4 flex items-center px-1">
                <div className="h-px w-8 bg-gray-300" />
                <div className="text-gray-300">▶</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
