import { useCallback } from 'react';
import { useAuth } from './use-auth.js';

/**
 * Returns a stable getter for the current access token. Prefer this over
 * pulling `client` directly when you need a function reference for
 * `createAuthorizedFetch` or interceptor wiring.
 */
export function useAccessToken(): () => Promise<string | null> {
  const { getToken } = useAuth();
  return useCallback(() => getToken(), [getToken]);
}
