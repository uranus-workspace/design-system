import type { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth.js';

export interface AuthenticatedProps {
  children: ReactNode;
  /** Render while the auth status is still resolving. Default: `null`. */
  fallback?: ReactNode;
}

/** Renders `children` only when the user is authenticated. */
export function Authenticated({ children, fallback = null }: AuthenticatedProps) {
  const { status } = useAuth();
  if (status === 'authenticated') return <>{children}</>;
  if (status === 'loading') return <>{fallback}</>;
  return null;
}
