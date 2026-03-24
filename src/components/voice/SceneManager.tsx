'use client';

import { useVoiceSessionStore } from '@/lib/stores/voice-session-store';
import { getComponent } from '@/components/tele-components/component-registry';
import { Suspense, useMemo, useCallback } from 'react';

export function SceneManager() {
  const currentScene = useVoiceSessionStore((s) => s.currentScene);
  const sceneActive = useVoiceSessionStore((s) => s.sceneActive);
  const clearScene = useVoiceSessionStore((s) => s.clearScene);
  const navigateSceneBack = useVoiceSessionStore((s) => s.navigateSceneBack);
  const sceneHistory = useVoiceSessionStore((s) => s.sceneHistory);
  const tellAgent = useVoiceSessionStore((s) => s.tellAgent);
  const avatarVideoTrack = useVoiceSessionStore((s) => s.avatarVideoTrack);
  const avatarEnabled = useVoiceSessionStore((s) => s.avatarEnabled);
  const avatarVisible = useVoiceSessionStore((s) => s.avatarVisible);

  // Get GridView component from registry
  const GridView = useMemo(() => getComponent('GridView'), []);

  const handleAction = useCallback(
    (phrase: string) => {
      tellAgent(phrase);
    },
    [tellAgent]
  );

  if (!sceneActive || !currentScene) return null;

  const hasHistory = sceneHistory.length > 1;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-gray-950 text-white overflow-hidden">
      {/* Avatar background layer */}
      {avatarEnabled && avatarVisible && avatarVideoTrack && (
        <div className="absolute inset-0 z-0 opacity-30">
          <video
            ref={(el) => {
              if (el && avatarVideoTrack) {
                avatarVideoTrack.attach(el);
              }
            }}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-3 shrink-0">
        <div className="flex items-center gap-3">
          {hasHistory && (
            <button
              onClick={navigateSceneBack}
              className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </button>
          )}
          <button
            onClick={clearScene}
            className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            Close
          </button>
        </div>
        {currentScene.badge && (
          <span className="text-xs font-medium text-white/50 tracking-wider uppercase">
            {currentScene.badge}
          </span>
        )}
      </header>

      {/* Title area */}
      {(currentScene.title || currentScene.subtitle) && (
        <div className="relative z-10 px-6 pb-4 shrink-0">
          {currentScene.title && (
            <h1 className="text-2xl font-bold tracking-tight">
              {currentScene.title}
            </h1>
          )}
          {currentScene.subtitle && (
            <p className="text-sm text-white/60 mt-1">
              {currentScene.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Main content - GridView */}
      <main className="relative z-10 flex-1 px-6 pb-4 overflow-auto min-h-0">
        {GridView && currentScene.cards && currentScene.cards.length > 0 ? (
          <Suspense
            fallback={
              <div className="animate-pulse h-full bg-white/5 rounded-xl" />
            }
          >
            <GridView
              data={{
                layout: currentScene.layout,
                cards: currentScene.cards,
                maxRows: currentScene.maxRows,
              }}
              accentColor="#3b82f6"
              onAction={handleAction}
            />
          </Suspense>
        ) : (
          <div className="flex items-center justify-center h-full text-white/40">
            No content to display
          </div>
        )}
      </main>

      {/* Footer */}
      {(currentScene.footerLeft || currentScene.footerRight) && (
        <footer className="relative z-10 flex items-center justify-between px-6 py-3 text-xs text-white/40 shrink-0">
          <span>{currentScene.footerLeft || ''}</span>
          <span>{currentScene.footerRight || ''}</span>
        </footer>
      )}
    </div>
  );
}
