import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { ForgotPasswordForm } from './forgot-password-form.js';

describe('ForgotPasswordForm', () => {
  it('renders heading, email input, and submit button', () => {
    render(<ForgotPasswordForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar link de redefinição' })).toBeInTheDocument();
  });

  it('calls onSubmit with the typed email', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ForgotPasswordForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText('Email'), 'gus@uranus.com.br');
    await user.click(screen.getByRole('button', { name: 'Enviar link de redefinição' }));
    expect(onSubmit).toHaveBeenCalledWith({ email: 'gus@uranus.com.br' });
  });

  it('renders the success panel when success is true', () => {
    render(<ForgotPasswordForm onSubmit={vi.fn()} success signInHref="/sign-in" />);
    expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/Verifique seu email/);
    expect(screen.getByRole('link', { name: 'Voltar para entrar' })).toHaveAttribute(
      'href',
      '/sign-in',
    );
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ForgotPasswordForm onSubmit={vi.fn()} signInHref="/sign-in" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
