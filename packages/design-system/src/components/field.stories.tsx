import type { Meta, StoryObj } from '@storybook/react';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from './field.js';
import { Input } from './input/input.js';

const meta: Meta<typeof Field> = {
  title: 'Primitives/Field',
  component: Field,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <FieldGroup className="w-96">
      <Field>
        <FieldLabel htmlFor="email">E-mail corporativo</FieldLabel>
        <Input id="email" placeholder="voce@empresa.com.br" />
        <FieldDescription>Usaremos para contato da Uranus.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="role">Cargo</FieldLabel>
        <FieldContent>
          <Input id="role" placeholder="CTO" />
          <FieldError>Informe o seu cargo na empresa.</FieldError>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};
