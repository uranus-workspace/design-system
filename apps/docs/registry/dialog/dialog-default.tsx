'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@uranus-workspace/design-system';

export default function DialogDefault() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar perfil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações. As mudanças são salvas quando você confirmar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="profile-name">Nome</Label>
            <Input id="profile-name" defaultValue="Gustavo Bertoi" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="profile-handle">@handle</Label>
            <Input id="profile-handle" defaultValue="gustavo" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
