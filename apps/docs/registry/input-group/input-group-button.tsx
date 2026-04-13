import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@uranus-workspace/design-system';
import { ArrowRight, Globe } from 'lucide-react';

export default function InputGroupButtonExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <Globe className="size-4" />
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="uranus.com.br" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="email" placeholder="voce@uranus.com.br" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="primary" size="sm">
            Entrar
            <ArrowRight className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
