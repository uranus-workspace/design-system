import type { AuthClient, SignInOptions } from '../core/types.js';

export interface KeycloakSignInOptions extends Omit<SignInOptions, 'idpHint' | 'extraQueryParams'> {
  /** Keycloak IdP alias — forwarded as `kc_idp_hint`. */
  idpHint?: string;
  /** Skip the Keycloak account chooser by passing `prompt=login`. */
  forceLogin?: boolean;
  /** Extra query params merged on top of Keycloak's. */
  extraQueryParams?: Record<string, string>;
}

/**
 * Convenience wrapper around `client.signinRedirect()` that maps Keycloak-shaped
 * options to the generic OIDC config. Keeps the rest of the package agnostic
 * while giving Keycloak users an ergonomic entrypoint.
 */
export async function keycloakSignIn(
  client: AuthClient,
  options: KeycloakSignInOptions = {},
): Promise<void> {
  const { idpHint, forceLogin, extraQueryParams, ...rest } = options;
  await client.signinRedirect({
    ...rest,
    idpHint,
    extraQueryParams,
    prompt: forceLogin ? 'login' : rest.prompt,
  });
}
