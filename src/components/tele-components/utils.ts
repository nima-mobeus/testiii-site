/**
 * Scene Card Utilities — Shared helpers used by ported scene cards.
 */

/**
 * clampList — Clamps an array to a max length and returns the overflow count.
 * Used by list-based cards to prevent vertical overflow in the GridView viewport.
 */
export function clampList<T>(items: T[], max: number): { visible: T[]; overflow: number } {
  if (!items || items.length <= max) return { visible: items || [], overflow: 0 };
  return { visible: items.slice(0, max), overflow: items.length - max };
}

/**
 * getColor — Returns a CSS color-mix expression using the theme accent color.
 * @param opacity  0–100 percentage of the accent color to blend with transparent.
 */
export function getColor(opacity: number): string {
  return `color-mix(in srgb, var(--theme-chart-line) ${opacity}%, transparent)`;
}
