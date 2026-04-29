import type { Meta, StoryObj } from '@storybook/react';
import { TrendingUp, Users } from 'lucide-react';
import { StatCard } from './stat-card.js';

const meta: Meta<typeof StatCard> = {
  title: 'Blocks/Data/StatCard',
  component: StatCard,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    label: 'Receita recorrente (MRR)',
    value: 'R$ 48.200',
    icon: <TrendingUp className="size-4" aria-hidden />,
    delta: { value: '+12%', direction: 'up', label: 'vs. mês anterior' },
  },
};

export const Negative: Story = {
  args: {
    label: 'Churn',
    value: '3,4%',
    icon: <Users className="size-4" aria-hidden />,
    delta: { value: '+0,4pp', direction: 'down', label: 'vs. mês anterior' },
    intent: 'negative',
  },
};

export const Neutral: Story = {
  args: {
    label: 'Usuários ativos',
    value: '1.284',
    delta: { value: '0%', direction: 'neutral', label: 'sem mudança' },
  },
};

export const ValueOnly: Story = {
  args: {
    label: 'Clientes totais',
    value: '12.841',
  },
};
