import { Label, Textarea } from '@uranus-workspace/design-system';

export default function TextareaDefault() {
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor="feedback">Seu feedback</Label>
      <Textarea id="feedback" placeholder="Conte o que achou da nova versão da Uranus…" rows={5} />
    </div>
  );
}
