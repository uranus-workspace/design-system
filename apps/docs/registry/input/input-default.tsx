import { Input, Label } from '@uranus-workspace/design-system';

export default function InputDefault() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="voce@uranus.com.br" />
    </div>
  );
}
