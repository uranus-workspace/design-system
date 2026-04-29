import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { StatCard } from './stat-card.js';

describe('StatCard', () => {
  it('renders label, value, and delta', () => {
    render(
      <StatCard
        label="Receita recorrente (MRR)"
        value="R$ 48.200"
        delta={{ value: '+12%', direction: 'up', label: 'vs. mês anterior' }}
      />,
    );
    expect(screen.getByText('Receita recorrente (MRR)')).toBeInTheDocument();
    expect(screen.getByText('R$ 48.200')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
    expect(screen.getByText('vs. mês anterior')).toBeInTheDocument();
  });

  it('renders sparkline slot when provided', () => {
    render(
      <StatCard
        label="Visitantes"
        value="12.400"
        sparkline={<div data-testid="spark">spark</div>}
      />,
    );
    expect(screen.getByTestId('spark')).toBeInTheDocument();
  });

  it('omits delta when not provided', () => {
    const { container } = render(<StatCard label="Usuários" value="42" />);
    expect(container.querySelector('[data-slot="stat-card-delta"]')).toBeNull();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <StatCard
        label="Receita recorrente (MRR)"
        value="R$ 48.200"
        delta={{ value: '+12%', direction: 'up' }}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
