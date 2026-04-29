import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { SignInForm } from './sign-in-form.js';

describe('SignInForm', () => {
  it('renders heading, email, password, and submit button', () => {
    render(<SignInForm onSubmit={vi.fn()} />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Bem-vindo de volta' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('calls onSubmit with typed values when valid', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<SignInForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'gus@uranus.com.br');
    await user.type(screen.getByLabelText('Senha'), 'super-secret');
    await user.click(screen.getByLabelText('Manter conectado'));
    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'gus@uranus.com.br',
      password: 'super-secret',
      rememberMe: true,
    });
  });

  it('shows the destructive error alert', () => {
    render(<SignInForm onSubmit={vi.fn()} error="Credenciais inválidas" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Credenciais inválidas');
  });

  it('disables the form while loading', () => {
    render(<SignInForm onSubmit={vi.fn()} loading />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Entrando…' })).toBeInTheDocument();
  });

  it('renders forgot-password and sign-up links when hrefs provided', () => {
    render(<SignInForm onSubmit={vi.fn()} forgotPasswordHref="/forgot" signUpHref="/sign-up" />);
    expect(screen.getByRole('link', { name: 'Esqueceu a senha?' })).toHaveAttribute(
      'href',
      '/forgot',
    );
    expect(screen.getByRole('link', { name: 'Criar conta' })).toHaveAttribute('href', '/sign-up');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <SignInForm onSubmit={vi.fn()} forgotPasswordHref="/forgot" signUpHref="/sign-up" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
