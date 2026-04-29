import { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth.js';

export interface SilentRenewCallbackProps {
  onError?: (error: Error) => void;
}

/**
 * Tiny component that runs `signinSilentCallback()` and unmounts. Mount it on
 * the route configured as `silentRedirectUri` when you want to handle the
 * silent renew via React rather than a static HTML page.
 *
 * The iframe loading this component should not render a full app shell — keep
 * the route lean for performance.
 */
export function SilentRenewCallback({ onError }: SilentRenewCallbackProps = {}) {
  const { client } = useAuth();

  useEffect(() => {
    let cancelled = false;
    client.signinSilentCallback().catch((err: unknown) => {
      if (cancelled) return;
      const wrapped = err instanceof Error ? err : new Error(String(err));
      onError?.(wrapped);
    });
    return () => {
      cancelled = true;
    };
  }, [client, onError]);

  return null;
}
