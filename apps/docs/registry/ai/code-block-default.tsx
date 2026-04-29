'use client';

import { CodeBlock } from '@uranus-workspace/ai';
import { ShikiCodeBody } from '../../components/shiki-code-body';

const tsSample = `import { useUranusChat } from '@uranus-workspace/ai';

const chat = useUranusChat({ api: '/api/chat' });
chat.sendMessage({ text: 'Olá' });`;

const jsonSample = `{
  "model": "gpt-4.1-mini",
  "messages": [{ "role": "user", "content": "Olá" }],
  "stream": true
}`;

const sqlSample = `SELECT u.id, u.email, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > '2025-01-01'
GROUP BY u.id, u.email
ORDER BY orders DESC
LIMIT 10;`;

export default function CodeBlockDefault() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <CodeBlock
        language="ts"
        code={tsSample}
        renderCode={(src) => <ShikiCodeBody code={src} language="ts" />}
      />
      <CodeBlock
        language="json"
        code={jsonSample}
        renderCode={(src) => <ShikiCodeBody code={src} language="json" />}
      />
      <CodeBlock
        language="sql"
        code={sqlSample}
        renderCode={(src) => <ShikiCodeBody code={src} language="sql" />}
      />
    </div>
  );
}
