import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { StreamingText } from './streaming-text.js';

describe('StreamingText', () => {
  it('renders text content', () => {
    render(<StreamingText text="Olá mundo" />);
    expect(screen.getByText('Olá mundo')).toBeInTheDocument();
  });

  it('shows the caret when streaming', () => {
    const { container } = render(<StreamingText text="Pen" streaming />);
    expect(container.querySelector('[data-slot="streaming-caret"]')).toBeInTheDocument();
    expect(container.querySelector('[data-streaming]')).toBeInTheDocument();
  });

  it('hides the caret when not streaming', () => {
    const { container } = render(<StreamingText text="Pronto" />);
    expect(container.querySelector('[data-slot="streaming-caret"]')).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<StreamingText text="Streaming" streaming />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
