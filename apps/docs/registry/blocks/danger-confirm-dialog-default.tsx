'use client';

import { DangerConfirmDialog } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function DangerConfirmDialogDefault() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <Button type="button" variant="destructive" onClick={() => setOpen(true)}>
        Excluir workspace
      </Button>
      <DangerConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Excluir workspace permanentemente?"
        description="Todos os projetos, integrações e dados serão removidos. Esta ação não pode ser desfeita."
        confirmationText="excluir"
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}
