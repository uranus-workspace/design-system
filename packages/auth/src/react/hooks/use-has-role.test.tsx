import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { AuthUser } from '../../core/types.js';
import { MockAuthProvider } from '../../screens/_testing/mock-auth-provider.js';
import { useHasRole } from './use-has-role.js';
import { useIsAdmin } from './use-is-admin.js';
import { useRoles } from './use-roles.js';
import { useUser } from './use-user.js';

const ADMIN_USER: AuthUser = {
  id: '1',
  email: 'a@b.com',
  name: 'Admin',
  roles: ['admin', 'editor'],
  profile: {},
};

function HookProbe() {
  const user = useUser();
  const roles = useRoles();
  const hasEditor = useHasRole('editor');
  const hasOwner = useHasRole('owner');
  const isAdmin = useIsAdmin();
  return (
    <ul>
      <li data-testid="user">{user?.email ?? 'anonymous'}</li>
      <li data-testid="roles">{roles.join(',')}</li>
      <li data-testid="editor">{String(hasEditor)}</li>
      <li data-testid="owner">{String(hasOwner)}</li>
      <li data-testid="admin">{String(isAdmin)}</li>
    </ul>
  );
}

describe('auth hooks', () => {
  it('exposes the authenticated user, roles, and role checks', () => {
    render(
      <MockAuthProvider status="authenticated" user={ADMIN_USER}>
        <HookProbe />
      </MockAuthProvider>,
    );
    expect(screen.getByTestId('user').textContent).toBe('a@b.com');
    expect(screen.getByTestId('roles').textContent).toBe('admin,editor');
    expect(screen.getByTestId('editor').textContent).toBe('true');
    expect(screen.getByTestId('owner').textContent).toBe('false');
    expect(screen.getByTestId('admin').textContent).toBe('true');
  });

  it('returns nothing when unauthenticated', () => {
    render(
      <MockAuthProvider status="unauthenticated" user={null}>
        <HookProbe />
      </MockAuthProvider>,
    );
    expect(screen.getByTestId('user').textContent).toBe('anonymous');
    expect(screen.getByTestId('roles').textContent).toBe('');
    expect(screen.getByTestId('admin').textContent).toBe('false');
  });
});
