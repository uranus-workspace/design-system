'use client';

import { ConfirmDialog } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function ConfirmDialogDefault() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex justify-center p-2">
      <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)}>
        Abrir confirmação
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Confirmar ação"
        description="Esta operação não pode ser desfeita."
        onConfirm={() => {}}
      />
    </div>
  );
}
