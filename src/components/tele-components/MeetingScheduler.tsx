'use client';

import { useState } from 'react';
import { TeleComponentProps } from './types';

/**
 * MeetingScheduler — Meeting request card with person info, topic, and suggested times.
 *
 * Props (via data):
 *   personName: string
 *   personTitle?: string
 *   photoUrl?: string
 *   topic: string
 *   suggestedTimes?: string[]
 *   message?: string
 *   ctaLabel?: string
 */
export default function MeetingScheduler({ data, accentColor = '#2563eb', onAction }: TeleComponentProps) {
  const personName = data.personName as string;
  const personTitle = data.personTitle as string | undefined;
  const photoUrl = data.photoUrl as string | undefined;
  const topic = data.topic as string;
  const times: string[] = Array.isArray(data.suggestedTimes) ? data.suggestedTimes : [];
  const message = data.message as string | undefined;
  const ctaLabel = (data.ctaLabel as string) || 'Confirm Meeting';

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (!personName || !topic) return null;

  const handleConfirm = () => {
    setConfirmed(true);
    if (onAction) {
      onAction(`Meeting confirmed: ${topic} with ${personName}${selectedTime ? ` at ${selectedTime}` : ''}`);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <div className="space-y-4 p-4">
        {/* Person */}
        <div className="flex items-center gap-3">
          {photoUrl ? (
            <img src={photoUrl} alt={personName} className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {personName.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-semibold">{personName}</div>
            {personTitle && <div className="text-xs text-muted-foreground">{personTitle}</div>}
          </div>
        </div>

        {/* Topic */}
        <div className="rounded-md bg-gray-50 px-3 py-2">
          <div className="text-xs font-medium text-muted-foreground">Topic</div>
          <div className="text-sm">{topic}</div>
        </div>

        {/* Message */}
        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        {/* Times */}
        {times.length > 0 && !confirmed && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Suggested times</div>
            <div className="flex flex-wrap gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className="rounded-md border px-3 py-1.5 text-xs transition-colors"
                  style={
                    selectedTime === t
                      ? { backgroundColor: accentColor, color: 'white', borderColor: accentColor }
                      : {}
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {confirmed ? (
          <div className="rounded-md bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
            ✓ Meeting confirmed{selectedTime ? ` for ${selectedTime}` : ''}
          </div>
        ) : (
          <button
            className="w-full rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: accentColor }}
            onClick={handleConfirm}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
