import { type NextRequest, NextResponse } from 'next/server';
import { type VerifyTokenOptions, verifyToken } from './server/verify-token.js';

export interface CreateAuthMiddlewareOptions extends VerifyTokenOptions {
  /** Paths that bypass the auth check (e.g. `/login`, `/callback`). */
  publicPaths?: string[];
  /** Where to send unauthenticated requests. Defaults to `/login`. */
  loginPath?: string;
  /** Cookie name carrying the access token. Defaults to `access_token`. */
  cookieName?: string;
  /** Override the redirect logic — return `null` to fall through. */
  onUnauthenticated?: (req: NextRequest) => NextResponse | null;
}

function isPublic(pathname: string, publicPaths: string[]): boolean {
  return publicPaths.some((entry) => {
    if (entry === pathname) return true;
    if (entry.endsWith('/*')) {
      const prefix = entry.slice(0, -2);
      return pathname === prefix || pathname.startsWith(`${prefix}/`);
    }
    return pathname.startsWith(`${entry}/`);
  });
}

/**
 * Builds a Next.js middleware that gates routes behind a verified access
 * token. The token comes from `Authorization: Bearer …` first (handy for
 * service-to-service traffic) and falls back to the configured cookie.
 *
 * Verification uses `jose.jwtVerify` against the configured JWKS endpoint —
 * keys are cached automatically and rotate when Keycloak rotates them. On
 * failure we redirect to `loginPath?returnTo=…` so the sign-in screen knows
 * where to send the user back.
 */
export function createAuthMiddleware(options: CreateAuthMiddlewareOptions) {
  const {
    publicPaths = [],
    loginPath = '/login',
    cookieName = 'access_token',
    onUnauthenticated,
  } = options;

  return async function middleware(req: NextRequest): Promise<NextResponse> {
    const { pathname } = req.nextUrl;
    if (isPublic(pathname, publicPaths)) return NextResponse.next();

    const headerToken = req.headers.get('authorization');
    const bearer = headerToken?.toLowerCase().startsWith('bearer ')
      ? headerToken.slice(7).trim()
      : undefined;
    const cookieToken = req.cookies.get(cookieName)?.value;
    const token = bearer ?? cookieToken;

    if (!token) {
      const handled = onUnauthenticated?.(req);
      if (handled) return handled;
      const url = req.nextUrl.clone();
      url.pathname = loginPath;
      url.searchParams.set('returnTo', `${pathname}${req.nextUrl.search}`);
      return NextResponse.redirect(url);
    }

    try {
      await verifyToken(token, options);
      return NextResponse.next();
    } catch {
      const handled = onUnauthenticated?.(req);
      if (handled) return handled;
      const url = req.nextUrl.clone();
      url.pathname = loginPath;
      url.searchParams.set('returnTo', `${pathname}${req.nextUrl.search}`);
      url.searchParams.set('error', 'session-expired');
      return NextResponse.redirect(url);
    }
  };
}
