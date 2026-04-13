import type { Meta, StoryObj } from '@storybook/react';
import { Inbox } from 'lucide-react';
import { Button } from './button/button.js';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty.js';

const meta: Meta<typeof Empty> = {
  title: 'Primitives/Empty',
  component: Empty,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>Caixa de entrada vazia</EmptyTitle>
        <EmptyDescription>Quando novas mensagens chegarem, elas aparecerão aqui.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Atualizar</Button>
      </EmptyContent>
    </Empty>
  ),
};
