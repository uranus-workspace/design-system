import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';
import { DangerConfirmDialog } from './danger-confirm-dialog.js';

const meta: Meta<typeof DangerConfirmDialog> = {
  title: 'Blocks/Feedback/DangerConfirmDialog',
  component: DangerConfirmDialog,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DangerConfirmDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Apagar projeto
        </Button>
        <DangerConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Apagar Apollo?"
          description="Essa ação é irreversível. Todos os dados, comentários e logs do projeto serão removidos."
          confirmationText="apollo"
          confirmLabel="Apagar projeto"
          onConfirm={() => {}}
        />
      </>
    );
  },
};
