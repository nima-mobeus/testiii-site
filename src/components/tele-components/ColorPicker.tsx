'use client';

import { TeleComponentProps } from './types';

/**
 * ColorPicker — Interactive color selection component.
 *
 * Props (via data):
 *   title: string          — heading text
 *   colors: string[]       — array of hex color strings to choose from
 *   selectedColor: string  — currently selected color (hex)
 *   columns: number        — number of grid columns (default: 5)
 */
export default function ColorPicker({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const colors = Array.isArray(data.colors) ? (data.colors as string[]) : [];
  const selectedColor = data.selectedColor as string | undefined;
  const columns = (data.columns as number) ?? 5;

  if (colors.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {colors.map((color, i) => {
          const isSelected = selectedColor?.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={`${color}-${i}`}
              className="aspect-square rounded-lg border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: color,
                borderColor: isSelected ? accentColor : 'transparent',
                boxShadow: isSelected ? `0 0 0 2px ${accentColor}` : undefined,
              }}
              title={color}
              onClick={() => onAction?.(`Selected color: ${color}`)}
            />
          );
        })}
      </div>
      {selectedColor && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div
            className="h-4 w-4 rounded-full border border-gray-300"
            style={{ backgroundColor: selectedColor }}
          />
          <span>Selected: {selectedColor}</span>
        </div>
      )}
    </div>
  );
}
