import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { PlanPanel } from './plan-panel.js';

describe('PlanPanel', () => {
  const stages = [
    { id: '1', title: 'Levantar requisitos', status: 'done' as const },
    { id: '2', title: 'Esboçar arquitetura', status: 'running' as const },
    { id: '3', title: 'Implementar', status: 'queued' as const },
  ];

  it('renders the default title and progress summary', () => {
    render(<PlanPanel stages={stages} />);
    expect(screen.getByText('Plano')).toBeInTheDocument();
    expect(screen.getByText('1 de 3 etapas concluídas')).toBeInTheDocument();
    expect(screen.getByText('Esboçar arquitetura')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<PlanPanel stages={stages} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
