import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { SignInForm } from './sign-in-form.js';

describe('SignInForm', () => {
  it('renders heading, email, password, and submit button', () => {
    render(<SignInForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Welcome back' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('calls onSubmit with typed values when valid', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<SignInForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'gus@uranus.com.br');
    await user.type(screen.getByLabelText('Password'), 'super-secret');
    await user.click(screen.getByLabelText('Remember me'));
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'gus@uranus.com.br',
      password: 'super-secret',
      rememberMe: true,
    });
  });

  it('shows the destructive error alert', () => {
    render(<SignInForm onSubmit={vi.fn()} error="Invalid credentials" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('disables the form while loading', () => {
    render(<SignInForm onSubmit={vi.fn()} loading />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Signing in…' })).toBeInTheDocument();
  });

  it('renders forgot-password and sign-up links when hrefs provided', () => {
    render(<SignInForm onSubmit={vi.fn()} forgotPasswordHref="/forgot" signUpHref="/sign-up" />);
    expect(screen.getByRole('link', { name: 'Forgot password?' })).toHaveAttribute(
      'href',
      '/forgot',
    );
    expect(screen.getByRole('link', { name: 'Create one' })).toHaveAttribute('href', '/sign-up');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <SignInForm onSubmit={vi.fn()} forgotPasswordHref="/forgot" signUpHref="/sign-up" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
