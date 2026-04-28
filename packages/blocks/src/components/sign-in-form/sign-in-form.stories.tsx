import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { SignInForm } from './sign-in-form.js';

const meta: Meta<typeof SignInForm> = {
  title: 'Blocks/Auth/SignInForm',
  component: SignInForm,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SignInForm>;

export const Default: Story = {
  args: {
    description: 'Use seu email Uranus para entrar.',
    forgotPasswordHref: '#',
    signUpHref: '#',
    onSubmit: () => {},
  },
};

export const WithSocialProviders: Story = {
  args: {
    forgotPasswordHref: '#',
    signUpHref: '#',
    socialProviders: (
      <Button variant="outline" type="button">
        Continuar com Google
      </Button>
    ),
    onSubmit: () => {},
  },
};

export const WithError: Story = {
  args: {
    error: 'Email ou senha incorretos. Tente novamente.',
    onSubmit: () => {
      // noop
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    onSubmit: () => {
      // noop
    },
  },
};
