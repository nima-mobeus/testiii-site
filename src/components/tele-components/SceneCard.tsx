'use client';

import { TeleComponentProps } from './types';

/**
 * SceneCard — Versatile card for dark scene backgrounds.
 * Works as a clickable action card, info card, or highlight card.
 *
 * Props (via data):
 *   title: string                — Card heading
 *   description?: string         — Body text
 *   icon?: string                — Emoji or icon
 *   badge?: string               — Small badge/tag (top-right)
 *   image?: string               — Background image URL (optional)
 *   cta?: string                 — Action phrase sent to agent on click
 *   ctaLabel?: string            — Button text (shows only if cta is set)
 *   variant?: 'default' | 'highlight' | 'success' | 'warning' | 'danger'
 */
export default function SceneCard({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const title = (data.title as string) || '';
  const description = data.description as string | undefined;
  const icon = data.icon as string | undefined;
  const badge = data.badge as string | undefined;
  const image = data.image as string | undefined;
  const cta = data.cta as string | undefined;
  const ctaLabel = data.ctaLabel as string | undefined;
  const variant = (data.variant as string) || 'default';

  const variantBorder: Record<string, string> = {
    default: 'border-white/10',
    highlight: 'border-blue-500/30',
    success: 'border-emerald-500/30',
    warning: 'border-amber-500/30',
    danger: 'border-red-500/30',
  };

  const variantGlow: Record<string, string> = {
    default: '',
    highlight: 'shadow-blue-500/5',
    success: 'shadow-emerald-500/5',
    warning: 'shadow-amber-500/5',
    danger: 'shadow-red-500/5',
  };

  const isClickable = !!cta;

  return (
    <div
      className={`
        relative flex flex-col h-full overflow-hidden
        ${variantBorder[variant] || variantBorder.default}
        ${variantGlow[variant] ? `shadow-lg ${variantGlow[variant]}` : ''}
        ${isClickable ? 'cursor-pointer hover:bg-white/[0.08] transition-colors' : ''}
      `}
      onClick={isClickable ? () => onAction?.(cta!) : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Background image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Badge */}
        {badge && (
          <div className="absolute top-0 right-0">
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded-bl-lg text-white"
              style={{ backgroundColor: accentColor }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Icon + Title */}
        <div className="flex-1">
          {icon && <span className="text-2xl mb-2 block">{icon}</span>}
          <h4 className="text-sm font-semibold text-white leading-snug">{title}</h4>
          {description && (
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-3">{description}</p>
          )}
        </div>

        {/* CTA button */}
        {cta && ctaLabel && (
          <div className="mt-3 pt-2 border-t border-white/5">
            <span className="text-xs font-medium" style={{ color: accentColor }}>
              {ctaLabel} →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
