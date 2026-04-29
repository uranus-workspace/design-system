import type { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth.js';
import { useHasRole } from '../hooks/use-has-role.js';
import { RequireAuth } from './require-auth.js';

export interface RequireRoleProps {
  /** Role(s) the user must have. Array = OR semantics (any match wins). */
  role: string | string[];
  children: ReactNode;
  /** Rendered while the auth status is still loading. Default: `null`. */
  fallback?: ReactNode;
  /** Rendered when authenticated *but* missing the role. Default: `null`. */
  forbidden?: ReactNode;
}

/**
 * Composes `<RequireAuth>` with a role check. Authentication is mandatory; the
 * role gate runs only after the user is signed in. Missing roles render
 * `forbidden` rather than triggering a re-login.
 */
export function RequireRole({
  role,
  children,
  fallback = null,
  forbidden = null,
}: RequireRoleProps) {
  return (
    <RequireAuth fallback={fallback}>
      <RoleGate role={role} forbidden={forbidden}>
        {children}
      </RoleGate>
    </RequireAuth>
  );
}

function RoleGate({
  role,
  children,
  forbidden,
}: {
  role: string | string[];
  children: ReactNode;
  forbidden: ReactNode;
}) {
  const { status } = useAuth();
  const allowed = useHasRole(role);
  if (status !== 'authenticated') return null;
  return allowed ? <>{children}</> : <>{forbidden}</>;
}
