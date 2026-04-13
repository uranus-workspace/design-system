import type { Meta, StoryObj } from '@storybook/react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './context-menu.js';

const meta: Meta<typeof ContextMenu> = {
  title: 'Primitives/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-80 items-center justify-center rounded-md border border-dashed text-sm">
        Clique com o botão direito
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Ações</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Copiar</ContextMenuItem>
        <ContextMenuItem>Duplicar</ContextMenuItem>
        <ContextMenuItem variant="destructive">Excluir</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
