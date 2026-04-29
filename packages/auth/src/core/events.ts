/** Constants for the events oidc-client-ts emits. Re-exported so the React
 * layer doesn't have to import oidc-client-ts directly just for strings. */
export const AUTH_EVENT = {
  userLoaded: 'userLoaded',
  userUnloaded: 'userUnloaded',
  userSignedOut: 'userSignedOut',
  silentRenewError: 'silentRenewError',
  accessTokenExpiring: 'accessTokenExpiring',
  accessTokenExpired: 'accessTokenExpired',
} as const;

export type AuthEventName = (typeof AUTH_EVENT)[keyof typeof AUTH_EVENT];
