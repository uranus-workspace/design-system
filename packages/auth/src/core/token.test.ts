import { describe, expect, it } from 'vitest';
import { decodeJwt, getRoles, isExpired } from './token.js';

function makeJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.signature`;
}

describe('decodeJwt', () => {
  it('decodes the payload of a JWT', () => {
    const token = makeJwt({ sub: 'user-1', email: 'a@b.com' });
    expect(decodeJwt<{ sub: string; email: string }>(token)).toEqual({
      sub: 'user-1',
      email: 'a@b.com',
    });
  });

  it('returns null for malformed tokens', () => {
    expect(decodeJwt('not-a-jwt')).toBeNull();
    expect(decodeJwt('')).toBeNull();
  });
});

describe('isExpired', () => {
  it('treats missing exp as expired', () => {
    expect(isExpired(makeJwt({ sub: 'a' }))).toBe(true);
  });

  it('returns false when exp is in the future', () => {
    const future = Math.floor(Date.now() / 1000) + 60;
    expect(isExpired(makeJwt({ exp: future }))).toBe(false);
  });

  it('returns true when exp is in the past', () => {
    const past = Math.floor(Date.now() / 1000) - 60;
    expect(isExpired(makeJwt({ exp: past }))).toBe(true);
  });
});

describe('getRoles', () => {
  it('reads top-level roles', () => {
    expect(getRoles({ roles: ['admin', 'editor'] })).toEqual(['admin', 'editor']);
  });

  it('falls back to realm_access.roles (Keycloak shape)', () => {
    expect(getRoles({ realm_access: { roles: ['admin'] } })).toEqual(['admin']);
  });

  it('returns an empty array when no roles claim is present', () => {
    expect(getRoles({})).toEqual([]);
    expect(getRoles(null)).toEqual([]);
  });
});
