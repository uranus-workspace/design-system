import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { AuthDivider, OAuthProviderButton } from '../auth-social/index.js';
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

export const HybridDividerAndPrimitives: Story = {
  args: {
    description: 'SSO primeiro, ou email quando o produto permite credenciais.',
    forgotPasswordHref: '#',
    signUpHref: '#',
    onSubmit: () => {},
    socialProviders: (
      <>
        <OAuthProviderButton provider="google" onClick={() => {}}>
          Continuar com Google
        </OAuthProviderButton>
        <OAuthProviderButton provider="microsoft" onClick={() => {}}>
          Continuar com Microsoft
        </OAuthProviderButton>
        <AuthDivider label="ou continue com email" />
      </>
    ),
  },
};

export const OAuthOnlyShell: Story = {
  args: {
    credentials: 'hidden',
    signUpHref: '#',
    socialProviders: (
      <>
        <OAuthProviderButton provider="google" onClick={() => {}}>
          Continuar com Google
        </OAuthProviderButton>
        <OAuthProviderButton provider="microsoft" onClick={() => {}}>
          Continuar com Microsoft
        </OAuthProviderButton>
      </>
    ),
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
