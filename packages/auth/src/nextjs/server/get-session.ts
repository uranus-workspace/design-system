import type { JWTPayload } from 'jose';
import { getRoles } from '../../core/token.js';
import type { AuthUser } from '../../core/types.js';
import { type VerifyTokenOptions, verifyToken } from './verify-token.js';

export interface GetSessionOptions extends VerifyTokenOptions {
  /**
   * Function returning the access token from the request. The shape varies by
   * deployment — typical sources are `cookies().get('access_token')`,
   * `request.headers.get('authorization')`, or a server action helper.
   */
  getAccessToken: () => Promise<string | null | undefined> | string | null | undefined;
  /** Custom roles parser. Defaults to the generic `getRoles` from `core/token`. */
  parseRoles?: (profile: Record<string, unknown>) => string[];
}

export interface ServerSession {
  user: AuthUser;
  /** Raw JWT claims — useful when the consumer needs custom fields. */
  claims: JWTPayload;
}

function toAuthUser(claims: JWTPayload, parseRoles: GetSessionOptions['parseRoles']): AuthUser {
  const profile = claims as unknown as Record<string, unknown>;
  return {
    id: typeof claims.sub === 'string' ? claims.sub : '',
    email: typeof profile.email === 'string' ? profile.email : undefined,
    name: typeof profile.name === 'string' ? profile.name : undefined,
    givenName: typeof profile.given_name === 'string' ? profile.given_name : undefined,
    familyName: typeof profile.family_name === 'string' ? profile.family_name : undefined,
    picture: typeof profile.picture === 'string' ? profile.picture : undefined,
    roles: (parseRoles ?? getRoles)(profile),
    profile,
  };
}

/**
 * Validates the access token from the current request and returns a
 * normalized `ServerSession` (user + raw claims) — or `null` when missing /
 * invalid. Built for the Next.js App Router but framework-agnostic in spirit:
 * the caller supplies `getAccessToken` so we never depend on `next/headers`.
 */
export async function getSession(options: GetSessionOptions): Promise<ServerSession | null> {
  const token = await options.getAccessToken();
  if (!token) return null;
  try {
    const result = await verifyToken(token, options);
    return {
      user: toAuthUser(result.payload, options.parseRoles),
      claims: result.payload,
    };
  } catch {
    return null;
  }
}
