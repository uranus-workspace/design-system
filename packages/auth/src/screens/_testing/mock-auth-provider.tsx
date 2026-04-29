import { type ReactNode, useMemo } from 'react';
import type { AuthClient, AuthError, AuthStatus, AuthUser } from '../../core/types.js';
import { AuthContext, type AuthContextValue } from '../../react/auth-context.js';

export interface MockAuthProviderProps {
  status?: AuthStatus;
  user?: AuthUser | null;
  error?: AuthError | null;
  /** Spy override for `login` — useful in stories that demonstrate clicks. */
  onLogin?: (...args: Parameters<AuthContextValue['login']>) => void;
  onLogout?: (...args: Parameters<AuthContextValue['logout']>) => void;
  /** Replace the embedded fake `AuthClient`. */
  client?: Partial<AuthClient>;
  /** Token returned by `getToken()`. */
  token?: string | null;
  children: ReactNode;
}

/**
 * Lightweight mock provider used by Storybook stories and unit tests. Avoids
 * importing oidc-client-ts so stories never hit the network and a11y tests
 * stay deterministic.
 */
export function MockAuthProvider({
  status = 'authenticated',
  user = {
    id: 'mock-user',
    email: 'mock@uranus.com.br',
    name: 'Astro Pioneer',
    givenName: 'Astro',
    familyName: 'Pioneer',
    roles: ['user'],
    profile: {},
  },
  error = null,
  onLogin,
  onLogout,
  client,
  token = 'mock-token',
  children,
}: MockAuthProviderProps) {
  const value = useMemo<AuthContextValue>(() => {
    const fakeClient: AuthClient = {
      userManager: null,
      config: {
        authority: 'https://example.com/realms/test',
        clientId: 'mock-client',
        redirectUri: 'http://localhost/callback',
        scope: 'openid email profile',
        automaticSilentRenew: true,
      },
      async getUser() {
        return null;
      },
      async signinRedirect(opts) {
        onLogin?.(opts);
      },
      async signinRedirectCallback() {
        return null as never;
      },
      async signinSilentCallback() {},
      async signoutRedirect(opts) {
        onLogout?.(opts);
      },
      async removeUser() {},
      async getAccessToken() {
        return token;
      },
      ...client,
    };
    return {
      status,
      user: status === 'authenticated' ? user : null,
      error,
      client: fakeClient,
      async login(opts) {
        onLogin?.(opts);
      },
      async logout(opts) {
        onLogout?.(opts);
      },
      async getToken() {
        return token;
      },
    };
  }, [client, error, onLogin, onLogout, status, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
