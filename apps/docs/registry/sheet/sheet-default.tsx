'use client';

import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@uranus-workspace/design-system';

export default function SheetDefault() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar perfil</SheetTitle>
          <SheetDescription>
            Atualize suas informações pessoais. As mudanças são aplicadas ao confirmar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          <div className="grid gap-2">
            <Label htmlFor="sheet-name">Nome</Label>
            <Input id="sheet-name" defaultValue="Gustavo Bertoi" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-email">E-mail</Label>
            <Input id="sheet-email" type="email" defaultValue="gustavo@uranus.com.br" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
          <Button>Salvar alterações</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
