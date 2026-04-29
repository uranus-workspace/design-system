'use client';

import { MessageMarkdown } from '@uranus-workspace/ai';

const sample = `### Resumo

- Suporta **negrito**, _itálico_ e [links](https://uranus.com.br).
- Listas viram \`<ul>\` semântico.

\`\`\`ts
const ok: boolean = true;
\`\`\`
`;

function FauxMarkdown({ children }: { children: string }) {
  return <pre className="whitespace-pre-wrap font-sans text-sm">{children}</pre>;
}

export default function MessageMarkdownDefault() {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-md border bg-background p-4 text-sm">
      <p className="mb-2 text-xs text-muted-foreground">
        Demonstração com renderer fictício — em produção, passe o default export de
        `react-markdown`.
      </p>
      <MessageMarkdown markdownComponent={FauxMarkdown}>{sample}</MessageMarkdown>
    </div>
  );
}
