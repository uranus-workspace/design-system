'use client';

import { CodeBlock } from '@uranus-workspace/ai';

const code = `'use client';

import { Chat, useUranusChat } from '@uranus-workspace/ai';

export function ChatPage() {
  const chat = useUranusChat({ api: '/api/chat' });

  return (
    <Chat
      messages={chat.messages}
      status={chat.status}
      mode={chat.mode}
      onModeChange={chat.setMode}
      onSend={({ text, attachments }) =>
        chat.sendMessage({ text, attachments })
      }
      onStop={chat.stop}
      onRegenerate={chat.regenerate}
    />
  );
}`;

export default function UseUranusChatDefault() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <CodeBlock language="tsx" code={code} />
    </div>
  );
}
