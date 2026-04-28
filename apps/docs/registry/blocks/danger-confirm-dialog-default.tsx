'use client';

import { DangerConfirmDialog } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function DangerConfirmDialogDefault() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex justify-center p-2">
      <Button type="button" size="sm" variant="destructive" onClick={() => setOpen(true)}>
        Excluir
      </Button>
      <DangerConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Excluir permanentemente?"
        description="Todos os dados associados serão removidos."
        confirmationText="delete"
        onConfirm={() => {}}
      />
    </div>
  );
}
