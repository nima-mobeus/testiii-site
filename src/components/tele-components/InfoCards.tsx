'use client';

import { TeleComponentProps } from './types';

/**
 * InfoCards — Grid of information cards with optional icon, title, and description.
 *
 * Props (via data):
 *   title?: string
 *   subtitle?: string
 *   cards: Array<{ title: string; description: string; icon?: string; variant?: 'default' | 'success' | 'warning' | 'danger' }>
 *   columns?: number          — Grid columns (default: auto based on count)
 */
const VARIANT_STYLES: Record<string, { bg: string; border: string }> = {
  success: { bg: 'bg-green-50', border: 'border-green-200' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-200' },
  danger: { bg: 'bg-red-50', border: 'border-red-200' },
};

export default function InfoCards({ data }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const subtitle = data.subtitle as string | undefined;
  const cards: Array<{ title: string; description: string; icon?: string; variant?: string }> = Array.isArray(data.cards)
    ? data.cards
    : [];
  const columns = typeof data.columns === 'number' ? data.columns : Math.min(cards.length, 3);

  if (cards.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {cards.map((card, i) => {
          const v = VARIANT_STYLES[card.variant || ''];
          return (
            <div key={i} className={`rounded-lg border p-4 ${v ? `${v.bg} ${v.border}` : 'bg-white'}`}>
              {card.icon && <div className="mb-2 text-2xl">{card.icon}</div>}
              <h4 className="text-sm font-semibold">{card.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
