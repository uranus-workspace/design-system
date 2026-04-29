import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { SearchingIndicator } from './searching-indicator.js';

describe('SearchingIndicator', () => {
  it('renders the default label and an aria-live region', () => {
    render(<SearchingIndicator />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent(/Pesquisando/i);
  });

  it('renders the first source from the list', () => {
    render(<SearchingIndicator sources={['github.com/uranus-workspace', 'uranus.com.br']} />);
    expect(screen.getByText('github.com/uranus-workspace')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<SearchingIndicator sources={['uranus.com.br']} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
