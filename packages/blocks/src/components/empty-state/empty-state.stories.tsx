import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { FolderPlus } from 'lucide-react';
import { EmptyState } from './empty-state.js';

const meta: Meta<typeof EmptyState> = {
  title: 'Blocks/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <FolderPlus aria-hidden />,
    title: 'Nenhum projeto ainda',
    description: 'Crie seu primeiro projeto para começar a colaborar com a equipe.',
    actions: (
      <>
        <Button variant="outline">Saiba mais</Button>
        <Button>Novo projeto</Button>
      </>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: 'Sem dados por aqui',
  },
};
