import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { ChartCard } from './chart-card.js';

const meta: Meta<typeof ChartCard> = {
  title: 'Blocks/Data/ChartCard',
  component: ChartCard,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ChartCard>;

const PlaceholderChart = () => (
  <div className="flex h-48 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
    Slot do gráfico (use ChartContainer aqui)
  </div>
);

export const Default: Story = {
  args: {
    title: 'Receita',
    description: 'Receita mensal nos últimos 12 meses.',
    children: <PlaceholderChart />,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Conversão',
    description: 'Taxa por funil.',
    actions: (
      <Button size="sm" variant="outline">
        Filtrar
      </Button>
    ),
    children: <PlaceholderChart />,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Sessões',
    description: 'Últimos 30 dias.',
    children: <PlaceholderChart />,
    footer: 'Atualizado há 5 minutos',
  },
};
