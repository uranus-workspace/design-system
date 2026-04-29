import type { Meta, StoryObj } from '@storybook/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageMarkdown } from './message-markdown.js';

const meta: Meta<typeof MessageMarkdown> = {
  title: 'AI/Mensagens/MessageMarkdown',
  component: MessageMarkdown,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MessageMarkdown>;

const SAMPLE = `# Bem-vindo

Olá, sou a **Uranus**. Algumas coisas que posso fazer:

- Responder com **markdown**.
- Renderizar \`código inline\` e blocos:

\`\`\`tsx
import { Chat } from '@uranus-workspace/ai';
\`\`\`

Para mais detalhes, visite [uranus.com.br](https://uranus.com.br/).`;

export const Default: Story = {
  render: () => (
    <MessageMarkdown markdownComponent={ReactMarkdown} remarkPlugins={[remarkGfm]}>
      {SAMPLE}
    </MessageMarkdown>
  ),
};
