/**
 * Decodes the *payload* of a JWT without verifying the signature. Use only on
 * the client to read claims you already trust — never to make security
 * decisions. Server-side verification lives in `nextjs/server/verify-token.ts`.
 */
export function decodeJwt<T = Record<string, unknown>>(token: string): T | null {
  const parts = token.split('.');
  if (parts.length < 2) return null;
  const payload = parts[1];
  if (!payload) return null;
  try {
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const normalized = padded.replace(/-/g, '+').replace(/_/g, '/');
    if (typeof atob === 'function') {
      const binary = atob(normalized);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
      const decoded = new TextDecoder('utf-8').decode(bytes);
      return JSON.parse(decoded) as T;
    }
    const decoded = Buffer.from(normalized, 'base64').toString('utf-8');
    return JSON.parse(decoded) as T;
  } catch {
    return null;
  }
}

/**
 * Returns true when the token's `exp` claim is in the past or missing. Treats
 * `exp` as seconds since the Unix epoch (RFC 7519). The `clockSkewSeconds`
 * argument lets callers be a bit more forgiving (Keycloak default is 30s).
 */
export function isExpired(token: string, clockSkewSeconds = 0): boolean {
  const claims = decodeJwt<{ exp?: number }>(token);
  if (!claims?.exp) return true;
  const nowSec = Math.floor(Date.now() / 1000);
  return claims.exp <= nowSec - clockSkewSeconds;
}

/**
 * Extracts a flat list of role strings from the OIDC profile. The default
 * implementation is generic — it walks well-known claim shapes (top-level
 * `roles`, then `realm_access.roles` for Keycloak compatibility).
 *
 * Apps that need a custom parser can pass their own to the React provider via
 * the `parseRoles` prop.
 */
export function getRoles(profile: Record<string, unknown> | null | undefined): string[] {
  if (!profile) return [];
  const top = (profile as { roles?: unknown }).roles;
  if (Array.isArray(top)) {
    return top.filter((value): value is string => typeof value === 'string');
  }
  const realmAccess = (profile as { realm_access?: { roles?: unknown } }).realm_access;
  if (realmAccess && Array.isArray(realmAccess.roles)) {
    return realmAccess.roles.filter((value): value is string => typeof value === 'string');
  }
  return [];
}
