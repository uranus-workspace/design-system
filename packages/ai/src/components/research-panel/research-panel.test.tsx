import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { ResearchPanel } from './research-panel.js';

describe('ResearchPanel', () => {
  const stages = [
    { id: '1', title: 'Buscar fontes', status: 'done' as const },
    { id: '2', title: 'Sintetizar', status: 'running' as const },
  ];
  const citations = [
    {
      id: 'c1',
      title: 'Manual Uranus 2026',
      url: 'https://uranus.com.br',
      source: 'uranus.com.br',
    },
    {
      id: 'c2',
      title: 'Repo design-system',
      url: 'https://github.com/uranus-workspace/design-system',
      source: 'github.com',
    },
  ];

  it('renders citations and stage progress summary', () => {
    render(<ResearchPanel stages={stages} citations={citations} />);
    expect(screen.getByText('2 fontes · 1/2 passos')).toBeInTheDocument();
    expect(screen.getByText('Manual Uranus 2026')).toBeInTheDocument();
    expect(screen.getByText('Sintetizar')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ResearchPanel stages={stages} citations={citations} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
