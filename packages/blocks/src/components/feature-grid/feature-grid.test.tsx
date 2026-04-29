import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { FeatureGrid } from './feature-grid.js';

describe('FeatureGrid', () => {
  it('renders one heading and description per feature', () => {
    render(
      <FeatureGrid columns={3}>
        <FeatureGrid.Item title="Tokens" description="OKLCH-based tokens." />
        <FeatureGrid.Item title="Primitives" description="Owned shadcn baseline." />
        <FeatureGrid.Item title="Blocks" description="Higher-level layouts." />
      </FeatureGrid>,
    );
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(screen.getByText('Tokens')).toBeInTheDocument();
    expect(screen.getByText('OKLCH-based tokens.')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <FeatureGrid>
        <FeatureGrid.Item title="Tokens" description="OKLCH-based tokens." />
        <FeatureGrid.Item title="Primitives" description="Owned shadcn baseline." />
      </FeatureGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
