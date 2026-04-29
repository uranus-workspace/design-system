'use client';

import { ConfirmDialog } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function ConfirmDialogDefault() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        Abrir confirmação
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Arquivar projeto Apollo?"
        description="O projeto sairá da listagem ativa, mas pode ser restaurado depois."
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}
