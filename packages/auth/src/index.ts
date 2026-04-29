// Core re-exports (runtime-safe)
export { createAuthClient } from './core/auth-client.js';
export { decodeJwt, getRoles, isExpired } from './core/token.js';
export {
  consumeReturnTo,
  persistReturnTo,
  RETURN_TO_STORAGE_KEY,
} from './core/storage.js';
export { AUTH_EVENT, type AuthEventName } from './core/events.js';
export type {
  AuthClient,
  AuthClientConfig,
  AuthError,
  AuthStatus,
  AuthStorageKind,
  AuthUser,
  SignInOptions,
  SignOutOptions,
} from './core/types.js';

// React surface
export * from './react/index.js';
