'use client';

import { DetailDrawer } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function DetailDrawerDefault() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        Ver detalhes do cliente
      </Button>
      <DetailDrawer
        open={open}
        onOpenChange={setOpen}
        title="Cliente #042 — Apollo Tech"
        description="Conta empresarial · Plano Pro · Atualizado há 2 minutos."
        footer={
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
              Fechar
            </Button>
            <Button type="button" size="sm">
              Editar conta
            </Button>
          </div>
        }
      >
        <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">CNPJ</dt>
            <dd className="mt-0.5 font-medium">12.345.678/0001-90</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">MRR</dt>
            <dd className="mt-0.5 font-medium">R$ 4.890,00</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Owner</dt>
            <dd className="mt-0.5 font-medium">alice@apollo.tech</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Cliente desde</dt>
            <dd className="mt-0.5 font-medium">12 mar 2024</dd>
          </div>
        </dl>
      </DetailDrawer>
    </div>
  );
}
