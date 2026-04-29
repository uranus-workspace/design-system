import type { User } from 'oidc-client-ts';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createAuthClient } from '../core/auth-client.js';
import { getRoles as defaultParseRoles } from '../core/token.js';
import type {
  AuthClient,
  AuthClientConfig,
  AuthError,
  AuthStatus,
  AuthUser,
  SignInOptions,
  SignOutOptions,
} from '../core/types.js';
import { AuthContext, type AuthContextValue } from './auth-context.js';

type ParseRoles = (profile: Record<string, unknown> | null | undefined) => string[];

interface AuthProviderBaseProps {
  children: ReactNode;
  /** Custom roles parser. Defaults to `getRoles` from `core/token`. */
  parseRoles?: ParseRoles;
  /** Render while resolving the existing session on mount. */
  fallback?: ReactNode;
  /** Fired the first time we know whether the user is authenticated. */
  onReady?: (status: AuthStatus, user: AuthUser | null) => void;
}

interface AuthProviderConfigProps extends AuthProviderBaseProps {
  config: AuthClientConfig;
  client?: never;
}

interface AuthProviderClientProps extends AuthProviderBaseProps {
  client: AuthClient;
  config?: never;
}

export type AuthProviderProps = AuthProviderConfigProps | AuthProviderClientProps;

function toAuthUser(user: User | null, parseRoles: ParseRoles): AuthUser | null {
  if (!user) return null;
  const profile = (user.profile ?? {}) as Record<string, unknown>;
  return {
    id: (profile.sub as string | undefined) ?? user.profile?.sub ?? '',
    email: profile.email as string | undefined,
    name: profile.name as string | undefined,
    givenName: profile.given_name as string | undefined,
    familyName: profile.family_name as string | undefined,
    picture: profile.picture as string | undefined,
    roles: parseRoles(profile),
    profile,
  };
}

function toAuthError(error: unknown, code: AuthError['code'] = 'unknown'): AuthError {
  const original = error instanceof Error ? error : new Error(String(error));
  const wrapped = original as AuthError;
  wrapped.code = code;
  if (!('cause' in wrapped) || wrapped.cause === undefined) wrapped.cause = error;
  return wrapped;
}

/**
 * Provider that hydrates the OIDC session, listens to silent renew / logout
 * events, and exposes a normalized `{ status, user, error, login, logout,
 * getToken }` value to descendants. Safe to render inside a Server Component
 * tree because the underlying `UserManager` is lazy — it is only instantiated
 * once `useEffect` runs in the browser.
 */
export function AuthProvider(props: AuthProviderProps) {
  const { children, parseRoles = defaultParseRoles, fallback = null, onReady } = props;

  const clientRef = useRef<AuthClient | null>(props.client ?? null);
  if (!clientRef.current && props.config) {
    clientRef.current = createAuthClient(props.config);
  }
  const client = clientRef.current;
  if (!client) {
    throw new Error('[uranus/auth] <AuthProvider> requires either `config` or `client`.');
  }

  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const readyFired = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const manager = client.userManager;
    if (!manager) return;

    let cancelled = false;

    const settle = (next: AuthStatus, nextUser: AuthUser | null) => {
      if (cancelled) return;
      setStatus(next);
      setUser(nextUser);
      if (!readyFired.current) {
        readyFired.current = true;
        onReadyRef.current?.(next, nextUser);
      }
    };

    const handleUserLoaded = (rawUser: User) => {
      const mapped = toAuthUser(rawUser, parseRoles);
      setError(null);
      settle('authenticated', mapped);
    };

    const handleUserUnloaded = () => {
      settle('unauthenticated', null);
    };

    const handleSilentRenewError = (renewError: Error) => {
      setError(toAuthError(renewError, 'silent-renew-failed'));
    };

    const handleAccessTokenExpired = () => {
      settle('unauthenticated', null);
    };

    manager.events.addUserLoaded(handleUserLoaded);
    manager.events.addUserUnloaded(handleUserUnloaded);
    manager.events.addUserSignedOut(handleUserUnloaded);
    manager.events.addSilentRenewError(handleSilentRenewError);
    manager.events.addAccessTokenExpired(handleAccessTokenExpired);

    client
      .getUser()
      .then((rawUser) => {
        if (cancelled) return;
        if (!rawUser || rawUser.expired) {
          settle('unauthenticated', null);
          return;
        }
        settle('authenticated', toAuthUser(rawUser, parseRoles));
      })
      .catch((err) => {
        if (cancelled) return;
        setError(toAuthError(err));
        settle('error', null);
      });

    return () => {
      cancelled = true;
      manager.events.removeUserLoaded(handleUserLoaded);
      manager.events.removeUserUnloaded(handleUserUnloaded);
      manager.events.removeUserSignedOut(handleUserUnloaded);
      manager.events.removeSilentRenewError(handleSilentRenewError);
      manager.events.removeAccessTokenExpired(handleAccessTokenExpired);
    };
  }, [client, parseRoles]);

  const login = useCallback(
    async (options?: SignInOptions) => {
      try {
        await client.signinRedirect(options);
      } catch (err) {
        const wrapped = toAuthError(err, 'sign-in-failed');
        setError(wrapped);
        setStatus('error');
        throw wrapped;
      }
    },
    [client],
  );

  const logout = useCallback(
    async (options?: SignOutOptions) => {
      await client.signoutRedirect(options);
    },
    [client],
  );

  const getToken = useCallback(() => client.getAccessToken(), [client]);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, error, client, login, logout, getToken }),
    [status, user, error, client, login, logout, getToken],
  );

  if (status === 'loading' && fallback !== null) {
    return <AuthContext.Provider value={value}>{fallback}</AuthContext.Provider>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.displayName = 'AuthProvider';
