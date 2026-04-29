import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { ResetPasswordForm } from './reset-password-form.js';

describe('ResetPasswordForm', () => {
  it('renders new password and confirm fields', () => {
    render(<ResetPasswordForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText('Nova senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Atualizar senha' })).toBeInTheDocument();
  });

  it('blocks submit and shows mismatch message when passwords differ', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ResetPasswordForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Nova senha'), 'StrongPass1!');
    await user.type(screen.getByLabelText('Confirmar senha'), 'Different1!');

    await user.click(screen.getByRole('button', { name: 'Atualizar senha' }));

    expect(screen.getByText('As senhas não coincidem.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits when passwords match', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ResetPasswordForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Nova senha'), 'StrongPass1!');
    await user.type(screen.getByLabelText('Confirmar senha'), 'StrongPass1!');
    await user.click(screen.getByRole('button', { name: 'Atualizar senha' }));

    expect(onSubmit).toHaveBeenCalledWith({
      password: 'StrongPass1!',
      confirmPassword: 'StrongPass1!',
    });
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ResetPasswordForm onSubmit={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
