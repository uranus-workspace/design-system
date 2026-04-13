import { Checkbox, Label } from '@uranus-workspace/design-system';

export default function CheckboxStates() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" defaultChecked />
        <Label htmlFor="newsletter">Receber novidades por email</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="beta" disabled />
        <Label htmlFor="beta">Participar do programa beta</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="archived" defaultChecked disabled />
        <Label htmlFor="archived">Incluir itens arquivados</Label>
      </div>
    </div>
  );
}
