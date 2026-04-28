import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { AuthLayout } from './auth-layout.js';

describe('AuthLayout', () => {
  it('renders main landmark with the form children', () => {
    render(
      <AuthLayout brandPanel={<div>Brand</div>}>
        <form aria-label="Sign in">
          <input aria-label="email" />
        </form>
      </AuthLayout>,
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('form', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('hides the brand panel from assistive tech (decorative)', () => {
    render(
      <AuthLayout brandPanel={<div data-testid="brand">Brand</div>}>
        <span>form</span>
      </AuthLayout>,
    );
    expect(screen.getByTestId('brand').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies brand gradient utilities from brandTone', () => {
    const { rerender, container } = render(
      <AuthLayout brandTone="nebula" brandPanel={<div>Brand</div>}>
        <span>form</span>
      </AuthLayout>,
    );
    expect(container.querySelector('[data-slot="auth-layout-brand"]')).toHaveClass('bg-nebula');

    rerender(
      <AuthLayout brandTone="aurora" brandPanel={<div>Brand</div>}>
        <span>form</span>
      </AuthLayout>,
    );
    expect(container.querySelector('[data-slot="auth-layout-brand"]')).toHaveClass('bg-aurora');
  });

  it('omits the brand panel in centered variant', () => {
    render(
      <AuthLayout variant="centered" brandPanel={<div data-testid="brand">Brand</div>}>
        <span>form</span>
      </AuthLayout>,
    );
    expect(screen.queryByTestId('brand')).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <AuthLayout brandPanel={<div>Brand</div>}>
        <form aria-label="Sign in">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </form>
      </AuthLayout>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
