import type { User, UserManager, UserManagerSettings } from 'oidc-client-ts';

/** Lifecycle states the React provider exposes downstream. */
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'error';

/** Storage strategy for tokens. `'session'` is the default and recommended. */
export type AuthStorageKind = 'session' | 'local';

/**
 * Subset of the OIDC ID token / access token decoded into a structure most
 * apps can render directly. Roles are filled in via `parseKeycloakRoles` (or a
 * custom parser) when the IdP is Keycloak — for any other IdP, expose the
 * underlying `profile` and let the consumer compute their own roles.
 */
export interface AuthUser {
  /** OIDC subject (`sub` claim). Stable across sessions. */
  id: string;
  email?: string;
  name?: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  /** Aggregated roles. Populated by helpers such as `parseKeycloakRoles`. */
  roles: string[];
  /** Raw `id_token` claims. */
  profile: Record<string, unknown>;
}

/**
 * Configuration accepted by `createAuthClient` and `<AuthProvider>`. Shaped to
 * be a thin layer on top of `UserManagerSettings` from `oidc-client-ts` while
 * giving us defaults (sessionStorage, PKCE, scope) and an opinionated
 * `extraQueryParams` slot for `kc_idp_hint`.
 */
export interface AuthClientConfig {
  authority: string;
  clientId: string;
  redirectUri: string;
  postLogoutRedirectUri?: string;
  silentRedirectUri?: string;
  /** Defaults to `'openid email profile'`. */
  scope?: string;
  /** Defaults to `true`. */
  automaticSilentRenew?: boolean;
  /** Defaults to `'session'`. Pass a `Storage` instance for full control. */
  storage?: AuthStorageKind | Storage;
  /** Forwarded to `signinRedirect`. Common use: `{ kc_idp_hint: 'google' }`. */
  extraQueryParams?: Record<string, string>;
  /** Optional callback fired when a silent renew fails. */
  onSilentRenewError?: (error: Error) => void;
  /**
   * Escape hatch — extra fields merged into `UserManagerSettings` *after* the
   * client builds its defaults. Use sparingly.
   */
  userManagerSettings?: Partial<UserManagerSettings>;
}

/** Options accepted by `login(...)`. Mirrors `signinRedirect` from oidc-client-ts. */
export interface SignInOptions {
  /** Where to land after a successful login. Persisted in sessionStorage. */
  returnTo?: string;
  /** Convenience for Keycloak — equivalent to `extraQueryParams.kc_idp_hint`. */
  idpHint?: string;
  /** Extra `extraQueryParams` merged on top of the client config. */
  extraQueryParams?: Record<string, string>;
  /** OIDC `prompt` parameter (e.g. `'login'` to force re-auth). */
  prompt?: string;
}

export interface SignOutOptions {
  /** Skip end-session redirect at the IdP and only clear local state. */
  localOnly?: boolean;
  /** Override the configured `postLogoutRedirectUri` for this call only. */
  postLogoutRedirectUri?: string;
}

/** Public surface returned by `createAuthClient`. */
export interface AuthClient {
  /** Underlying `UserManager` from oidc-client-ts. Lazy — null on the server. */
  readonly userManager: UserManager | null;
  /** Resolved configuration after defaults are applied. */
  readonly config: Required<
    Pick<
      AuthClientConfig,
      'authority' | 'clientId' | 'redirectUri' | 'scope' | 'automaticSilentRenew'
    >
  > &
    AuthClientConfig;
  getUser(): Promise<User | null>;
  signinRedirect(options?: SignInOptions): Promise<void>;
  signinRedirectCallback(url?: string): Promise<User>;
  signinSilentCallback(url?: string): Promise<void>;
  signoutRedirect(options?: SignOutOptions): Promise<void>;
  removeUser(): Promise<void>;
  getAccessToken(): Promise<string | null>;
}

export interface AuthError extends Error {
  code: 'sign-in-failed' | 'callback-failed' | 'silent-renew-failed' | 'unknown';
  cause?: unknown;
}
