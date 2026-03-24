'use client';

import { TeleComponentProps } from './types';

/**
 * ImageGallery — Grid or carousel of images with optional captions.
 *
 * Props (via data):
 *   title?: string
 *   images: Array<{ url: string; alt?: string; caption?: string }>
 *   layout?: 'grid' | 'carousel'    — Default: grid
 *   columns?: number                 — Grid columns (default: 3)
 *   showCaptions?: boolean           — Default: true
 */
export default function ImageGallery({ data }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const images: Array<{ url: string; alt?: string; caption?: string }> = Array.isArray(data.images)
    ? data.images
    : [];
  const layout = data.layout === 'carousel' ? 'carousel' : 'grid';
  const columns = typeof data.columns === 'number' ? data.columns : 3;
  const showCaptions = data.showCaptions !== false;

  if (images.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      {layout === 'grid' ? (
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {images.map((img, i) => (
            <div key={i} className="space-y-1.5">
              <img src={img.url} alt={img.alt || 'Image'} className="h-32 w-full rounded-md object-cover" />
              {showCaptions && img.caption && <p className="text-xs text-muted-foreground">{img.caption}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <div key={i} className="min-w-[200px] shrink-0 space-y-1.5">
              <img src={img.url} alt={img.alt || 'Image'} className="h-32 w-full rounded-md object-cover" />
              {showCaptions && img.caption && <p className="text-xs text-muted-foreground">{img.caption}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
