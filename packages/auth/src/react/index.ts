export { AuthProvider, type AuthProviderProps } from './auth-provider.js';
export { AuthContext, type AuthContextValue } from './auth-context.js';

// Hooks
export { useAuth } from './hooks/use-auth.js';
export { useUser } from './hooks/use-user.js';
export { useRoles } from './hooks/use-roles.js';
export { useHasRole } from './hooks/use-has-role.js';
export { useIsAdmin } from './hooks/use-is-admin.js';
export { useAccessToken } from './hooks/use-access-token.js';

// Components
export { Authenticated, type AuthenticatedProps } from './components/authenticated.js';
export { Unauthenticated, type UnauthenticatedProps } from './components/unauthenticated.js';
export { RequireAuth, type RequireAuthProps } from './components/require-auth.js';
export { RequireRole, type RequireRoleProps } from './components/require-role.js';
export { AuthCallback, type AuthCallbackProps } from './components/auth-callback.js';
export {
  SilentRenewCallback,
  type SilentRenewCallbackProps,
} from './components/silent-renew-callback.js';
