'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useVoiceSessionStore } from '@/lib/stores/voice-session-store';
import { TeleComponentProps } from './types';

/**
 * Form — Dynamic form rendered from field definitions. Submits via voice session RPC.
 *
 * Props (via data):
 *   title?: string
 *   description?: string
 *   fields: Array<{
 *     name: string;
 *     label: string;
 *     type?: 'text' | 'textarea' | 'select' | 'checkbox' | 'email' | 'number' | 'tel';
 *     required?: boolean;
 *     placeholder?: string;
 *     helpText?: string;
 *     defaultValue?: any;
 *     options?: string[];       — For select fields
 *   }>
 *   submitLabel?: string
 *
 * Special: Requires `templateId` from the template object for form submission.
 * The parent DynamicComponentRenderer passes this via the `data.__templateId` field.
 */
export default function Form({ data, accentColor = '#2563eb' }: TeleComponentProps) {
  const submitForm = useVoiceSessionStore((state) => state.submitForm);
  const templateId = data.__templateId as string | undefined;
  const title = data.title as string | undefined;
  const description = data.description as string | undefined;
  const fields: Array<Record<string, any>> = Array.isArray(data.fields) ? data.fields : [];
  const submitLabel = (data.submitLabel as string) || 'Submit';

  const [values, setValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    fields.forEach((f) => {
      if (f.defaultValue !== undefined) initial[f.name] = f.defaultValue;
      else if (f.type === 'checkbox') initial[f.name] = false;
      else initial[f.name] = '';
    });
    return initial;
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name: string, value: any) => setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (templateId) await submitForm(templateId, data.id || templateId, values);
    setSubmitted(true);
  };

  if (fields.length === 0) return null;

  return (
    <div className="w-full space-y-3 rounded-lg border p-4">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field, i) => {
          const id = `form-${field.name}-${i}`;
          return (
            <div key={id} className="space-y-1">
              <label htmlFor={id} className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={id}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  value={values[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : field.type === 'select' ? (
                <select
                  id={id}
                  name={field.name}
                  required={field.required}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  value={values[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  <option value="">Select...</option>
                  {(field.options || []).map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center gap-2">
                  <input
                    id={id}
                    type="checkbox"
                    checked={Boolean(values[field.name])}
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                  />
                  {field.helpText && <span className="text-sm text-muted-foreground">{field.helpText}</span>}
                </div>
              ) : (
                <input
                  id={id}
                  type={field.type || 'text'}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  value={values[field.name] ?? ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(field.name, e.target.value)}
                />
              )}
              {field.helpText && field.type !== 'checkbox' && (
                <p className="text-xs text-muted-foreground">{field.helpText}</p>
              )}
            </div>
          );
        })}
        <button
          type="submit"
          disabled={submitted}
          className="w-full rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          style={{ backgroundColor: accentColor }}
        >
          {submitted ? 'Submitted' : submitLabel}
        </button>
      </form>
    </div>
  );
}
