import type { Meta, StoryObj } from '@storybook/react';
import { Rocket } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert.js';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <Rocket />
      <AlertTitle>Bem-vindo à Uranus</AlertTitle>
      <AlertDescription>Seu ambiente cósmico está pronto para decolar.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Erro de autenticação</AlertTitle>
      <AlertDescription>Credenciais inválidas. Tente novamente.</AlertDescription>
    </Alert>
  ),
};
