import type { Meta, StoryObj } from '@storybook/react';
import { DollarSign, Users } from 'lucide-react';
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
    label: 'MRR',
    value: '$48.2k',
    icon: <DollarSign className="size-4" />,
    delta: { value: '+12%', direction: 'up', label: 'vs last month' },
  },
};

export const Negative: Story = {
  args: {
    label: 'Churn',
    value: '3.4%',
    icon: <Users className="size-4" />,
    delta: { value: '+0.4pp', direction: 'down', label: 'vs last month' },
    intent: 'negative',
  },
};

export const Neutral: Story = {
  args: {
    label: 'Active users',
    value: '1,284',
    delta: { value: '0%', direction: 'neutral', label: 'no change' },
  },
};

export const ValueOnly: Story = {
  args: {
    label: 'Total customers',
    value: '12,841',
  },
};
