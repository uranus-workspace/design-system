import { Input, Label } from '@uranus-workspace/design-system';

export default function LabelDefault() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="username">Nome de usuário</Label>
      <Input id="username" placeholder="uranus" />
    </div>
  );
}
