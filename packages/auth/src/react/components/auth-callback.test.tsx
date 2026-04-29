import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RETURN_TO_STORAGE_KEY } from '../../core/storage.js';
import type { AuthClient } from '../../core/types.js';
import { MockAuthProvider } from '../../screens/_testing/mock-auth-provider.js';
import { AuthCallback } from './auth-callback.js';

function buildClientStub(overrides: Partial<AuthClient> = {}): Partial<AuthClient> {
  return {
    signinRedirectCallback: vi.fn().mockResolvedValue(null),
    ...overrides,
  };
}

describe('<AuthCallback />', () => {
  it('invokes signinRedirectCallback once and forwards the persisted returnTo', async () => {
    window.sessionStorage.setItem(RETURN_TO_STORAGE_KEY, '/dashboard');
    const client = buildClientStub();
    const onSuccess = vi.fn();
    render(
      <MockAuthProvider client={client}>
        <AuthCallback onSuccess={onSuccess} />
      </MockAuthProvider>,
    );
    await waitFor(() => expect(client.signinRedirectCallback).toHaveBeenCalled());
    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('/dashboard'));
    expect(window.sessionStorage.getItem(RETURN_TO_STORAGE_KEY)).toBeNull();
  });

  it('reports errors via onError', async () => {
    const error = new Error('boom');
    const client = buildClientStub({
      signinRedirectCallback: vi.fn().mockRejectedValue(error),
    });
    const onError = vi.fn();
    render(
      <MockAuthProvider client={client}>
        <AuthCallback onError={onError} errorFallback={(e) => <span>{e.message}</span>} />
      </MockAuthProvider>,
    );
    await waitFor(() => expect(onError).toHaveBeenCalledWith(error));
  });
});
