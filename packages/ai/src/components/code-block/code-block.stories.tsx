import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './code-block.js';

const meta: Meta<typeof CodeBlock> = {
  title: 'AI/Mensagens/CodeBlock',
  component: CodeBlock,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CodeBlock>;

const sample = `import { Chat, useUranusChat } from '@uranus-workspace/ai';

export function App() {
  const chat = useUranusChat({ api: '/api/chat' });
  return <Chat {...chat} />;
}`;

export const Default: Story = { args: { code: sample, language: 'tsx' } };
export const NoCopy: Story = { args: { code: sample, language: 'tsx', hideCopy: true } };
