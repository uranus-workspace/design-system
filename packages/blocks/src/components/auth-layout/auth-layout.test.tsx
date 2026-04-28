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
