import { describe, expect, it } from 'vitest';
import { hasClientRole, hasRealmRole, parseKeycloakRoles } from './roles.js';

const profile = {
  realm_access: { roles: ['admin', 'user'] },
  resource_access: {
    'omnifisco-web': { roles: ['analyst'] },
    'omnifisco-api': { roles: ['user', 'reporter'] },
  },
};

describe('parseKeycloakRoles', () => {
  it('aggregates realm_access and resource_access roles deduplicated', () => {
    expect(parseKeycloakRoles(profile).sort()).toEqual(
      ['admin', 'analyst', 'reporter', 'user'].sort(),
    );
  });

  it('returns an empty array for null/undefined profiles', () => {
    expect(parseKeycloakRoles(null)).toEqual([]);
    expect(parseKeycloakRoles(undefined)).toEqual([]);
  });
});

describe('hasRealmRole', () => {
  it('matches realm-level roles only', () => {
    expect(hasRealmRole(profile, 'admin')).toBe(true);
    expect(hasRealmRole(profile, 'analyst')).toBe(false);
  });
});

describe('hasClientRole', () => {
  it('matches roles for a specific client id', () => {
    expect(hasClientRole(profile, 'omnifisco-web', 'analyst')).toBe(true);
    expect(hasClientRole(profile, 'omnifisco-web', 'reporter')).toBe(false);
    expect(hasClientRole(profile, 'omnifisco-api', 'reporter')).toBe(true);
  });
});
