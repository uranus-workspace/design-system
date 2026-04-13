import type { Meta, StoryObj } from '@storybook/react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './chart.js';

const data = [
  { month: 'Jan', visits: 186 },
  { month: 'Fev', visits: 305 },
  { month: 'Mar', visits: 237 },
  { month: 'Abr', visits: 273 },
  { month: 'Mai', visits: 209 },
  { month: 'Jun', visits: 314 },
];

const config = {
  visits: { label: 'Visitas', color: 'var(--color-brand-400)' },
} satisfies ChartConfig;

const meta: Meta<typeof ChartContainer> = {
  title: 'Primitives/Chart',
  component: ChartContainer,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const Bars: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-[480px]">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="visits" fill="var(--color-visits)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};
