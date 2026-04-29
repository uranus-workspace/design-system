interface KeycloakAccess {
  roles?: string[];
}

interface KeycloakProfile {
  realm_access?: KeycloakAccess;
  resource_access?: Record<string, KeycloakAccess>;
}

/**
 * Aggregates `realm_access.roles` and every `resource_access[clientId].roles`
 * entry into a single de-duplicated array. Pass to `<AuthProvider parseRoles={...}>`
 * when the IdP is Keycloak.
 */
export function parseKeycloakRoles(profile: Record<string, unknown> | null | undefined): string[] {
  if (!profile) return [];
  const typed = profile as unknown as KeycloakProfile;
  const out = new Set<string>();
  for (const role of typed.realm_access?.roles ?? []) out.add(role);
  if (typed.resource_access) {
    for (const access of Object.values(typed.resource_access)) {
      for (const role of access.roles ?? []) out.add(role);
    }
  }
  return Array.from(out);
}

/** True when the user has the role at the realm level. */
export function hasRealmRole(
  profile: Record<string, unknown> | null | undefined,
  role: string,
): boolean {
  const typed = (profile ?? {}) as unknown as KeycloakProfile;
  return Boolean(typed.realm_access?.roles?.includes(role));
}

/** True when the user has the role for a specific client (`resource_access[clientId].roles`). */
export function hasClientRole(
  profile: Record<string, unknown> | null | undefined,
  clientId: string,
  role: string,
): boolean {
  const typed = (profile ?? {}) as unknown as KeycloakProfile;
  return Boolean(typed.resource_access?.[clientId]?.roles?.includes(role));
}
