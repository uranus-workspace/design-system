import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
} from '@uranus-workspace/design-system';

export default function FieldDefault() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field>
        <FieldLabel htmlFor="email">E-mail corporativo</FieldLabel>
        <Input id="email" type="email" placeholder="voce@empresa.com.br" />
        <FieldDescription>Usaremos para contato da Uranus.</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
