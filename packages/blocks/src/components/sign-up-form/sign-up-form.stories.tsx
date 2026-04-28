import type { Meta, StoryObj } from '@storybook/react';
import { AuthDivider, OAuthProviderButton } from '../auth-social/index.js';
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

export const HybridSocialAndCredentials: Story = {
  args: {
    signInHref: '#',
    onSubmit: () => {},
    socialProviders: (
      <>
        <OAuthProviderButton provider="google" onClick={() => {}}>
          Continue with Google
        </OAuthProviderButton>
        <AuthDivider />
      </>
    ),
  },
};

export const OAuthOnlyShell: Story = {
  args: {
    credentials: 'hidden',
    signInHref: '#',
    socialProviders: (
      <>
        <OAuthProviderButton provider="google" onClick={() => {}}>
          Continue with Google
        </OAuthProviderButton>
      </>
    ),
  },
};

export const WithError: Story = {
  args: {
    error: 'Este email já está em uso. Tente entrar.',
    signInHref: '#',
    onSubmit: () => {},
  },
};
