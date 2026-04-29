import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';
import { ConfirmDialog } from './confirm-dialog.js';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Blocks/Feedback/ConfirmDialog',
  component: ConfirmDialog,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'inline-radio', options: ['default', 'destructive'] },
  },
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <ConfirmDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          title="Sair sem salvar?"
          description="Você perderá as alterações que ainda não foram enviadas."
          confirmLabel="Sair"
          onConfirm={() => {}}
        />
      </>
    );
  },
  args: { intent: 'default', open: false, onOpenChange: () => {}, title: '', onConfirm: () => {} },
};

export const Destructive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Apagar
        </Button>
        <ConfirmDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          intent="destructive"
          title="Apagar projeto Apollo?"
          description="Esta ação é permanente. Não há como desfazer."
          confirmLabel="Apagar projeto"
          onConfirm={() => {}}
        />
      </>
    );
  },
  args: {
    intent: 'destructive',
    open: false,
    onOpenChange: () => {},
    title: '',
    onConfirm: () => {},
  },
};

export const Loading: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: 'Salvando…',
    description: 'Por favor aguarde enquanto sincronizamos as alterações.',
    confirmLabel: 'Salvar',
    onConfirm: () => {},
    loading: true,
  },
};
