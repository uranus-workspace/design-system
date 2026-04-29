/**
 * Builds the URL Keycloak expects for end-session redirects. Keycloak's
 * end-session endpoint accepts `post_logout_redirect_uri` and `client_id` —
 * we expose this helper so callers don't have to remember the path.
 *
 * `authority` is the full realm URL (e.g.
 * `https://auth.uranus.com.br/realms/uranus`).
 */
export interface KeycloakLogoutUrlOptions {
  authority: string;
  clientId: string;
  postLogoutRedirectUri: string;
  /** Optional `id_token_hint` — recommended by Keycloak when available. */
  idTokenHint?: string;
}

export function keycloakLogoutUrl({
  authority,
  clientId,
  postLogoutRedirectUri,
  idTokenHint,
}: KeycloakLogoutUrlOptions): string {
  const url = new URL(`${authority.replace(/\/$/, '')}/protocol/openid-connect/logout`);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('post_logout_redirect_uri', postLogoutRedirectUri);
  if (idTokenHint) url.searchParams.set('id_token_hint', idTokenHint);
  return url.toString();
}
