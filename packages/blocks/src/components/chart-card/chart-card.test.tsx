import { render, screen } from '@testing-library/react';
import { Button } from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { ChartCard } from './chart-card.js';

describe('ChartCard', () => {
  it('renders title, description, actions, body, and footer', () => {
    render(
      <ChartCard
        title="Receita mensal"
        description="Receita dos últimos 12 meses."
        actions={<Button>Filtrar</Button>}
        footer={<span>Rodapé</span>}
      >
        <div data-testid="chart-body">chart</div>
      </ChartCard>,
    );
    expect(screen.getByText('Receita mensal')).toBeInTheDocument();
    expect(screen.getByText('Receita dos últimos 12 meses.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filtrar' })).toBeInTheDocument();
    expect(screen.getByTestId('chart-body')).toBeInTheDocument();
    expect(screen.getByText('Rodapé')).toBeInTheDocument();
  });

  it('omits actions and footer when not provided', () => {
    const { container } = render(
      <ChartCard title="Receita mensal">
        <div>chart</div>
      </ChartCard>,
    );
    expect(container.querySelector('[data-slot="chart-card-actions"]')).toBeNull();
    expect(container.querySelector('[data-slot="chart-card-footer"]')).toBeNull();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <ChartCard title="Receita mensal" description="Mensal">
        <div>chart</div>
      </ChartCard>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
