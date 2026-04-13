import { Label, Switch } from '@uranus-workspace/design-system';

export default function SwitchStates() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="sync" defaultChecked />
        <Label htmlFor="sync">Sincronização automática</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="analytics" disabled />
        <Label htmlFor="analytics">Compartilhar telemetria (bloqueado pela org)</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="maintenance" defaultChecked disabled />
        <Label htmlFor="maintenance">Modo manutenção</Label>
      </div>
    </div>
  );
}
