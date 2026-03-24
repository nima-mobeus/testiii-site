'use client';

import { TeleComponentProps } from './types';

/**
 * BarChart — Horizontal bar chart with labels, values, and proportional bars.
 *
 * Props (via data):
 *   title: string           — Chart heading
 *   bars: Array<{ label: string; value: number; color?: string }>
 *   unit?: string           — Unit suffix (e.g. "units", "$", "%")
 *   maxValue?: number       — Override max for bar scaling (auto-detected if omitted)
 *   showValues?: boolean    — Show numeric values on bars (default: true)
 *   accentColor?: string    — Default bar color
 */
export default function BarChart({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const bars: Array<{ label: string; value: number; color?: string }> = Array.isArray(data.bars) ? data.bars : [];
  const unit = (data.unit as string) || '';
  const showValues = data.showValues !== false;
  const maxValue = typeof data.maxValue === 'number' ? data.maxValue : Math.max(...bars.map((b) => b.value ?? 0), 1);

  if (bars.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className="space-y-2">
        {bars.map((bar, i) => {
          const pct = Math.min((bar.value / maxValue) * 100, 100);
          const color = bar.color || accentColor;
          return (
            <div key={`${bar.label}-${i}`} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{bar.label}</span>
                {showValues && (
                  <span className="text-muted-foreground tabular-nums">
                    {bar.value.toLocaleString()} {unit}
                  </span>
                )}
              </div>
              <div className="h-4 w-full overflow-hidden rounded bg-gray-100">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
