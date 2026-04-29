'use client';

import { CodeBlock } from '@uranus-workspace/ai';

const code = `import { useUranusChat } from '@uranus-workspace/ai';

const chat = useUranusChat({ api: '/api/chat' });
chat.sendMessage({ text: 'Olá' });`;

export default function CodeBlockDefault() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <CodeBlock language="ts" code={code} />
    </div>
  );
}
