import { AuthLayout, type AuthLayoutProps } from '@uranus-workspace/blocks';
import { Alert, AlertDescription, AlertTitle, Button } from '@uranus-workspace/design-system';
import type { ReactNode } from 'react';

export interface OidcErrorScreenProps {
  /** Title for the error card. */
  title?: ReactNode;
  /** Free-form description. Falls back to `error.message` when omitted. */
  description?: ReactNode;
  /** The error returned by the OIDC flow. Used for the default description. */
  error?: Error | null;
  /** Primary action — typically "try again" / `() => login()`. */
  onRetry?: () => void;
  /** Label for the retry button. */
  retryLabel?: ReactNode;
  /** Optional secondary action (e.g. `'Voltar para a home'`). */
  secondaryAction?: ReactNode;
  /** Brand panel for the layout. */
  brandPanel?: ReactNode;
  variant?: AuthLayoutProps['variant'];
  brandTone?: AuthLayoutProps['brandTone'];
}

/**
 * Error screen for failed sign-in / callback flows. Pure presentation — the
 * caller decides what `onRetry` does (usually `() => login()` or
 * `router.replace('/login')`).
 */
export function OidcErrorScreen({
  title = 'Não foi possível continuar',
  description,
  error,
  onRetry,
  retryLabel = 'Tentar novamente',
  secondaryAction,
  brandPanel,
  variant = 'centered',
  brandTone,
}: OidcErrorScreenProps) {
  const message =
    description ??
    error?.message ??
    'Ocorreu um erro durante a autenticação. Tente novamente em instantes.';
  return (
    <AuthLayout brandPanel={brandPanel} variant={variant} brandTone={brandTone}>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        </header>
        <Alert variant="destructive" data-slot="oidc-error-screen">
          <AlertTitle>Erro de autenticação</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
        {onRetry || secondaryAction ? (
          <div className="flex flex-col gap-2">
            {onRetry ? (
              <Button onClick={onRetry} type="button" className="w-full">
                {retryLabel}
              </Button>
            ) : null}
            {secondaryAction}
          </div>
        ) : null}
      </div>
    </AuthLayout>
  );
}

OidcErrorScreen.displayName = 'OidcErrorScreen';
