'use client';

import { ToolCallCard } from '@uranus-workspace/ai';

export default function ToolCallCardDefault() {
  return (
    <div className="mx-auto w-full max-w-xl space-y-3">
      <ToolCallCard
        toolCall={{
          id: '1',
          name: 'search_docs',
          state: 'result',
          args: { query: 'tokens de cor' },
          result: '3 páginas relevantes encontradas em /docs/tokens.',
        }}
        defaultOpen
      />
      <ToolCallCard
        toolCall={{
          id: '2',
          name: 'run_query',
          state: 'call',
          args: { sql: 'select * from orders limit 5' },
        }}
      />
    </div>
  );
}
