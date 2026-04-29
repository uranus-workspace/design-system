import { type ReactNode, useEffect, useRef, useState } from 'react';
import { consumeReturnTo } from '../../core/storage.js';
import { useAuth } from '../hooks/use-auth.js';

export interface AuthCallbackProps {
  /**
   * Called after a successful exchange with the IdP. Receives the persisted
   * `returnTo` (or `null` if none was stored). Default behavior:
   * `window.location.replace(returnTo ?? '/')`.
   */
  onSuccess?: (returnTo: string | null) => void;
  onError?: (error: Error) => void;
  /** Rendered while the exchange is in flight. */
  children?: ReactNode;
  /** Rendered when the exchange fails. Receives the error. */
  errorFallback?: (error: Error) => ReactNode;
}

/**
 * Calls `signinRedirectCallback`, restores the `returnTo`, and navigates.
 * Routing-agnostic: pass `onSuccess` to integrate with `useRouter()` from
 * Next.js, `useNavigate()` from react-router, etc.
 */
export function AuthCallback({ onSuccess, onError, children, errorFallback }: AuthCallbackProps) {
  const { client } = useAuth();
  const [error, setError] = useState<Error | null>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    let cancelled = false;
    client
      .signinRedirectCallback()
      .then(() => {
        if (cancelled) return;
        const returnTo = consumeReturnTo();
        if (onSuccess) {
          onSuccess(returnTo);
          return;
        }
        if (typeof window !== 'undefined') {
          window.location.replace(returnTo ?? '/');
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const wrapped = err instanceof Error ? err : new Error(String(err));
        setError(wrapped);
        onError?.(wrapped);
      });

    return () => {
      cancelled = true;
    };
  }, [client, onSuccess, onError]);

  if (error) {
    if (errorFallback) return <>{errorFallback(error)}</>;
    return null;
  }
  return <>{children}</>;
}
