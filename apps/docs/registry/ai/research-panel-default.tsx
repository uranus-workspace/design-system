'use client';

import { ResearchPanel } from '@uranus-workspace/ai';

export default function ResearchPanelDefault() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <ResearchPanel
        title="Pesquisando: padrões de chat para produtos B2B"
        stages={[
          { id: '1', title: 'Reformular consulta', status: 'done' },
          { id: '2', title: 'Buscar em /docs', status: 'done' },
          {
            id: '3',
            title: 'Buscar na web',
            status: 'running',
            description: 'ai-sdk.dev/docs/agents',
          },
          { id: '4', title: 'Sintetizar resposta', status: 'queued' },
        ]}
        citations={[
          {
            id: 'a',
            title: 'AI SDK — UIMessage parts',
            url: 'https://ai-sdk.dev',
            source: 'ai-sdk.dev',
            snippet: 'Streaming text + tool calls em uma única estrutura.',
          },
          {
            id: 'b',
            title: 'Uranus — Padrões de composição',
            url: 'https://design.uranus.com.br',
            source: 'design.uranus.com.br',
          },
        ]}
      />
    </div>
  );
}
