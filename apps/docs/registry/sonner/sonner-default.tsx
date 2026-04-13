'use client';

import { Button, Toaster, toast } from '@uranus-workspace/design-system';

export default function SonnerDefault() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() =>
          toast.success('Projeto salvo', {
            description: 'Todas as mudanças foram publicadas com sucesso.',
          })
        }
      >
        Salvar projeto
      </Button>
      <Toaster />
    </div>
  );
}
