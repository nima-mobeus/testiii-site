'use client';

import { TeleComponentProps } from './types';

/**
 * ProfileRoster — Grid of profile cards with avatars and bios.
 *
 * Props (via data):
 *   title?: string
 *   subtitle?: string
 *   profiles: Array<{
 *     name: string;
 *     role?: string;
 *     bio?: string;
 *     photoUrl?: string;
 *     ctaLabel?: string;
 *   }>
 */
export default function ProfileRoster({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const subtitle = data.subtitle as string | undefined;
  const profiles: Array<{
    name: string;
    role?: string;
    bio?: string;
    photoUrl?: string;
    ctaLabel?: string;
  }> = Array.isArray(data.profiles) ? data.profiles : [];

  if (profiles.length === 0) return null;

  const cols = Math.min(profiles.length, 4);

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {profiles.map((p, i) => (
          <div key={i} className="flex flex-col items-center rounded-lg border p-4 text-center">
            {p.photoUrl ? (
              <img src={p.photoUrl} alt={p.name} className="mb-2 h-16 w-16 rounded-full object-cover" />
            ) : (
              <div
                className="mb-2 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: accentColor }}
              >
                {p.name.charAt(0).toUpperCase()}
              </div>
            )}
            <h4 className="text-sm font-semibold">{p.name}</h4>
            {p.role && <div className="text-xs text-muted-foreground">{p.role}</div>}
            {p.bio && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.bio}</p>}
            {p.ctaLabel && (
              <button
                className="mt-2 text-xs font-medium"
                style={{ color: accentColor }}
                onClick={() => onAction?.(p.ctaLabel!)}
              >
                {p.ctaLabel}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
