'use client';

import { useVoiceSessionStore } from '@/lib/stores/voice-session-store';
import { AgentComponentSlot } from '@/components/voice/AgentComponentSlot';
import { SceneManager } from '@/components/voice/SceneManager';
import { useEffect } from 'react';

/** Always-mounted keyboard navigation for scene back/forward */
function SceneKeyboardNav() {
  const navigateSceneBack = useVoiceSessionStore((s) => s.navigateSceneBack);
  const navigateSceneForward = useVoiceSessionStore((s) => s.navigateSceneForward);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return;

      const { sceneActive, sceneFuture, sceneHistory } = useVoiceSessionStore.getState();

      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        if (sceneActive && sceneHistory.length > 0) {
          e.preventDefault();
          navigateSceneBack();
        }
      } else if (e.key === 'ArrowRight') {
        if (sceneFuture.length > 0) {
          e.preventDefault();
          navigateSceneForward();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateSceneBack, navigateSceneForward]);

  return null;
}

export function SceneLayout({ children }: { children: React.ReactNode }) {
  const sceneActive = useVoiceSessionStore((s) => s.sceneActive);

  // Always-immersive: no Header/Footer
  return (
    <>
      <SceneKeyboardNav />
      {sceneActive ? (
        <>
          <SceneManager />
          <AgentComponentSlot />
        </>
      ) : (
        <>
          {children}
          <AgentComponentSlot />
        </>
      )}
    </>
  );
}
