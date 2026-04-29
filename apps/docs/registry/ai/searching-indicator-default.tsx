'use client';

import { SearchingIndicator } from '@uranus-workspace/ai';

const sources = [
  'design.uranus.com.br/docs',
  'github.com/uranus/design-system',
  'ai-sdk.dev/docs',
  'fumadocs.dev',
];

export default function SearchingIndicatorDefault() {
  return (
    <div className="flex w-full justify-center py-6">
      <SearchingIndicator sources={sources} />
    </div>
  );
}
