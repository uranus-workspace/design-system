export { createAuthClient } from './auth-client.js';
export { decodeJwt, getRoles, isExpired } from './token.js';
export {
  consumeReturnTo,
  createStateStore,
  persistReturnTo,
  RETURN_TO_STORAGE_KEY,
  resolveStorage,
} from './storage.js';
export { AUTH_EVENT, type AuthEventName } from './events.js';
export type {
  AuthClient,
  AuthClientConfig,
  AuthError,
  AuthStatus,
  AuthStorageKind,
  AuthUser,
  SignInOptions,
  SignOutOptions,
} from './types.js';
