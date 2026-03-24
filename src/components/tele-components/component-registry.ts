/**
 * Component Registry — Convention-based auto-import for tele-components.
 *
 * HOW IT WORKS:
 * Every .tsx file in this directory (except types.ts, this file, and index.ts)
 * that exports a default React component is automatically registered here.
 *
 * The registry maps component type names (PascalCase, matching the filename)
 * to their lazy-loaded React component. DynamicComponentRenderer uses this
 * registry to resolve template.type → React component at runtime.
 *
 * TO ADD A NEW COMPONENT:
 * 1. Create a new .tsx file in src/components/tele-components/ (e.g. MyWidget.tsx)
 * 2. Export a default function component that accepts TeleComponentProps
 * 3. Add one import line + one registry entry below
 *
 * CONVENTION:
 * - Filename must be PascalCase and match the template type exactly
 * - Component must `export default function ComponentName(props: TeleComponentProps)`
 * - The template.type in the database must match the filename (e.g. "BarChart" → BarChart.tsx)
 */

import { ComponentType, lazy } from 'react';
import type { TeleComponentProps } from './types';

// ─── Built-in component registry ────────────────────────────────────────────
// Each entry: 'TemplateType' → lazy(() => import('./FileName'))
// Lazy loading ensures only used components are bundled for a given page.

const registry: Record<string, ComponentType<TeleComponentProps>> = {};

// Helper to register a lazy component
function reg(type: string, loader: () => Promise<{ default: ComponentType<TeleComponentProps> }>) {
  registry[type] = lazy(loader);
}

// ─── Data Visualization ─────────────────────────────────────────────────────
reg('BarChart', () => import('./BarChart'));
reg('LineChart', () => import('./LineChart'));
reg('PieChart', () => import('./PieChart'));
reg('StatsRow', () => import('./StatsRow'));
reg('ProgressTracker', () => import('./ProgressTracker'));

// ─── Content Display ────────────────────────────────────────────────────────
reg('ProductCard', () => import('./ProductCard'));
reg('InfoCards', () => import('./InfoCards'));
reg('ImageGallery', () => import('./ImageGallery'));
reg('QuoteCallout', () => import('./QuoteCallout'));
reg('FAQ', () => import('./FAQ'));
reg('MediaContent', () => import('./MediaContent'));

// ─── Interactive ────────────────────────────────────────────────────────────
reg('Form', () => import('./Form'));
reg('ComparisonTable', () => import('./ComparisonTable'));
reg('Quiz', () => import('./Quiz'));
reg('Checklist', () => import('./Checklist'));

// ─── Layout / Presentation ──────────────────────────────────────────────────
reg('HeroSplit', () => import('./HeroSplit'));
reg('Timeline', () => import('./Timeline'));
reg('CarouselCards', () => import('./CarouselCards'));
reg('TrioColumns', () => import('./TrioColumns'));
reg('ProcessFlow', () => import('./ProcessFlow'));
reg('GridView', () => import('./GridView'));

// ─── Specialized ────────────────────────────────────────────────────────────
reg('ProfileRoster', () => import('./ProfileRoster'));
reg('StatusList', () => import('./StatusList'));
reg('NumberedList', () => import('./NumberedList'));
reg('MeetingScheduler', () => import('./MeetingScheduler'));

// ─── Scene-Optimized (dark backgrounds) ─────────────────────────────────────
reg('KPICard', () => import('./KPICard'));
reg('MetricCard', () => import('./MetricCard'));
reg('DonutChart', () => import('./DonutChart'));
reg('SceneCard', () => import('./SceneCard'));

// ─── Scene Cards (ported from small lift) ────────────────────────────────────

// Core Data
reg('stat', () => import('./StatCard'));
reg('kpi-strip', () => import('./KPIStrip'));
reg('metric-list', () => import('./MetricList'));
reg('alert', () => import('./AlertCard'));
reg('text', () => import('./TextCard'));
reg('split-stat', () => import('./SplitStat'));
reg('table', () => import('./TableCard'));
reg('info-card', () => import('./InfoCard'));
reg('bullet-list', () => import('./BulletListCard'));

