import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { UsageCard } from './usage-card.js';

const meta: Meta<typeof UsageCard> = {
  title: 'Blocks/Growth/UsageCard',
  component: UsageCard,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof UsageCard>;

export const Default: Story = {
  args: {
    label: 'Armazenamento',
    description: 'Espaço usado no workspace.',
    used: 3,
    limit: 10,
    unit: 'GB',
  },
};

export const Warning: Story = {
  args: {
    label: 'Chamadas de API',
    used: 8500,
    limit: 10000,
    unit: 'requests',
    cta: (
      <Button size="sm" variant="outline">
        Aumentar limite
      </Button>
    ),
  },
};

export const Danger: Story = {
  args: {
    label: 'Membros',
    used: 50,
    limit: 50,
    unit: 'usuários',
    cta: <Button size="sm">Adicionar slots</Button>,
  },
};
