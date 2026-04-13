'use client';

import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@uranus-workspace/design-system';

export default function PopoverForm() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Compartilhar link</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="popover-share-email">E-mail do convidado</Label>
            <Input id="popover-share-email" type="email" placeholder="nome@empresa.com.br" />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit" size="sm">
              Enviar convite
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
