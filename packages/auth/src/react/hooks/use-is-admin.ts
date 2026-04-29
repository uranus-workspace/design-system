import { useHasRole } from './use-has-role.js';

/**
 * Convenience hook for the most common authorization check. Matches both the
 * generic `'admin'` role and Keycloak's `'realm-admin'` to cover both
 * conventions without consumers having to remember either.
 */
export function useIsAdmin(): boolean {
  return useHasRole(['admin', 'realm-admin']);
}
