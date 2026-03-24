'use client';

import { Suspense, useMemo } from 'react';
import { ComponentTemplate } from '@/types';
import { useVoiceSessionStore } from '@/lib/stores/voice-session-store';
import { getComponent, hasComponent } from '@/components/tele-components';

interface DynamicComponentRendererProps {
  template: ComponentTemplate;
  data?: Record<string, unknown> | null;
}

function mergeTemplateData(
  defaultData: Record<string, unknown> | undefined,
  overrideData: Record<string, unknown> | undefined
) {
  return {
    ...(defaultData || {}),
    ...(overrideData || {}),
  };
}

function getMissingRequiredFields(
  schema: Record<string, any> | undefined,
  data: Record<string, any>
) {
  const required = Array.isArray(schema?.required) ? schema.required : [];
  return required.filter((field: string) => data[field] === undefined || data[field] === '');
}

function getAccentColor(uiConfig: Record<string, any> | undefined) {
  return uiConfig?.accentColor || '#2563eb';
}

/**
 * Generic fallback renderer for components not in the registry.
 * Renders data as structured key-value pairs so *something* always shows up.
 */
function GenericFallback({ template, data }: { template: ComponentTemplate; data: Record<string, any> }) {
  const displayEntries = Object.entries(data).filter(
    ([key]) => !key.startsWith('_') && key !== 'id'
  );

  if (displayEntries.length === 0) return null;

  return (
    <div className="w-full rounded-lg border p-4 space-y-2">
      <div className="text-xs font-medium text-muted-foreground">{template.name || template.type}</div>
      <div className="space-y-1.5">
        {displayEntries.map(([key, value]) => (
          <div key={key} className="text-sm">
            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
            <span className="text-muted-foreground">
              {value === null || value === undefined
                ? '—'
                : Array.isArray(value)
                  ? value
                      .map((item) =>
                        typeof item === 'object' && item !== null
                          ? Object.entries(item)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(', ')
                          : String(item)
                      )
                      .join(' | ')
                  : typeof value === 'object'
                    ? Object.entries(value)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(', ')
                    : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * DynamicComponentRenderer — Resolves template.type to a tele-component via the registry.
 *
 * Resolution order:
 * 1. Look up template.type in the component registry (tele-components/component-registry.ts)
 * 2. Fall back to GenericFallback for unregistered types
 *
 * The registry uses lazy imports, so components are code-split automatically.
 */
export function DynamicComponentRenderer({ template, data }: DynamicComponentRendererProps) {
  const submitForm = useVoiceSessionStore((state) => state.submitForm);
  const tellAgent = useVoiceSessionStore((state) => state.tellAgent);

  const mergedData = useMemo(() => {
    return mergeTemplateData(
      template.defaultData as Record<string, unknown>,
      (data || undefined) as Record<string, unknown>
    );
  }, [template, data]);

  if (!template) return null;

  const missingFields = getMissingRequiredFields(
    template.schema as Record<string, any>,
    mergedData as Record<string, any>
  );

  const accentColor = getAccentColor(template.uiConfig as Record<string, any>);

  // Inject metadata for Form component (needs templateId for submission)
  const dataWithMeta = {
    ...mergedData,
    __templateId: template.id,
  } as Record<string, any>;

  // onAction callback — sends action phrases to the voice agent via tellAgent RPC
  const handleAction = (actionPhrase: string) => {
    tellAgent(actionPhrase);
  };

  // Look up in registry
  const Component = getComponent(template.type);

  let rendered = null;

  if (Component) {
    rendered = (
      <Suspense fallback={<div className="h-24 w-full animate-pulse rounded-lg bg-gray-100" />}>
        <Component data={dataWithMeta} accentColor={accentColor} onAction={handleAction} />
      </Suspense>
    );
  } else {
    // Unregistered type — use generic fallback
    rendered = <GenericFallback template={template} data={dataWithMeta} />;
  }

  return (
    <div className="space-y-2">
      {missingFields.length > 0 && (
        <div className="text-xs text-red-600">
          Missing required fields: {missingFields.join(', ')}
        </div>
      )}
      {rendered}
    </div>
  );
}
