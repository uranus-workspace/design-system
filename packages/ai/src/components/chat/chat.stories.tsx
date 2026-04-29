import type { Meta, StoryObj } from '@storybook/react';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { UranusChatStatus, UranusMessage } from '../../types.js';
import type { ComposerSubmitPayload } from '../composer/composer-root.js';
import { Chat } from './chat.js';

const meta: Meta = {
  title: 'AI/Fluxos/Chat',
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

function Demo({
  initialMessages,
  initialStatus = 'idle',
}: { initialMessages?: UranusMessage[]; initialStatus?: UranusChatStatus } = {}) {
  const [messages, setMessages] = useState<UranusMessage[]>(initialMessages ?? []);
  const [status, setStatus] = useState<UranusChatStatus>(initialStatus);

  const onSend = (payload: ComposerSubmitPayload) => {
    const userMsg: UranusMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: payload.text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setStatus('submitted');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          authorName: 'Uranus',
          text: 'Demo response — envie qualquer mensagem para ver o fluxo.',
          streaming: false,
        },
      ]);
      setStatus('idle');
    }, 900);
  };

  return (
    <div style={{ height: 720 }} className="flex flex-col">
      <Chat
        messages={messages}
        status={status}
        onSend={onSend}
        onStop={() => setStatus('idle')}
        header={<Chat.Header title="Uranus Chat" description="GPT-5 · modo padrão" />}
        emptyState={
          <Chat.Empty>
            <Sparkles aria-hidden className="size-7 text-primary" />
            <h3 className="text-base font-semibold">Como posso ajudar?</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Use a barra abaixo para perguntar, anexar arquivos ou falar.
            </p>
          </Chat.Empty>
        }
      />
    </div>
  );
}

export const Empty: Story = { render: () => <Demo /> };

export const Conversation: Story = {
  render: () => (
    <Demo
      initialMessages={[
        { id: '1', role: 'user', text: 'Como posso integrar a Uranus AI no meu app?' },
        {
          id: '2',
          role: 'assistant',
          authorName: 'Uranus',
          text: 'Você pode começar instalando `@uranus-workspace/ai` e usando o hook `useUranusChat` em uma route handler do Next.js.',
        },
      ]}
    />
  ),
};

export const Streaming: Story = {
  render: () => (
    <Demo
      initialStatus="streaming"
      initialMessages={[
        { id: '1', role: 'user', text: 'Me conta sobre vocês.' },
        {
          id: '2',
          role: 'assistant',
          authorName: 'Uranus',
          text: 'A Uranus Technologies constrói sistemas de IA aplicada. Continuamos respondendo',
          streaming: true,
        },
      ]}
    />
  ),
};
