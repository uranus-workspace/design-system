'use client';

import { ChatThreadList } from '@uranus-workspace/ai';
import { useState } from 'react';

const threads = [
  { id: '1', title: 'Roadmap Q3 — pacote AI', updatedAt: 'há 12 min', unread: true },
  { id: '2', title: 'Refatorar Composer', updatedAt: 'há 2 h' },
  { id: '3', title: 'Revisão dos tokens semânticos', updatedAt: 'ontem' },
  { id: '4', title: 'Pesquisa: melhores chats AI', updatedAt: 'segunda' },
];

export default function ChatThreadListDefault() {
  const [active, setActive] = useState('1');
  return (
    <div className="mx-auto h-[360px] w-full max-w-xs rounded-lg border bg-background">
      <ChatThreadList
        threads={threads}
        activeId={active}
        onSelect={(thread) => setActive(thread.id)}
        onCreate={() => {}}
      />
    </div>
  );
}
