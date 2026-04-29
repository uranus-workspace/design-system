import { type JWTPayload, type JWTVerifyResult, createRemoteJWKSet, jwtVerify } from 'jose';

export interface VerifyTokenOptions {
  /** JWKS endpoint (e.g. `<authority>/protocol/openid-connect/certs`). */
  jwksUri: string;
  /** Expected `iss` claim. Strongly recommended. */
  issuer?: string;
  /** Expected `aud` claim. Strongly recommended. */
  audience?: string | string[];
  /** Acceptable clock skew in seconds. Defaults to 5. */
  clockToleranceSeconds?: number;
  /** Custom JWKS resolver — pass an existing `createRemoteJWKSet` for sharing. */
  getKeySet?: ReturnType<typeof createRemoteJWKSet>;
}

/**
 * Lazy JWKS cache keyed by URL. `createRemoteJWKSet` already caches inside the
 * returned function, but reusing the same key set across requests in the same
 * Lambda/Edge runtime is what makes the second call cheap.
 */
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function getJwks(uri: string) {
  let cached = jwksCache.get(uri);
  if (!cached) {
    cached = createRemoteJWKSet(new URL(uri));
    jwksCache.set(uri, cached);
  }
  return cached;
}

/**
 * Verifies a JWT against the configured JWKS endpoint and returns the decoded
 * payload + protected header. Use inside Next.js middleware or Server
 * Components — never on the client (we never trust client-side verification).
 *
 * Throws when the token is missing claims, expired, signed by an unknown key,
 * or the issuer/audience do not match.
 */
export async function verifyToken<T extends JWTPayload = JWTPayload>(
  token: string,
  options: VerifyTokenOptions,
): Promise<JWTVerifyResult & { payload: T }> {
  const jwks = options.getKeySet ?? getJwks(options.jwksUri);
  const result = await jwtVerify<T>(token, jwks, {
    issuer: options.issuer,
    audience: options.audience,
    clockTolerance: options.clockToleranceSeconds ?? 5,
  });
  return result;
}
