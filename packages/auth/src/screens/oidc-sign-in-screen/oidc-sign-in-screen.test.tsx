import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { MockAuthProvider } from '../_testing/mock-auth-provider.js';
import { OidcSignInScreen } from './oidc-sign-in-screen.js';

describe('<OidcSignInScreen />', () => {
  it('renders providers and triggers login with the configured idpHint', () => {
    const onLogin = vi.fn();
    render(
      <MockAuthProvider status="unauthenticated" onLogin={onLogin}>
        <OidcSignInScreen
          providers={['google', 'microsoft']}
          idpHints={{ google: 'google', microsoft: 'azure-ad' }}
          credentials="hidden"
          title="Bem-vindo"
        />
      </MockAuthProvider>,
    );

    fireEvent.click(screen.getByText('Continuar com Google'));
    expect(onLogin).toHaveBeenCalledWith({ idpHint: 'google' });

    fireEvent.click(screen.getByText('Continuar com Microsoft'));
    expect(onLogin).toHaveBeenLastCalledWith({ idpHint: 'azure-ad' });
  });

  it('passes axe (jest-axe) on default render', async () => {
    const { container } = render(
      <MockAuthProvider status="unauthenticated">
        <OidcSignInScreen
          providers={['google']}
          idpHints={{ google: 'google' }}
          credentials="hidden"
          title="Entrar na Uranus"
        />
      </MockAuthProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
