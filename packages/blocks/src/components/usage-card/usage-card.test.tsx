import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { UsageCard } from './usage-card.js';

describe('UsageCard', () => {
  it('renders label, used and limit', () => {
    render(<UsageCard label="Storage" used={3} limit={10} unit="GB" />);
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/30%/)).toBeInTheDocument();
  });

  it('switches intent based on threshold', () => {
    const { rerender } = render(<UsageCard label="Storage" used={5} limit={10} />);
    expect(screen.getByText('Storage').closest('[data-slot="usage-card"]')).toHaveAttribute(
      'data-intent',
      'default',
    );
    rerender(<UsageCard label="Storage" used={9} limit={10} />);
    expect(screen.getByText('Storage').closest('[data-slot="usage-card"]')).toHaveAttribute(
      'data-intent',
      'warning',
    );
    rerender(<UsageCard label="Storage" used={10} limit={10} />);
    expect(screen.getByText('Storage').closest('[data-slot="usage-card"]')).toHaveAttribute(
      'data-intent',
      'danger',
    );
  });

  it('renders the CTA slot when provided', () => {
    render(
      <UsageCard
        label="Storage"
        used={9}
        limit={10}
        cta={<button type="button">Upgrade</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Upgrade' })).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <UsageCard
        label="Storage"
        description="Total used in your workspace."
        used={3}
        limit={10}
        unit="GB"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
