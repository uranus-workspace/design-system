import type { Meta, StoryObj } from '@storybook/react';
import { MockAuthProvider } from '../_testing/mock-auth-provider.js';
import { OidcCallbackScreen } from './oidc-callback-screen.js';

const meta: Meta<typeof OidcCallbackScreen> = {
  title: 'Auth/Screens/OidcCallbackScreen',
  component: OidcCallbackScreen,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockAuthProvider
        status="loading"
        user={null}
        client={{ signinRedirectCallback: async () => null as never }}
      >
        <Story />
      </MockAuthProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof OidcCallbackScreen>;

export const Loading: Story = {
  args: {
    message: 'Conectando com seu provedor…',
    onSuccess: () => {},
  },
};

export const WithBrandPanel: Story = {
  args: {
    variant: 'split',
    brandPanel: (
      <div className="flex h-full w-full flex-col justify-between p-12 text-white">
        <div className="text-2xl font-semibold tracking-tight">Uranus</div>
        <p className="text-base text-white/70">Estamos finalizando o login.</p>
      </div>
    ),
    message: 'Conectando…',
    onSuccess: () => {},
  },
};
