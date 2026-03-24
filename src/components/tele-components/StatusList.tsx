'use client';

import { TeleComponentProps } from './types';

/**
 * StatusList — List of items with success/failure/pending status indicators.
 *
 * Props (via data):
 *   title?: string
 *   items: Array<{
 *     title: string;
 *     description?: string;
 *     status: 'success' | 'error' | 'warning' | 'pending' | 'info';
 *   }>
 */
const STATUS_CONFIG: Record<string, { color: string; icon: string; bg: string }> = {
  success: { color: '#10b981', icon: '✓', bg: '#f0fdf4' },
  error: { color: '#ef4444', icon: '✗', bg: '#fef2f2' },
  warning: { color: '#f59e0b', icon: '!', bg: '#fffbeb' },
  pending: { color: '#6b7280', icon: '○', bg: '#f9fafb' },
  info: { color: '#3b82f6', icon: 'i', bg: '#eff6ff' },
};

export default function StatusList({ data }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const items: Array<{ title: string; description?: string; status: string }> = Array.isArray(data.items)
    ? data.items
    : [];

  if (items.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className="space-y-2">
        {items.map((item, i) => {
          const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.info;
          return (
            <div key={i} className="flex items-start gap-3 rounded-lg border px-4 py-3" style={{ backgroundColor: cfg.bg }}>
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: cfg.color }}
              >
                {cfg.icon}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium">{item.title}</div>
                {item.description && <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
