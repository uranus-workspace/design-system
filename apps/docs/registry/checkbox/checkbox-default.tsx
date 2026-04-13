import { Checkbox, Label } from '@uranus-workspace/design-system';

export default function CheckboxDefault() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Aceitar os termos de serviço</Label>
    </div>
  );
}
