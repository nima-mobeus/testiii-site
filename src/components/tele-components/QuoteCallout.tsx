'use client';

import { TeleComponentProps } from './types';

/**
 * QuoteCallout — Styled quote display with attribution.
 *
 * Props (via data):
 *   quote: string
 *   author?: string
 *   authorTitle?: string
 *   authorImage?: string
 */
export default function QuoteCallout({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const quote = data.quote as string;
  if (!quote) return null;

  return (
    <div className="w-full rounded-lg border-l-4 bg-gray-50 p-5" style={{ borderColor: accentColor }}>
      <div className="mb-2 text-2xl leading-none" style={{ color: accentColor }}>&ldquo;</div>
      <blockquote className="text-base italic text-gray-700">{quote}</blockquote>
      {(data.author || data.authorTitle) && (
        <div className="mt-3 flex items-center gap-3">
          {data.authorImage && (
            <img
              src={data.authorImage as string}
              alt={(data.author as string) || 'Author'}
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          <div>
            {data.author && <div className="text-sm font-medium">{data.author as string}</div>}
            {data.authorTitle && <div className="text-xs text-muted-foreground">{data.authorTitle as string}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
