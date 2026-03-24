'use client';

import { Suspense, useMemo } from 'react';
import type { TeleComponentProps } from './types';
import { getComponent } from './component-registry';

interface CardDef {
  type: string;
  props: Record<string, any>;
  span?: 'full';
}

/**
 * CARD_SIZE — flex-grow weights per card type.
 * sm (1) = compact, md (2) = standard, lg (3) = expansive.
 * Drives row-height distribution so large charts get more vertical space.
 */
const CARD_SIZE: Record<string, number> = {
  // sm — compact
  'kpi-strip': 1,
  // lg — expansive
  'bar-chart': 3, 'donut': 3, 'line-chart': 3, 'table': 3,
  'heatmap': 3, 'waterfall': 3, 'scatter-plot': 3, 'gauge': 3,
  'stacked-bar': 3, 'area-chart': 3, 'world-map': 3,
  'comparison-table': 3, 'incident-card': 3, 'risk-matrix': 3,
  'live-map': 3, 'domino-card': 3,
  // everything else defaults to md (2) via fallback
};

function getCardSize(type: string): number {
  return CARD_SIZE[type] ?? 2;
}

/** Returns the max card size weight for a row of cards. */
function rowWeight(rowCards: CardDef[]): number {
  return Math.max(...rowCards.map(c => getCardSize(c.type)));
}

/**
 * Layout code parser.
 * - "CxR" format: "2x3" = 2 columns, 3 rows
 * - "A-B-C" format: "1-2-3" = row 1 has 1 col, row 2 has 2 cols, row 3 has 3 cols
 * - Single number: that many columns in 1 row
 * - Auto layout: based on card count
 */
function parseLayout(layout: string, cardCount: number): number[][] {
  if (!layout) {
    // Auto layout based on card count
    if (cardCount <= 1) return [[1]];
    if (cardCount <= 2) return [[2]];
    if (cardCount <= 3) return [[3]];
    if (cardCount <= 4) return [[2, 2]];
    if (cardCount <= 6) return [[3, 3]];
    return [[3, 3, 3]];
  }

  // "CxR" format: "2x3" = 2 cols, 3 rows
  const gridMatch = layout.match(/^(\d+)x(\d+)$/);
  if (gridMatch) {
    const cols = parseInt(gridMatch[1]);
    const rows = parseInt(gridMatch[2]);
    return Array(rows).fill(null).map(() => Array(cols).fill(1));
  }

  // "A-B-C" format: "1-2-3" = row with 1, row with 2, row with 3
  if (layout.includes('-')) {
    return layout.split('-').map(n => {
      const count = parseInt(n);
      return Array(count).fill(1);
    });
  }

  // Single number: just that many columns in 1 row
  const single = parseInt(layout);
  if (!isNaN(single)) {
    return [Array(single).fill(1)];
  }

  return [[cardCount]]; // fallback: all in one row
}

export default function GridView({ data, accentColor, onAction }: TeleComponentProps) {
  const layout = (data?.layout as string) || '';
  const cards = (data?.cards || []) as CardDef[];
  const maxRows = (data?.maxRows as number) || 3;

  const rows = useMemo(() => {
    const rowDef = parseLayout(layout, cards.length);
    const result: CardDef[][] = [];
    let cardIndex = 0;

    for (const row of rowDef) {
      if (cardIndex >= cards.length) break;
      const rowCards: CardDef[] = [];
      const colCount = row.length;
      for (let c = 0; c < colCount && cardIndex < cards.length; c++) {
        rowCards.push(cards[cardIndex]);
        cardIndex++;
      }
      result.push(rowCards);
      if (result.length >= maxRows) break;
    }

    // If there are remaining cards, distribute them
    while (cardIndex < cards.length) {
      const lastRow = result[result.length - 1];
      if (lastRow && lastRow.length < 4) {
        lastRow.push(cards[cardIndex]);
      } else {
        result.push([cards[cardIndex]]);
      }
      cardIndex++;
    }

    return result;
  }, [layout, cards, maxRows]);

  if (!cards || cards.length === 0) {
    return null;
  }

  // Build weighted row template: e.g. "2fr 3fr 1fr" based on max card size per row
  const rowTemplate = rows.map(r => `${rowWeight(r)}fr`).join(' ');

  return (
    <div
      className="grid gap-4 w-full h-full"
      style={{ gridTemplateRows: rowTemplate }}
    >
      {rows.map((rowCards, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${rowCards.length}, 1fr)` }}
        >
          {rowCards.map((card, cardIndex) => (
            <CardRenderer
              key={`${rowIndex}-${cardIndex}`}
              card={card}
              accentColor={accentColor}
              onAction={onAction}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function CardRenderer({ card, accentColor, onAction }: {
  card: CardDef;
  accentColor?: string;
  onAction?: (phrase: string) => void;
}) {
  const Component = getComponent(card.type);

  if (!Component) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-gray-400">Unknown card type: {card.type}</p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-white/10 bg-white/5 animate-pulse h-full min-h-[100px]" />
      }
    >
      <div
        className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 h-full overflow-hidden ${
          card.span === 'full' ? 'col-span-full' : ''
        }`}
      >
        <Component
          data={card.props || {}}
          accentColor={accentColor}
          onAction={onAction}
        />
      </div>
    </Suspense>
  );
}
