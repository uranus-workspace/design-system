import { createContext } from 'react';
import type {
  AuthClient,
  AuthError,
  AuthStatus,
  AuthUser,
  SignInOptions,
  SignOutOptions,
} from '../core/types.js';

export interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  error: AuthError | null;
  client: AuthClient;
  login(options?: SignInOptions): Promise<void>;
  logout(options?: SignOutOptions): Promise<void>;
  getToken(): Promise<string | null>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
AuthContext.displayName = 'UranusAuthContext';
