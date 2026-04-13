'use client';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@uranus-workspace/design-system';
import { Settings2 } from 'lucide-react';

export default function PopoverDefault() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Settings2 />
          Preferências
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Densidade</h4>
          <p className="text-sm text-muted-foreground">
            Escolha quanta informação aparece em cada tela. Você pode alterar a qualquer momento nas
            configurações da conta.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
