import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { SignUpForm } from './sign-up-form.js';

describe('SignUpForm', () => {
  it('renders all required fields and the submit button', () => {
    render(<SignUpForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText('Nome completo')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Senha')).toBeRequired();
    expect(screen.getByRole('button', { name: 'Criar conta' })).toBeInTheDocument();
  });

  it('updates the password strength meter while typing', async () => {
    const user = userEvent.setup();
    render(<SignUpForm onSubmit={vi.fn()} />);
    await user.type(screen.getByLabelText('Senha'), 'Aa1!aaaa');
    expect(screen.getByText('Forte')).toBeInTheDocument();
  });

  it('calls onSubmit with typed values when accepted', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<SignUpForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Nome completo'), 'Gustavo');
    await user.type(screen.getByLabelText('Email'), 'gus@uranus.com.br');
    await user.type(screen.getByLabelText('Senha'), 'StrongPass1!');
    await user.click(screen.getByLabelText(/Aceito os Termos/));
    await user.click(screen.getByRole('button', { name: 'Criar conta' }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Gustavo',
      email: 'gus@uranus.com.br',
      password: 'StrongPass1!',
      acceptTerms: true,
    });
  });

  it('renders the destructive error alert', () => {
    render(<SignUpForm onSubmit={vi.fn()} error="Email já em uso" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Email já em uso');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<SignUpForm onSubmit={vi.fn()} signInHref="/sign-in" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
