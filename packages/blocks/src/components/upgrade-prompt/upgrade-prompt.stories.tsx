import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { UpgradePrompt } from './upgrade-prompt.js';

const meta: Meta<typeof UpgradePrompt> = {
  title: 'Blocks/Growth/UpgradePrompt',
  component: UpgradePrompt,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'inline-radio', options: ['inline', 'card', 'banner'] },
  },
};
export default meta;
type Story = StoryObj<typeof UpgradePrompt>;

export const Card: Story = {
  args: {
    title: 'Desbloqueie projetos ilimitados',
    description: 'Faça upgrade para o plano Pro e remova o limite de 3 projetos.',
    action: <Button>Fazer upgrade</Button>,
  },
};

export const Inline: Story = {
  args: {
    layout: 'inline',
    title: 'Recurso disponível no plano Pro',
    description: 'Convide colegas e gere relatórios PDF.',
    action: (
      <Button size="sm" variant="outline">
        Ver planos
      </Button>
    ),
  },
};

export const Banner: Story = {
  args: {
    layout: 'banner',
    title: 'Black Friday: 30% off no plano anual',
    description: 'Apenas até 30 de novembro.',
    action: (
      <Button size="sm" variant="secondary">
        Aproveitar
      </Button>
    ),
  },
};
