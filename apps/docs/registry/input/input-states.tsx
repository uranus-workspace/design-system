import { Input, Label } from '@uranus-workspace/design-system';

export default function InputStates() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Padrão</Label>
        <Input id="name" placeholder="Digite seu nome" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="disabled">Desabilitado</Label>
        <Input id="disabled" disabled defaultValue="Somente leitura" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="invalid">Inválido</Label>
        <Input
          id="invalid"
          aria-invalid="true"
          defaultValue="email@inválido"
          className="border-destructive focus-visible:ring-destructive"
        />
      </div>
    </div>
  );
}
