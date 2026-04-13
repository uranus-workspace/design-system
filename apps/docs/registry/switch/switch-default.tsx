import { Label, Switch } from '@uranus-workspace/design-system';

export default function SwitchDefault() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Receber notificações push</Label>
    </div>
  );
}
