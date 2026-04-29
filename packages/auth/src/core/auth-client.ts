import { UserManager, type UserManagerSettings } from 'oidc-client-ts';
import { createStateStore, persistReturnTo } from './storage.js';
import type { AuthClient, AuthClientConfig, SignInOptions, SignOutOptions } from './types.js';

const DEFAULT_SCOPE = 'openid email profile';

const isBrowser = typeof window !== 'undefined';

function buildSettings(config: AuthClientConfig): UserManagerSettings {
  const stateStore = createStateStore(config.storage ?? 'session');
  return {
    authority: config.authority,
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    post_logout_redirect_uri: config.postLogoutRedirectUri,
    silent_redirect_uri: config.silentRedirectUri,
    scope: config.scope ?? DEFAULT_SCOPE,
    automaticSilentRenew: config.automaticSilentRenew ?? true,
    response_type: 'code',
    loadUserInfo: true,
    userStore: stateStore,
    stateStore,
    extraQueryParams: config.extraQueryParams,
    ...config.userManagerSettings,
  };
}

/**
 * Wraps `oidc-client-ts` with:
 * - sane defaults (PKCE via `response_type=code`, sessionStorage, scope);
 * - SSR-safety — on the server, returns a stub whose methods reject;
 * - a `signinRedirect` that persists `returnTo` so the callback can read it;
 * - `idpHint` shorthand on top of `extraQueryParams`.
 *
 * The React provider is the canonical caller; consumers can also use this
 * directly when wiring the package outside of React.
 */
export function createAuthClient(config: AuthClientConfig): AuthClient {
  const resolvedConfig = {
    scope: DEFAULT_SCOPE,
    automaticSilentRenew: true,
    ...config,
  };

  let manager: UserManager | null = null;
  if (isBrowser) {
    manager = new UserManager(buildSettings(resolvedConfig));
    if (config.onSilentRenewError) {
      manager.events.addSilentRenewError((event) => {
        config.onSilentRenewError?.(event);
      });
    }
  }

  function ensureManager(): UserManager {
    if (!manager) {
      throw new Error(
        '[uranus/auth] AuthClient called from a non-browser environment. Wrap calls in useEffect or check `typeof window !== "undefined"`.',
      );
    }
    return manager;
  }

  return {
    userManager: manager,
    config: resolvedConfig as AuthClient['config'],
    async getUser() {
      if (!manager) return null;
      return manager.getUser();
    },
    async signinRedirect(options: SignInOptions = {}) {
      const mgr = ensureManager();
      persistReturnTo(options.returnTo);
      const extra: Record<string, string> = {
        ...resolvedConfig.extraQueryParams,
        ...options.extraQueryParams,
      };
      if (options.idpHint) extra.kc_idp_hint = options.idpHint;
      await mgr.signinRedirect({
        extraQueryParams: Object.keys(extra).length > 0 ? extra : undefined,
        prompt: options.prompt,
      });
    },
    async signinRedirectCallback(url?: string) {
      const mgr = ensureManager();
      return mgr.signinRedirectCallback(url);
    },
    async signinSilentCallback(url?: string) {
      const mgr = ensureManager();
      await mgr.signinSilentCallback(url);
    },
    async signoutRedirect(options: SignOutOptions = {}) {
      const mgr = ensureManager();
      if (options.localOnly) {
        await mgr.removeUser();
        return;
      }
      await mgr.signoutRedirect({
        post_logout_redirect_uri:
          options.postLogoutRedirectUri ?? resolvedConfig.postLogoutRedirectUri,
      });
    },
    async removeUser() {
      const mgr = ensureManager();
      await mgr.removeUser();
    },
    async getAccessToken() {
      if (!manager) return null;
      const user = await manager.getUser();
      return user?.access_token ?? null;
    },
  };
}
