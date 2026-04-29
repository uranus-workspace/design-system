'use client';

import { MessageMarkdown } from '@uranus-workspace/ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const sample = `### Resumo

- Suporta **negrito**, _itálico_ e [links](https://uranus.com.br).
- Listas viram \`<ul>\` semântico.

\`\`\`ts
const ok: boolean = true;
\`\`\`
`;

export default function MessageMarkdownDefault() {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-md border bg-background p-4 text-sm">
      <p className="mb-3 text-xs text-muted-foreground">
        Preview com{' '}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.8rem]">react-markdown</code>{' '}
        + <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.8rem]">remark-gfm</code> —
        o mesmo contrato da doc abaixo.
      </p>
      <MessageMarkdown markdownComponent={ReactMarkdown} remarkPlugins={[remarkGfm]}>
        {sample}
      </MessageMarkdown>
    </div>
  );
}
