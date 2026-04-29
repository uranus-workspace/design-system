import {
  AuthDivider,
  AuthLayout,
  type AuthLayoutProps,
  OAuthProviderButton,
  type OAuthProviderId,
  SignInForm,
  type SignInFormProps,
} from '@uranus-workspace/blocks';
import { type ReactNode, useCallback } from 'react';
import { useAuth } from '../../react/hooks/use-auth.js';

type ScreenLayoutProps = Omit<AuthLayoutProps, 'children'>;

export interface OidcProviderEntry {
  id: OAuthProviderId;
  /** Visible label, e.g. `'Continuar com Google'`. Defaults to provider name. */
  label?: string;
  /** Override the default Keycloak `kc_idp_hint` for this provider. */
  idpHint?: string;
  /** Custom icon node — shown to the left of the label. */
  icon?: ReactNode;
}

export type OidcProvidersInput = OAuthProviderId[] | OidcProviderEntry[];

const DEFAULT_LABELS: Record<OAuthProviderId, string> = {
  google: 'Continuar com Google',
  microsoft: 'Continuar com Microsoft',
  github: 'Continuar com GitHub',
  apple: 'Continuar com Apple',
  generic: 'Continuar com SSO',
};

export interface OidcSignInScreenProps {
  /** Brand panel content (logo, marketing copy, illustration). */
  brandPanel?: ReactNode;
  /** Layout variant — `split` (default) or `centered`. */
  variant?: AuthLayoutProps['variant'];
  /** Layout brand tone (forwards to `AuthLayout`). */
  brandTone?: AuthLayoutProps['brandTone'];
  /** Class for the outer layout. */
  layoutProps?: ScreenLayoutProps;
  /** Providers rendered as SSO buttons. */
  providers?: OidcProvidersInput;
  /** Maps provider id → `kc_idp_hint`. Falls back to provider id when omitted. */
  idpHints?: Partial<Record<OAuthProviderId, string>>;
  /** Show the email/password block (`'visible'`) or hide it (`'hidden'`, default for SSO-only stacks). */
  credentials?: SignInFormProps['credentials'];
  /** Title shown above the form. */
  title?: ReactNode;
  /** Subtitle below the title. */
  description?: ReactNode;
  /** Anchor for "Don't have an account?". */
  signUpHref?: string;
  /** Hook fired when the email/password form is submitted (only when `credentials='visible'`). */
  onCredentialsSubmit?: Extract<SignInFormProps, { credentials?: 'visible' }>['onSubmit'];
  /** Loading state shared between credentials and SSO buttons. */
  loading?: boolean;
  /** Top-level error message (e.g. from URL params). */
  error?: string | null;
  /** Slot rendered between the SSO buttons and the (optional) credential form. */
  divider?: ReactNode;
}

function normalizeProviders(input: OidcProvidersInput | undefined): OidcProviderEntry[] {
  if (!input) return [];
  return input.map((entry) => (typeof entry === 'string' ? { id: entry } : entry));
}

/**
 * Pre-wired sign-in screen composing `AuthLayout` + `SignInForm` (from
 * `@uranus-workspace/blocks`) with one click-to-IdP button per provider. Each
 * SSO button calls `login({ idpHint })` so apps don't have to wire OIDC by
 * hand. Stays presentational — the only auth surface it touches is the
 * `useAuth()` context.
 */
export function OidcSignInScreen({
  brandPanel,
  variant = 'split',
  brandTone,
  layoutProps,
  providers,
  idpHints,
  credentials = 'hidden',
  title,
  description,
  signUpHref,
  onCredentialsSubmit,
  loading,
  error,
  divider,
}: OidcSignInScreenProps) {
  const { login } = useAuth();
  const entries = normalizeProviders(providers);

  const handleProviderClick = useCallback(
    (entry: OidcProviderEntry) => () => {
      const idpHint = entry.idpHint ?? idpHints?.[entry.id] ?? entry.id;
      void login({ idpHint });
    },
    [idpHints, login],
  );

  const socialProviders =
    entries.length > 0 ? (
      <>
        {entries.map((entry) => (
          <OAuthProviderButton
            key={entry.id}
            provider={entry.id}
            onClick={handleProviderClick(entry)}
            disabled={loading}
          >
            {entry.icon}
            {entry.label ?? DEFAULT_LABELS[entry.id]}
          </OAuthProviderButton>
        ))}
        {credentials === 'visible'
          ? (divider ?? <AuthDivider label="ou continue com email" />)
          : null}
      </>
    ) : null;

  const sharedFormProps = {
    title,
    description,
    error: error ?? null,
    loading,
    signUpHref,
    socialProviders,
  };

  const form =
    credentials === 'visible' ? (
      <SignInForm
        {...sharedFormProps}
        credentials="visible"
        onSubmit={async (values) => {
          if (!onCredentialsSubmit) {
            throw new Error(
              '[uranus/auth] <OidcSignInScreen credentials="visible"> requires `onCredentialsSubmit`.',
            );
          }
          await onCredentialsSubmit(values);
        }}
      />
    ) : (
      <SignInForm {...sharedFormProps} credentials="hidden" />
    );

  return (
    <AuthLayout brandPanel={brandPanel} variant={variant} brandTone={brandTone} {...layoutProps}>
      {form}
    </AuthLayout>
  );
}

OidcSignInScreen.displayName = 'OidcSignInScreen';
