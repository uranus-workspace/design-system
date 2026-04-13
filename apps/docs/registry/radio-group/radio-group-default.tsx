import { Label, RadioGroup, RadioGroupItem } from '@uranus-workspace/design-system';

export default function RadioGroupDefault() {
  return (
    <RadioGroup defaultValue="monthly">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="monthly" id="billing-monthly" />
        <Label htmlFor="billing-monthly">Mensal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yearly" id="billing-yearly" />
        <Label htmlFor="billing-yearly">Anual (economize 20%)</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="lifetime" id="billing-lifetime" />
        <Label htmlFor="billing-lifetime">Vitalício</Label>
      </div>
    </RadioGroup>
  );
}
