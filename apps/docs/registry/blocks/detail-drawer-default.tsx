'use client';

import { DetailDrawer } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function DetailDrawerDefault() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex justify-center p-2">
      <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)}>
        Ver detalhes
      </Button>
      <DetailDrawer
        open={open}
        onOpenChange={setOpen}
        title="Cliente #42"
        description="Registro sincronizado há 2 minutos."
        footer={
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </div>
        }
      >
        <p className="text-sm text-fd-muted-foreground">Campos e metadados do registro.</p>
      </DetailDrawer>
    </div>
  );
}
