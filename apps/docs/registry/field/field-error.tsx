import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@uranus-workspace/design-system';

export default function FieldErrorExample() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field>
        <FieldLabel htmlFor="role">Cargo</FieldLabel>
        <FieldContent>
          <Input id="role" aria-invalid="true" defaultValue="" placeholder="CTO" />
          <FieldError>Informe o seu cargo na empresa.</FieldError>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
