import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { CTASection } from './cta-section.js';

describe('CTASection', () => {
  it('renders title as h2 plus description and actions', () => {
    render(
      <CTASection
        title="Pronto para começar?"
        description="Entre em contato com nossa equipe."
        actions={<button type="button">Começar agora</button>}
      />,
    );
    expect(
      screen.getByRole('heading', { level: 2, name: 'Pronto para começar?' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Entre em contato com nossa equipe.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Começar agora' })).toBeInTheDocument();
  });

  it('renders the eyebrow when provided', () => {
    render(<CTASection eyebrow="Pricing" title="x" actions={<button type="button">go</button>} />);
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <CTASection
        eyebrow="Pricing"
        title="Pronto para começar?"
        description="Entre em contato com nossa equipe."
        actions={<button type="button">Começar agora</button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
