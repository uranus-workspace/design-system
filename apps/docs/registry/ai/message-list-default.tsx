'use client';

import { Message, MessageList } from '@uranus-workspace/ai';

const items = [
  { id: '1', role: 'user' as const, text: 'Resuma os princípios do design system.' },
  {
    id: '2',
    role: 'assistant' as const,
    text: 'Tokens de uma direção, composição-first nos blocks, e tudo passa por axe a11y.',
    name: 'Uranus',
  },
  { id: '3', role: 'user' as const, text: 'E animações?' },
  {
    id: '4',
    role: 'assistant' as const,
    text: 'Reusam as variantes de Motion em `lib/animations.ts` e respeitam `prefers-reduced-motion`.',
    name: 'Uranus',
  },
];

export default function MessageListDefault() {
  return (
    <div className="mx-auto h-[280px] w-full max-w-2xl rounded-lg border bg-background">
      <MessageList scrollKey={items.length}>
        {items.map((item) => (
          <Message key={item.id} role={item.role} name={item.name}>
            <Message.Content>{item.text}</Message.Content>
          </Message>
        ))}
      </MessageList>
    </div>
  );
}