// Charts & Visualization
reg('bar-chart', () => import('./SceneBarChart'));
reg('line-chart', () => import('./SceneLineChart'));
reg('donut', () => import('./SceneDonutChart'));
reg('heatmap', () => import('./HeatmapCard'));
reg('waterfall', () => import('./WaterfallCard'));
reg('scatter-plot', () => import('./ScatterPlot'));
reg('gauge', () => import('./GaugeCard'));
reg('stacked-bar', () => import('./StackedBarCard'));
reg('funnel', () => import('./FunnelCard'));

// People & Organization
reg('person-card', () => import('./PersonCard'));
reg('org-roster', () => import('./OrgRoster'));
reg('comparison-profile', () => import('./ComparisonProfile'));
reg('stakeholder-map', () => import('./StakeholderMap'));
reg('team-kpi', () => import('./TeamKPI'));

// Rich Content
reg('callout', () => import('./CalloutCard'));
reg('quote-card', () => import('./QuoteCard'));
reg('image-card', () => import('./ImageCard'));
reg('briefing', () => import('./BriefingCard'));

// Geo & Comparison
reg('world-map', () => import('./WorldMapCard'));
reg('comparison-table', () => import('./ComparisonTableCard'));
reg('ranked-list', () => import('./RankedListCard'));
reg('status-grid', () => import('./StatusGridCard'));
reg('country-card', () => import('./CountryCard'));

// Operational
reg('incident-card', () => import('./IncidentCard'));
reg('pipeline-card', () => import('./PipelineCard'));
reg('risk-matrix', () => import('./RiskMatrixCard'));
reg('mini-dashboard', () => import('./MiniDashboardCard'));
reg('data-cluster', () => import('./DataClusterCard'));

// Live Data
reg('weather', () => import('./WeatherCard'));
reg('traffic', () => import('./TrafficCard'));
reg('stock', () => import('./StockCard'));
reg('news-feed', () => import('./NewsFeedCard'));
// reg('live-map', () => import('./LiveMapCard'));  // DEFERRED: needs react-simple-maps

// Email, Calendar & Travel
reg('event-card', () => import('./EventCard'));
reg('email-card', () => import('./EmailCard'));
reg('email-list', () => import('./EmailListCard'));
reg('trip-card', () => import('./TripCard'));

// Executive Action
reg('decision-card', () => import('./DecisionCard'));
reg('approval-card', () => import('./ApprovalCard'));
reg('delegation-card', () => import('./DelegationCard'));

// Cross-Domain
reg('vote-card', () => import('./VoteCard'));
reg('relationship-card', () => import('./RelationshipCard'));
reg('domino-card', () => import('./DominoCard'));
reg('journal-entry', () => import('./JournalEntryCard'));

// Scene-specific overrides (kebab-case versions for scene prompt)
reg('checklist', () => import('./ChecklistCard'));
reg('timeline', () => import('./TimelineCard'));

// ─── Aliases (prompt compatibility & LLM hallucination resilience) ───────────
reg('profile-roster', () => import('./OrgRoster'));
reg('area-chart', () => import('./SceneLineChart'));
reg('progress', () => import('./SceneBarChart'));
reg('news-article', () => import('./NewsFeedCard'));

// Common LLM hallucinations (e.g. "donut-chart" instead of "donut")
reg('donut-chart', () => import('./SceneDonutChart'));
reg('bar', () => import('./SceneBarChart'));
reg('line', () => import('./SceneLineChart'));
reg('stat-card', () => import('./StatCard'));
reg('stats', () => import('./StatCard'));
reg('kpi', () => import('./KPIStrip'));
reg('kpi-card', () => import('./KPIStrip'));
reg('metric', () => import('./MetricList'));
reg('info', () => import('./InfoCard'));
reg('text-card', () => import('./TextCard'));
reg('checklist-card', () => import('./ChecklistCard'));
reg('timeline-card', () => import('./TimelineCard'));

// ─── Custom client components ────────────────────────────────────────────────
// Client-specific components are added below this line.
// The website builder agent or discovery service will append entries here.
// Example:
//   reg('CustomWidget', () => import('../CustomWidget'));

// ─── Exports ────────────────────────────────────────────────────────────────

/**
 * Look up a component by template type name.
 * Returns undefined if no matching component is registered.
 */
export function getComponent(type: string): ComponentType<TeleComponentProps> | undefined {
  return registry[type];
}

/**
 * Check if a component type is registered.
 */
export function hasComponent(type: string): boolean {
  return type in registry;
}

/**
 * Get all registered component type names.
 */
export function getRegisteredTypes(): string[] {
  return Object.keys(registry);
}

export default registry;
