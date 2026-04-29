import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { StreamingText } from './streaming-text.js';

const meta: Meta<typeof StreamingText> = {
  title: 'AI/Mensagens/StreamingText',
  component: StreamingText,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StreamingText>;

const SAMPLE =
  'Posso ajudar você a integrar o `Chat` da Uranus em qualquer rota Next.js. ' +
  'Comece instalando `@uranus-workspace/ai` e ligando o `useUranusChat` à sua route handler.';

function Demo() {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (chars >= SAMPLE.length) return;
    const id = setTimeout(() => setChars((c) => c + 2), 25);
    return () => clearTimeout(id);
  }, [chars]);
  return <StreamingText text={SAMPLE.slice(0, chars)} streaming={chars < SAMPLE.length} />;
}

export const Streaming: Story = { render: () => <Demo /> };

export const Idle: Story = {
  args: { text: 'Resposta finalizada.' },
};
