import { describe, expect, it, vi } from 'vitest';
import { createAuthorizedFetch } from './create-authorized-fetch.js';

describe('createAuthorizedFetch', () => {
  it('attaches Authorization header when a token is available', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    const authorizedFetch = createAuthorizedFetch(() => Promise.resolve('token-1'), {
      fetch: fetchMock,
    });
    await authorizedFetch('https://api.example.com/me');
    const request = fetchMock.mock.calls[0]?.[0] as Request;
    expect(request.headers.get('authorization')).toBe('Bearer token-1');
  });

  it('skips the header when getter returns null', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    const authorizedFetch = createAuthorizedFetch(() => null, { fetch: fetchMock });
    await authorizedFetch('https://api.example.com/me');
    const request = fetchMock.mock.calls[0]?.[0] as Request;
    expect(request.headers.get('authorization')).toBeNull();
  });

  it('invokes onUnauthorized for 401 responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 401 }));
    const onUnauthorized = vi.fn();
    const authorizedFetch = createAuthorizedFetch(() => 'tok', {
      fetch: fetchMock,
      onUnauthorized,
    });
    await authorizedFetch('https://api.example.com/me');
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });

  it('does not overwrite an existing Authorization header', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    const authorizedFetch = createAuthorizedFetch(() => 'tok', { fetch: fetchMock });
    await authorizedFetch('https://api.example.com/me', {
      headers: { Authorization: 'Bearer pre-set' },
    });
    const request = fetchMock.mock.calls[0]?.[0] as Request;
    expect(request.headers.get('authorization')).toBe('Bearer pre-set');
  });
});
