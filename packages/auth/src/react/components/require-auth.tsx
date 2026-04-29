import { type ReactNode, useEffect } from 'react';
import type { SignInOptions } from '../../core/types.js';
import { useAuth } from '../hooks/use-auth.js';

export interface RequireAuthProps {
  children: ReactNode;
  /** Render while resolving the session. Default: `null`. */
  fallback?: ReactNode;
  /** Forwarded to `login(...)`. Default `returnTo` is `window.location.pathname`. */
  loginOptions?: Omit<SignInOptions, 'returnTo'> & { returnTo?: string };
  /**
   * Override the redirect-to-login behavior. Useful for tests or custom flows
   * (e.g. show an inline `<SignInForm>` instead of redirecting).
   */
  onUnauthenticated?: () => void;
}

/**
 * Wraps a route that requires authentication. While loading, renders
 * `fallback`. When unauthenticated, kicks off the login redirect with the
 * current path saved as `returnTo`. Renders `children` only when authenticated.
 */
export function RequireAuth({
  children,
  fallback = null,
  loginOptions,
  onUnauthenticated,
}: RequireAuthProps) {
  const { status, login } = useAuth();

  useEffect(() => {
    if (status !== 'unauthenticated') return;
    if (onUnauthenticated) {
      onUnauthenticated();
      return;
    }
    if (typeof window === 'undefined') return;
    const returnTo =
      loginOptions?.returnTo ?? `${window.location.pathname}${window.location.search}`;
    login({ ...loginOptions, returnTo }).catch(() => {
      // error already captured in provider state
    });
  }, [status, login, loginOptions, onUnauthenticated]);

  if (status === 'authenticated') return <>{children}</>;
  return <>{fallback}</>;
}
