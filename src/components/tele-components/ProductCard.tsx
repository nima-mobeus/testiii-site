'use client';

import { TeleComponentProps } from './types';

/**
 * ProductCard — Product/service showcase card with image, price, rating, tags, and CTA.
 *
 * Props (via data):
 *   name: string
 *   description?: string
 *   price?: string
 *   currency?: string
 *   badge?: string
 *   imageUrl?: string
 *   rating?: number
 *   reviewCount?: number
 *   tags?: string[]
 *   ctaLabel?: string
 *   ctaUrl?: string
 */
export default function ProductCard({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const tags: string[] = Array.isArray(data.tags) ? data.tags : [];
  const rating = typeof data.rating === 'number' ? data.rating : null;

  return (
    <div className="w-full overflow-hidden rounded-lg border" style={{ borderColor: accentColor }}>
      {data.imageUrl && (
        <div className="overflow-hidden">
          <img src={data.imageUrl as string} alt={(data.name as string) || 'Product'} className="h-40 w-full object-cover" />
        </div>
      )}
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{data.name as string}</h3>
            {data.badge && (
              <span className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: accentColor }}>
                {data.badge as string}
              </span>
            )}
          </div>
          {data.price && (
            <div className="text-right">
              <div className="text-xl font-semibold" style={{ color: accentColor }}>{data.price as string}</div>
              {data.currency && <div className="text-xs text-muted-foreground">{data.currency as string}</div>}
            </div>
          )}
        </div>

        {data.description && <p className="text-sm text-muted-foreground">{data.description as string}</p>}

        {rating !== null && (
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{rating.toFixed(1)} ★</span>
            {typeof data.reviewCount === 'number' && (
              <span className="text-muted-foreground">({data.reviewCount} reviews)</span>
            )}
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border px-2 py-0.5 text-xs">{tag}</span>
            ))}
          </div>
        )}

        {(data.ctaUrl || data.ctaLabel) && (
          <button
            className="w-full rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: accentColor }}
            onClick={() => {
              if (onAction && data.ctaLabel) onAction(data.ctaLabel as string);
              if (data.ctaUrl) window.open(data.ctaUrl as string, '_blank');
            }}
          >
            {(data.ctaLabel as string) || 'Learn more'}
          </button>
        )}
      </div>
    </div>
  );
}
