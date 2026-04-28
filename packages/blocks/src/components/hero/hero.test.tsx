import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Hero } from './hero.js';

describe('Hero', () => {
  it('renders the title as an h1 and the description', () => {
    render(<Hero title="Build faster" description="The Uranus design system." />);
    expect(screen.getByRole('heading', { level: 1, name: 'Build faster' })).toBeInTheDocument();
    expect(screen.getByText('The Uranus design system.')).toBeInTheDocument();
  });

  it('renders eyebrow and actions slots', () => {
    render(<Hero eyebrow="Beta" title="x" actions={<button type="button">Get started</button>} />);
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
  });

  it('renders the media slot when provided', () => {
    render(<Hero title="x" media={<img alt="hero illustration" src="x.png" />} />);
    expect(screen.getByAltText('hero illustration')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Hero
        eyebrow="Beta"
        title="Build faster"
        description="The Uranus design system."
        actions={<button type="button">Get started</button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
