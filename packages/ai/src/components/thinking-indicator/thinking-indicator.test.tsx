import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { ThinkingIndicator } from './thinking-indicator.js';

describe('ThinkingIndicator', () => {
  it('announces via role="status"', () => {
    render(<ThinkingIndicator label="Pensando..." />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Pensando...');
  });

  it('keeps label as sr-only when dotsOnly is set', () => {
    render(<ThinkingIndicator label="Refletindo" dotsOnly />);
    const label = screen.getByText('Refletindo');
    expect(label).toHaveClass('sr-only');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ThinkingIndicator />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
