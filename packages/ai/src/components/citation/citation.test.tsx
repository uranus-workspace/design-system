import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Citation, CitationList } from './citation.js';

describe('Citation', () => {
  it('renders title and number', () => {
    render(
      <Citation
        index={1}
        citation={{ id: 'a', title: 'Manual de marca Uranus', url: 'https://uranus.com.br' }}
      />,
    );
    expect(screen.getByText('Manual de marca Uranus')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders without a link when url is missing', () => {
    render(<Citation citation={{ id: 'a', title: 'Anotação interna' }} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('CitationList renders all entries', () => {
    render(
      <CitationList
        citations={[
          { id: '1', title: 'Fonte A', url: 'https://a.com' },
          { id: '2', title: 'Fonte B', url: 'https://b.com' },
        ]}
      />,
    );
    expect(screen.getByText('Fonte A')).toBeInTheDocument();
    expect(screen.getByText('Fonte B')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <CitationList citations={[{ id: '1', title: 'Fonte', url: 'https://uranus.com.br' }]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
