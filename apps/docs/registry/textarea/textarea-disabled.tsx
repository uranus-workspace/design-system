import { Label, Textarea } from '@uranus-workspace/design-system';

export default function TextareaDisabled() {
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor="readonly-notes">Notas internas</Label>
      <Textarea
        id="readonly-notes"
        disabled
        defaultValue="Este registro foi arquivado e não pode mais ser editado."
      />
    </div>
  );
}
