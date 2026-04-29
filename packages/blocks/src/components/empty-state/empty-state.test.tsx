import { render, screen } from '@testing-library/react';
import { Button } from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './empty-state.js';

describe('EmptyState', () => {
  it('renders title, description, icon, and actions', () => {
    render(
      <EmptyState
        icon={<span data-testid="icon">★</span>}
        title="Nenhum projeto ainda"
        description="Crie seu primeiro projeto para começar."
        actions={<Button>Novo projeto</Button>}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Nenhum projeto ainda' })).toBeInTheDocument();
    expect(screen.getByText('Crie seu primeiro projeto para começar.')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Novo projeto' })).toBeInTheDocument();
  });

  it('has the status landmark', () => {
    render(<EmptyState title="Vazio" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <EmptyState
        title="Vazio"
        description="Sem dados por aqui."
        actions={<Button>Adicionar</Button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
