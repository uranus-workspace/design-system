import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { StatCard } from '../stat-card/stat-card.js';
import { StatGrid } from './stat-grid.js';

describe('StatGrid', () => {
  it('renders all children in a grid', () => {
    render(
      <StatGrid columns={3}>
        <StatCard label="A" value="1" />
        <StatCard label="B" value="2" />
        <StatCard label="C" value="3" />
      </StatGrid>,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('applies the auto column class by default', () => {
    const { container } = render(
      <StatGrid>
        <StatCard label="A" value="1" />
      </StatGrid>,
    );
    expect(container.firstChild).toHaveClass('grid-cols-[repeat(auto-fit,minmax(220px,1fr))]');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <StatGrid>
        <StatCard label="MRR" value="R$ 1.000" />
        <StatCard label="ARR" value="R$ 12.000" />
      </StatGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
