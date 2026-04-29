'use client';

import { ThinkingIndicator } from '@uranus-workspace/ai';

export default function ThinkingIndicatorDefault() {
  return (
    <div className="flex w-full justify-center py-6">
      <ThinkingIndicator label="Pensando…" />
    </div>
  );
}
