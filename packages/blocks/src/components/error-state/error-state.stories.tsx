import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { ServerCrash } from 'lucide-react';
import { ErrorState } from './error-state.js';

const meta: Meta<typeof ErrorState> = {
  title: 'Blocks/Feedback/ErrorState',
  component: ErrorState,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  args: {
    title: 'Erro ao carregar o dashboard',
    description: 'Não foi possível buscar os dados. Tente novamente em alguns segundos.',
    onRetry: () => {},
  },
};

export const CustomIconAndActions: Story = {
  args: {
    title: 'Servidor indisponível',
    description: 'A API de pagamentos não respondeu em tempo hábil.',
    icon: <ServerCrash className="size-6" />,
    actions: (
      <>
        <Button variant="outline" size="sm">
          Reportar
        </Button>
        <Button size="sm">Tentar de novo</Button>
      </>
    ),
  },
};
