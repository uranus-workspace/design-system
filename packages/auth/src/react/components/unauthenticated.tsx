import type { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth.js';

export interface UnauthenticatedProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/** Renders `children` only when the user is unauthenticated. */
export function Unauthenticated({ children, fallback = null }: UnauthenticatedProps) {
  const { status } = useAuth();
  if (status === 'unauthenticated') return <>{children}</>;
  if (status === 'loading') return <>{fallback}</>;
  return null;
}
