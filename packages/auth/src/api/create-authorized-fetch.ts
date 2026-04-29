export type AccessTokenGetter = () => Promise<string | null> | string | null;

export interface CreateAuthorizedFetchOptions {
  /** Base `fetch` implementation. Defaults to global `fetch`. */
  fetch?: typeof fetch;
  /**
   * Called when the API returns 401. Default behavior is to do nothing — the
   * consumer is expected to surface the error or call `client.signinRedirect()`.
   */
  onUnauthorized?: (response: Response, request: Request) => void | Promise<void>;
  /** Override the request header. Defaults to `Authorization`. */
  headerName?: string;
  /** Override the prefix. Defaults to `Bearer `. */
  scheme?: string;
}

/**
 * Wraps `fetch` so every outbound request carries `Authorization: Bearer
 * <token>`. The token getter is decoupled from React — pass `useAccessToken()`
 * inside a component or pull `client.getAccessToken` outside.
 *
 * On 401 the wrapper invokes `onUnauthorized` and re-throws the response so
 * the caller can decide what to do. We intentionally do *not* auto-redirect —
 * that decision belongs at the route boundary.
 */
export function createAuthorizedFetch(
  getToken: AccessTokenGetter,
  options: CreateAuthorizedFetchOptions = {},
): typeof fetch {
  const baseFetch = options.fetch ?? globalThis.fetch;
  const headerName = options.headerName ?? 'Authorization';
  const scheme = options.scheme ?? 'Bearer ';
  if (!baseFetch) {
    throw new Error('[uranus/auth] No fetch implementation available — pass `fetch` explicitly.');
  }

  return async function authorizedFetch(input, init) {
    const token = await getToken();
    const request = new Request(input, init);
    if (token && !request.headers.has(headerName)) {
      request.headers.set(headerName, `${scheme}${token}`);
    }
    const response = await baseFetch(request);
    if (response.status === 401 && options.onUnauthorized) {
      await options.onUnauthorized(response, request);
    }
    return response;
  };
}
