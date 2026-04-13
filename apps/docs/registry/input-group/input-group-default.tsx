import { InputGroup, InputGroupAddon, InputGroupInput } from '@uranus-workspace/design-system';
import { Search } from 'lucide-react';

export default function InputGroupDefault() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Buscar na Uranus…" />
    </InputGroup>
  );
}
