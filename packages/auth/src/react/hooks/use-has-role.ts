import { useRoles } from './use-roles.js';

/**
 * Returns true when the current user has *any* of the requested roles. Pass an
 * array to require at least one match (OR semantics) — apps that want AND
 * semantics should compose multiple `useHasRole` calls.
 */
export function useHasRole(role: string | string[]): boolean {
  const roles = useRoles();
  const required = Array.isArray(role) ? role : [role];
  if (required.length === 0) return true;
  const set = new Set(roles);
  return required.some((value) => set.has(value));
}
