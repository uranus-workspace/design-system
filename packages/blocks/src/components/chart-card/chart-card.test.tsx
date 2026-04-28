import { render, screen } from '@testing-library/react';
import { Button } from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { ChartCard } from './chart-card.js';

describe('ChartCard', () => {
  it('renders title, description, actions, body, and footer', () => {
    render(
      <ChartCard
        title="Revenue"
        description="Monthly revenue, last 12 months."
        actions={<Button>Filter</Button>}
        footer={<span>Footer text</span>}
      >
        <div data-testid="chart-body">chart</div>
      </ChartCard>,
    );
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Monthly revenue, last 12 months.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
    expect(screen.getByTestId('chart-body')).toBeInTheDocument();
    expect(screen.getByText('Footer text')).toBeInTheDocument();
  });

  it('omits actions and footer when not provided', () => {
    const { container } = render(
      <ChartCard title="Revenue">
        <div>chart</div>
      </ChartCard>,
    );
    expect(container.querySelector('[data-slot="chart-card-actions"]')).toBeNull();
    expect(container.querySelector('[data-slot="chart-card-footer"]')).toBeNull();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <ChartCard title="Revenue" description="Monthly">
        <div>chart</div>
      </ChartCard>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
