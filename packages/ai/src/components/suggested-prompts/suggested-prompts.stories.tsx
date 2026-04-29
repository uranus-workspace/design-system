import type { Meta, StoryObj } from '@storybook/react';
import { SuggestedPrompts } from './suggested-prompts.js';

const meta: Meta<typeof SuggestedPrompts> = {
  title: 'AI/Composer/SuggestedPrompts',
  component: SuggestedPrompts,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SuggestedPrompts>;

export const Default: Story = {
  args: {
    prompts: [
      {
        title: 'Resumir documento',
        description: 'Cole um link ou anexe o PDF para resumir em bullets.',
        prompt: 'Resuma este documento em 5 bullets:',
      },
      {
        title: 'Comparar produtos',
        description: 'Receba uma tabela com prós e contras.',
        prompt: 'Compare os produtos: …',
      },
      {
        title: 'Gerar SQL',
        description: 'Diga o esquema e descreva o que quer consultar.',
        prompt: 'Crie um SQL para:',
      },
      {
        title: 'Escrever email',
        description: 'Mensagem profissional em português.',
        prompt: 'Escreva um email para …',
      },
    ],
    onSelect: (prompt) => alert(prompt),
  },
};
