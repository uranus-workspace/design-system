import type { Meta, StoryObj } from '@storybook/react';
import { OidcErrorScreen } from './oidc-error-screen.js';

const meta: Meta<typeof OidcErrorScreen> = {
  title: 'Auth/Screens/OidcErrorScreen',
  component: OidcErrorScreen,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof OidcErrorScreen>;

export const Default: Story = {
  args: {
    title: 'Não foi possível continuar',
    error: new Error('access_denied — usuário cancelou o login.'),
    onRetry: () => {},
  },
};

export const Network: Story = {
  args: {
    title: 'Falha de rede',
    description:
      'Não conseguimos contatar o provedor de identidade. Verifique sua conexão e tente novamente.',
    onRetry: () => {},
    retryLabel: 'Tentar de novo',
  },
};
