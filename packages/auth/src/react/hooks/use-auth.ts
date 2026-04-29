import { useContext } from 'react';
import { AuthContext, type AuthContextValue } from '../auth-context.js';

/**
 * Returns the auth context. Throws if called outside of `<AuthProvider>` so
 * misuse is caught at render time, not as a runtime null deref.
 */
export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('[uranus/auth] useAuth() must be used inside <AuthProvider>.');
  }
  return value;
}
