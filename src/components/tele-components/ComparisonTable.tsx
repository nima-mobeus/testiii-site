'use client';

import { TeleComponentProps } from './types';

/**
 * ComparisonTable — Side-by-side comparison table.
 *
 * Props (via data):
 *   title?: string
 *   columns: string[]                 — Column headers (e.g. ["Feature", "Plan A", "Plan B"])
 *   rows: Array<Array<string | boolean>>  — Row data matching columns. Boolean → ✓/✗
 *   highlightColumn?: number          — 0-based column index to highlight
 */
export default function ComparisonTable({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const title = data.title as string | undefined;
  const columns: string[] = Array.isArray(data.columns) ? data.columns : [];
  const rows: Array<Array<string | boolean>> = Array.isArray(data.rows) ? data.rows : [];
  const highlightCol = typeof data.highlightColumn === 'number' ? data.highlightColumn : -1;

  if (columns.length === 0 || rows.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              {columns.map((col, ci) => (
                <th
                  key={ci}
                  className="px-4 py-2.5 text-left font-semibold"
                  style={ci === highlightCol ? { color: accentColor } : undefined}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b last:border-0 hover:bg-gray-50">
                {Array.isArray(row) &&
                  row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-2"
                      style={ci === highlightCol ? { fontWeight: 600 } : undefined}
                    >
                      {typeof cell === 'boolean' ? (
                        <span style={{ color: cell ? '#10b981' : '#d1d5db' }}>{cell ? '✓' : '✗'}</span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
