import { useAuth } from './use-auth.js';

export function useRoles(): string[] {
  return useAuth().user?.roles ?? [];
}
