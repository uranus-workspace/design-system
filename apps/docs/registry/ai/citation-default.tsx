'use client';

import { CitationList } from '@uranus-workspace/ai';

const citations = [
  {
    id: '1',
    title: 'Uranus — Design system',
    url: 'https://design.uranus.com.br',
    source: 'design.uranus.com.br',
    snippet: 'Princípios visuais e tokens publicados em CSS-first com Tailwind v4.',
  },
  {
    id: '2',
    title: 'Vercel AI SDK',
    url: 'https://ai-sdk.dev',
    source: 'ai-sdk.dev',
    snippet: 'Streaming, tool calls e UIMessage com parts em primeira classe.',
  },
];

export default function CitationDefault() {
  return (
    <div className="mx-auto w-full max-w-md">
      <CitationList citations={citations} />
    </div>
  );
}
