import type { AuthUser } from '../../core/types.js';
import { useAuth } from './use-auth.js';

export function useUser(): AuthUser | null {
  return useAuth().user;
}
