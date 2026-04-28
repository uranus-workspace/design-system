import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { FeatureGrid, type FeatureItem } from './feature-grid.js';

const features: FeatureItem[] = [
  { id: 'a', title: 'Tokens', description: 'OKLCH-based tokens.' },
  { id: 'b', title: 'Primitives', description: 'Owned shadcn baseline.' },
  { id: 'c', title: 'Blocks', description: 'Higher-level layouts.' },
];

describe('FeatureGrid', () => {
  it('renders one heading and description per feature', () => {
    render(<FeatureGrid features={features} />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(screen.getByText('Tokens')).toBeInTheDocument();
    expect(screen.getByText('OKLCH-based tokens.')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<FeatureGrid features={features} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('supports composition with Item children', () => {
    render(
      <FeatureGrid>
        {features.map((f) => (
          <FeatureGrid.Item key={f.id} {...f} />
        ))}
      </FeatureGrid>,
    );
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(screen.getByText('Tokens')).toBeInTheDocument();
  });
});
