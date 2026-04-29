import type { Meta, StoryObj } from '@storybook/react';
import { PlanPanel } from './plan-panel.js';

const meta: Meta<typeof PlanPanel> = {
  title: 'AI/Fluxos/PlanPanel',
  component: PlanPanel,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PlanPanel>;

export const Default: Story = {
  args: {
    stages: [
      { id: '1', title: 'Mapear endpoints da API', status: 'done' },
      { id: '2', title: 'Esboçar fluxo de dados', status: 'running', description: 'em progresso' },
      { id: '3', title: 'Identificar pontos de cache', status: 'queued' },
      { id: '4', title: 'Resumir trade-offs', status: 'queued' },
    ],
  },
};
