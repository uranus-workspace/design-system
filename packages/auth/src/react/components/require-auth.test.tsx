import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MockAuthProvider } from '../../screens/_testing/mock-auth-provider.js';
import { Authenticated } from './authenticated.js';
import { RequireAuth } from './require-auth.js';
import { RequireRole } from './require-role.js';
import { Unauthenticated } from './unauthenticated.js';

describe('<Authenticated /> & <Unauthenticated />', () => {
  it('renders authenticated content only when signed in', () => {
    const { rerender } = render(
      <MockAuthProvider status="authenticated">
        <Authenticated>secret</Authenticated>
        <Unauthenticated>locked</Unauthenticated>
      </MockAuthProvider>,
    );
    expect(screen.getByText('secret')).toBeInTheDocument();
    expect(screen.queryByText('locked')).toBeNull();

    rerender(
      <MockAuthProvider status="unauthenticated" user={null}>
        <Authenticated>secret</Authenticated>
        <Unauthenticated>locked</Unauthenticated>
      </MockAuthProvider>,
    );
    expect(screen.queryByText('secret')).toBeNull();
    expect(screen.getByText('locked')).toBeInTheDocument();
  });
});

describe('<RequireAuth />', () => {
  it('renders children when authenticated', () => {
    render(
      <MockAuthProvider status="authenticated">
        <RequireAuth>protected</RequireAuth>
      </MockAuthProvider>,
    );
    expect(screen.getByText('protected')).toBeInTheDocument();
  });

  it('triggers login when unauthenticated', async () => {
    const onLogin = vi.fn();
    render(
      <MockAuthProvider status="unauthenticated" user={null} onLogin={onLogin}>
        <RequireAuth fallback={<span>loading</span>}>protected</RequireAuth>
      </MockAuthProvider>,
    );
    expect(screen.queryByText('protected')).toBeNull();
    await waitFor(() => expect(onLogin).toHaveBeenCalled());
  });
});

describe('<RequireRole />', () => {
  it('renders forbidden when authenticated but missing the role', () => {
    render(
      <MockAuthProvider
        status="authenticated"
        user={{
          id: '1',
          name: 'Reader',
          roles: ['user'],
          profile: {},
        }}
      >
        {/* biome-ignore lint/a11y/useValidAriaRole: `role` here is a custom prop, not aria-role */}
        <RequireRole role="admin" forbidden={<span>forbidden</span>}>
          dashboard
        </RequireRole>
      </MockAuthProvider>,
    );
    expect(screen.queryByText('dashboard')).toBeNull();
    expect(screen.getByText('forbidden')).toBeInTheDocument();
  });

  it('renders children when role matches', () => {
    render(
      <MockAuthProvider
        status="authenticated"
        user={{ id: '1', name: 'Boss', roles: ['admin'], profile: {} }}
      >
        {/* biome-ignore lint/a11y/useValidAriaRole: `role` here is a custom prop, not aria-role */}
        <RequireRole role="admin" forbidden={<span>forbidden</span>}>
          dashboard
        </RequireRole>
      </MockAuthProvider>,
    );
    expect(screen.getByText('dashboard')).toBeInTheDocument();
  });
});
