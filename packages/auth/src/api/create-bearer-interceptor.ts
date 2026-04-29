import type { AccessTokenGetter } from './create-authorized-fetch.js';

/** Minimal axios-style request config the interceptor mutates. */
export interface BearerInterceptorRequest {
  headers?: Record<string, string> | Headers;
}

export interface CreateBearerInterceptorOptions {
  headerName?: string;
  scheme?: string;
}

/**
 * Returns a function suitable for axios' `request.use(interceptor)` /
 * ky's `beforeRequest` / Apollo's `setContext`. It only adds the bearer
 * header — error handling for 401 stays with the consumer because each HTTP
 * library reports it differently.
 */
export function createBearerInterceptor(
  getToken: AccessTokenGetter,
  options: CreateBearerInterceptorOptions = {},
) {
  const headerName = options.headerName ?? 'Authorization';
  const scheme = options.scheme ?? 'Bearer ';
  return async function attachBearer<T extends BearerInterceptorRequest>(config: T): Promise<T> {
    const token = await getToken();
    if (!token) return config;
    if (config.headers instanceof Headers) {
      if (!config.headers.has(headerName)) config.headers.set(headerName, `${scheme}${token}`);
      return config;
    }
    const headers = (config.headers ?? {}) as Record<string, string>;
    if (!headers[headerName]) headers[headerName] = `${scheme}${token}`;
    config.headers = headers;
    return config;
  };
}
