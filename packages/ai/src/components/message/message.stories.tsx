import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { Copy, RefreshCw, ThumbsUp } from 'lucide-react';
import { Message } from './message.js';

const meta: Meta<typeof Message> = {
  title: 'AI/Mensagens/Message',
  component: Message,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Message>;

export const User: Story = {
  args: { role: 'user', timestamp: 'agora' },
  render: (args) => (
    <Message {...args}>
      <Message.Content>Como faço para integrar a Uranus AI no meu app Next.js?</Message.Content>
    </Message>
  ),
};

export const Assistant: Story = {
  args: { role: 'assistant', name: 'Uranus', timestamp: 'há 2s' },
  render: (args) => (
    <Message {...args}>
      <Message.Content>
        Você pode começar instalando `@uranus-workspace/ai` e importando o bloco `Chat`.
      </Message.Content>
      <Message.Actions>
        <Button variant="ghost" size="icon" aria-label="Copiar">
          <Copy aria-hidden className="size-3.5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Refazer">
          <RefreshCw aria-hidden className="size-3.5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Curtir">
          <ThumbsUp aria-hidden className="size-3.5" />
        </Button>
      </Message.Actions>
    </Message>
  ),
};

export const System: Story = {
  args: { role: 'system' },
  render: (args) => (
    <Message {...args}>
      <Message.Content>O modelo foi atualizado para `uranus-haiku-2`.</Message.Content>
    </Message>
  ),
};
