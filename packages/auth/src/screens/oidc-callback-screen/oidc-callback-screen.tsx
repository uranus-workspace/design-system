import { AuthLayout, type AuthLayoutProps } from '@uranus-workspace/blocks';
import type { ReactNode } from 'react';
import { AuthCallback, type AuthCallbackProps } from '../../react/components/auth-callback.js';

export interface OidcCallbackScreenProps extends AuthCallbackProps {
  /** Visible while the OIDC code exchange is running. */
  message?: ReactNode;
  /** Brand panel content. */
  brandPanel?: ReactNode;
  /** Layout variant. Defaults to `centered`. */
  variant?: AuthLayoutProps['variant'];
  brandTone?: AuthLayoutProps['brandTone'];
}

/**
 * Drop-in callback screen — wraps `<AuthCallback>` inside `<AuthLayout>` and
 * renders a polite loading state. Pass `onSuccess` to integrate with the
 * router; otherwise it falls back to `window.location.replace`.
 */
export function OidcCallbackScreen({
  message = 'Conectando…',
  brandPanel,
  variant = 'centered',
  brandTone,
  ...callbackProps
}: OidcCallbackScreenProps) {
  return (
    <AuthLayout brandPanel={brandPanel} variant={variant} brandTone={brandTone}>
      <AuthCallback {...callbackProps}>
        <div
          className="flex flex-col items-center gap-4 text-center"
          role="status"
          aria-live="polite"
        >
          <div
            aria-hidden="true"
            className="size-8 animate-spin rounded-full border-2 border-muted border-t-foreground"
          />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </AuthCallback>
    </AuthLayout>
  );
}

OidcCallbackScreen.displayName = 'OidcCallbackScreen';
