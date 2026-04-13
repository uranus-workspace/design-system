import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Input } from './input.js';

describe('Input', () => {
  it('renders with a label association', async () => {
    const { container } = render(
      <label>
        Email
        <Input type="email" name="email" />
      </label>,
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="name" />);
    const input = screen.getByLabelText('name');
    await user.type(input, 'Uranus');
    expect(input).toHaveValue('Uranus');
  });

  it('respects aria-invalid', () => {
    render(<Input aria-label="broken" aria-invalid="true" />);
    expect(screen.getByLabelText('broken')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} aria-label="with-ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
