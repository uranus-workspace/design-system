import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { ErrorState } from './error-state.js';

describe('ErrorState', () => {
  it('renders title, description and the default retry button when onRetry is provided', async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();
    render(
      <ErrorState
        title="Algo deu errado"
        description="Não foi possível carregar o dashboard."
        onRetry={onRetry}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Algo deu errado' })).toBeInTheDocument();
    expect(screen.getByText('Não foi possível carregar o dashboard.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders the alert role for live regions', () => {
    render(<ErrorState title="Erro" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('lets consumers override the actions slot', () => {
    render(
      <ErrorState title="Erro" actions={<button type="button">Falar com suporte</button>}>
        body
      </ErrorState>,
    );
    expect(screen.getByRole('button', { name: 'Falar com suporte' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Tentar novamente' })).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <ErrorState
        title="Erro"
        description="Não foi possível carregar o dashboard."
        onRetry={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
