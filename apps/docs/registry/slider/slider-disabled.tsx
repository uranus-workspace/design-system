import { Label, Slider } from '@uranus-workspace/design-system';

export default function SliderDisabled() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Label htmlFor="quota">Cota utilizada</Label>
      <Slider id="quota" defaultValue={[75]} max={100} step={1} disabled aria-label="Cota" />
    </div>
  );
}
