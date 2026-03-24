'use client';

import { TeleComponentProps } from './types';

/**
 * MediaContent — Flexible media display: image, video, or embedded content.
 *
 * Props (via data):
 *   title?: string
 *   description?: string
 *   mediaUrl: string
 *   mediaType?: 'image' | 'video' | 'embed'   — Default: auto-detected
 *   aspectRatio?: '16:9' | '4:3' | '1:1'       — Default: 16:9
 *   caption?: string
 */
export default function MediaContent({ data }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const description = data.description as string | undefined;
  const mediaUrl = data.mediaUrl as string;
  const caption = data.caption as string | undefined;

  if (!mediaUrl) return null;

  // Auto-detect media type
  let mediaType = data.mediaType as string | undefined;
  if (!mediaType) {
    if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(mediaUrl)) mediaType = 'video';
    else if (/youtube\.com|vimeo\.com|youtu\.be/i.test(mediaUrl)) mediaType = 'embed';
    else mediaType = 'image';
  }

  const aspectMap: Record<string, string> = { '16:9': '56.25%', '4:3': '75%', '1:1': '100%' };
  const aspect = aspectMap[(data.aspectRatio as string) || '16:9'] || '56.25%';

  return (
    <div className="w-full space-y-2">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: aspect }}>
        {mediaType === 'video' ? (
          <video src={mediaUrl} controls className="absolute inset-0 h-full w-full object-cover" />
        ) : mediaType === 'embed' ? (
          <iframe
            src={mediaUrl.replace('watch?v=', 'embed/')}
            title={title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <img src={mediaUrl} alt={title || 'Media'} className="absolute inset-0 h-full w-full object-cover" />
        )}
      </div>
      {caption && <p className="text-xs text-center text-muted-foreground">{caption}</p>}
    </div>
  );
}
