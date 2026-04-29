import type { Meta, StoryObj } from '@storybook/react';
import { StageList } from './stage-list.js';

const meta: Meta<typeof StageList> = {
  title: 'AI/Status/StageList',
  component: StageList,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StageList>;

export const Research: Story = {
  args: {
    stages: [
      { id: '1', title: 'Buscar repositórios da Uranus', status: 'done' },
      {
        id: '2',
        title: 'Ler manual de marca 2026',
        description: 'uranus.com.br/manual-de-marca · 3 seções',
        status: 'running',
      },
      { id: '3', title: 'Comparar com sistemas de referência', status: 'queued' },
      { id: '4', title: 'Escrever resposta', status: 'queued' },
    ],
  },
};

export const Errored: Story = {
  args: {
    stages: [
      { id: '1', title: 'Conectar à fonte', status: 'done' },
      { id: '2', title: 'Sincronizar dados', status: 'error', description: 'Timeout após 5s' },
      { id: '3', title: 'Resumir', status: 'skipped' },
    ],
  },
};
