import type { Meta, StoryObj } from '@storybook/react';
import { AuthDivider } from './auth-divider.js';
import { OAuthProviderButton } from './oauth-provider-button.js';

const meta: Meta = {
  title: 'Blocks/Auth/Composition',
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;

/** Stack OAuth triggers and a divider independently of credential forms — compose beside `SignInForm`/`SignUpForm`. */
export const OAuthProviderButtonAndDivider: StoryObj = {
  render: () => (
    <div className="flex w-[min(360px,calc(100vw-32px))] flex-col gap-2">
      <OAuthProviderButton onClick={() => {}} provider="google">
        Continue with Google
      </OAuthProviderButton>
      <OAuthProviderButton onClick={() => {}} provider="microsoft">
        Continue with Microsoft
      </OAuthProviderButton>
      <AuthDivider label="ou continue com" />
      <p className="text-center text-xs text-muted-foreground">
        Slot reservado para email/senha abaixo
      </p>
    </div>
  ),
};
