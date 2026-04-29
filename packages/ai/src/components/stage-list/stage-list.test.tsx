import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { StageList } from './stage-list.js';

describe('StageList', () => {
  const stages = [
    { id: '1', title: 'Pesquisar repositórios', status: 'done' as const },
    {
      id: '2',
      title: 'Sintetizar resultados',
      status: 'running' as const,
      description: 'Lendo 4 fontes',
    },
    { id: '3', title: 'Escrever resposta', status: 'queued' as const },
  ];

  it('renders all stages with their statuses', () => {
    render(<StageList stages={stages} />);
    expect(screen.getByText('Pesquisar repositórios')).toBeInTheDocument();
    expect(screen.getByText('Sintetizar resultados')).toBeInTheDocument();
    expect(screen.getByText('Escrever resposta')).toBeInTheDocument();
    expect(screen.getByText('Lendo 4 fontes')).toBeInTheDocument();
  });

  it('marks the running step with aria-current=step', () => {
    render(<StageList stages={stages} />);
    const running = screen
      .getByText('Sintetizar resultados')
      .closest('[data-slot="stage-list-item"]');
    expect(running).toHaveAttribute('aria-current', 'step');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<StageList stages={stages} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
