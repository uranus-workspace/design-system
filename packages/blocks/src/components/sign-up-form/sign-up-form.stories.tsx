import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm } from './sign-up-form.js';

const meta: Meta<typeof SignUpForm> = {
  title: 'Blocks/Auth/SignUpForm',
  component: SignUpForm,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  args: {
    description: 'Crie sua conta Uranus em menos de um minuto.',
    signInHref: '#',
    onSubmit: () => {},
  },
};

export const WithError: Story = {
  args: {
    error: 'Este email já está em uso. Tente entrar.',
    signInHref: '#',
    onSubmit: () => {},
  },
};
