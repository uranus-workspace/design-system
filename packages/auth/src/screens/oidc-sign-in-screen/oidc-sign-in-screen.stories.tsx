import type { Meta, StoryObj } from '@storybook/react';
import { MockAuthProvider } from '../_testing/mock-auth-provider.js';
import { OidcSignInScreen } from './oidc-sign-in-screen.js';

const meta: Meta<typeof OidcSignInScreen> = {
  title: 'Auth/Screens/OidcSignInScreen',
  component: OidcSignInScreen,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockAuthProvider status="unauthenticated" user={null}>
        <Story />
      </MockAuthProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof OidcSignInScreen>;

const BrandPanel = () => (
  <div className="flex h-full w-full flex-col justify-between p-12 text-white">
    <div className="text-2xl font-semibold tracking-tight">Uranus</div>
    <div className="space-y-2">
      <h2 className="text-3xl font-semibold leading-tight">Acesse sua conta</h2>
      <p className="text-base text-white/70">Single sign-on para todo o stack Uranus.</p>
    </div>
  </div>
);

export const SsoOnly: Story = {
  args: {
    brandPanel: <BrandPanel />,
    providers: ['google', 'microsoft'],
    idpHints: { google: 'google', microsoft: 'azure-ad' },
    credentials: 'hidden',
    title: 'Bem-vindo de volta',
    description: 'Continue com seu provedor corporativo para acessar a Uranus.',
    signUpHref: '#',
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    providers: ['google'],
    idpHints: { google: 'google' },
    credentials: 'hidden',
    title: 'Entre na Uranus',
    description: 'Continue com sua conta Google.',
  },
};

export const HybridSsoPlusPassword: Story = {
  args: {
    brandPanel: <BrandPanel />,
    providers: ['google', 'microsoft'],
    idpHints: { google: 'google', microsoft: 'azure-ad' },
    credentials: 'visible',
    onCredentialsSubmit: async () => {},
    title: 'Bem-vindo de volta',
    description: 'Use SSO ou email/senha para entrar.',
    signUpHref: '#',
  },
};
