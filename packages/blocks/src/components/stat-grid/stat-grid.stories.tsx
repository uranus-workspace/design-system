import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '../stat-card/stat-card.js';
import { StatGrid } from './stat-grid.js';

const meta: Meta<typeof StatGrid> = {
  title: 'Blocks/Data/StatGrid',
  component: StatGrid,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StatGrid>;

const cards = (
  <>
    <StatCard label="MRR" value="$48.2k" delta={{ value: '+12%', direction: 'up' }} />
    <StatCard label="Churn" value="3.4%" delta={{ value: '+0.4pp', direction: 'down' }} />
    <StatCard label="Active users" value="1,284" delta={{ value: '0%', direction: 'neutral' }} />
    <StatCard label="Net new" value="148" delta={{ value: '+6', direction: 'up' }} />
  </>
);

export const Auto: Story = {
  args: { children: cards },
};

export const FourColumns: Story = {
  args: { columns: 4, children: cards },
};

export const ThreeColumns: Story = {
  args: { columns: 3, children: cards },
};
