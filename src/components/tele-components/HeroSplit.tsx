'use client';

import { TeleComponentProps } from './types';

/**
 * HeroSplit — Split hero with media on one side and text content on the other.
 *
 * Props (via data):
 *   title: string
 *   subtitle?: string
 *   badge?: string
 *   mediaUrl?: string
 *   mediaType?: 'image' | 'video'    — Default: image
 *   mediaPosition?: 'left' | 'right' — Default: right
 *   ctaLabel?: string
 */
export default function HeroSplit({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const title = data.title as string;
  const subtitle = data.subtitle as string | undefined;
  const badge = data.badge as string | undefined;
  const mediaUrl = data.mediaUrl as string | undefined;
  const mediaType = (data.mediaType as string) === 'video' ? 'video' : 'image';
  const mediaRight = data.mediaPosition !== 'left';
  const ctaLabel = data.ctaLabel as string | undefined;

  if (!title) return null;

  const content = (
    <div className="flex flex-col justify-center space-y-3 p-6">
      {badge && (
        <span className="inline-block w-fit rounded-full px-3 py-1 text-xs font-medium text-white" style={{ backgroundColor: accentColor }}>
          {badge}
        </span>
      )}
      <h3 className="text-xl font-bold">{title}</h3>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      {ctaLabel && (
        <button
          className="w-fit rounded-md px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: accentColor }}
          onClick={() => onAction?.(ctaLabel)}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );

  const media = mediaUrl ? (
    <div className="overflow-hidden">
      {mediaType === 'video' ? (
        <video src={mediaUrl} autoPlay muted loop playsInline className="h-full w-full object-cover" />
      ) : (
        <img src={mediaUrl} alt={title} className="h-full w-full object-cover" />
      )}
    </div>
  ) : null;

  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {mediaRight ? (
          <>
            {content}
            {media}
          </>
        ) : (
          <>
            {media}
            {content}
          </>
        )}
      </div>
    </div>
  );
}
