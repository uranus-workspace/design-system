import { Label, RadioGroup, RadioGroupItem } from '@uranus-workspace/design-system';

export default function RadioGroupHorizontal() {
  return (
    <RadioGroup
      defaultValue="md"
      orientation="horizontal"
      className="flex flex-row items-center gap-6"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="sm" id="size-sm" />
        <Label htmlFor="size-sm">Pequeno</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="md" id="size-md" />
        <Label htmlFor="size-md">Médio</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="lg" id="size-lg" />
        <Label htmlFor="size-lg">Grande</Label>
      </div>
    </RadioGroup>
  );
}
