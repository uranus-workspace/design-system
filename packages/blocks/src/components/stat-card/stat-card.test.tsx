import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { StatCard } from './stat-card.js';

describe('StatCard', () => {
  it('renders label, value, and delta', () => {
    render(
      <StatCard
        label="MRR"
        value="$48.2k"
        delta={{ value: '+12%', direction: 'up', label: 'vs last month' }}
      />,
    );
    expect(screen.getByText('MRR')).toBeInTheDocument();
    expect(screen.getByText('$48.2k')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('renders sparkline slot when provided', () => {
    render(
      <StatCard label="Visitors" value="12.4k" sparkline={<div data-testid="spark">spark</div>} />,
    );
    expect(screen.getByTestId('spark')).toBeInTheDocument();
  });

  it('omits delta when not provided', () => {
    const { container } = render(<StatCard label="Users" value="42" />);
    expect(container.querySelector('[data-slot="stat-card-delta"]')).toBeNull();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <StatCard label="MRR" value="$48.2k" delta={{ value: '+12%', direction: 'up' }} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
