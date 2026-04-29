'use client';

import { Chat } from '@uranus-workspace/ai';
import type { UranusChatStatus, UranusMessage } from '@uranus-workspace/ai';
import { useState } from 'react';

const seed: UranusMessage[] = [
  {
    id: '1',
    role: 'user',
    text: 'Como integro o AI SDK com `@uranus-workspace/ai`?',
  },
  {
    id: '2',
    role: 'assistant',
    text: 'Use `useUranusChat({ api: "/api/chat" })` e passe `messages`/`status`/`onSend` para `Chat`.',
    authorName: 'Uranus',
  },
];

export default function ChatDefault() {
  const [messages, setMessages] = useState<UranusMessage[]>(seed);
  const [status, setStatus] = useState<UranusChatStatus>('idle');
  return (
    <div className="flex h-full min-h-[420px] w-full flex-1 flex-col rounded-lg border bg-background">
      <Chat
        messages={messages}
        status={status}
        onSend={(payload) => {
          setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text: payload.text }]);
          setStatus('submitted');
          setTimeout(() => {
            setMessages((m) => [
              ...m,
              {
                id: crypto.randomUUID(),
                role: 'assistant',
                text: 'Resposta simulada — em produção `useUranusChat` cuida do streaming.',
                authorName: 'Uranus',
              },
            ]);
            setStatus('idle');
          }, 1200);
        }}
        header={
          <Chat.Header
            title="Conversar com Uranus"
            description="Modelo Sonnet · streaming via AI SDK"
          />
        }
      />
    </div>
  );
}
