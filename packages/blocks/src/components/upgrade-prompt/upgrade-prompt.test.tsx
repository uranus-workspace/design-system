import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { UpgradePrompt } from './upgrade-prompt.js';

describe('UpgradePrompt', () => {
  it('renders title, description and action', () => {
    render(
      <UpgradePrompt
        title="Unlock unlimited projects"
        description="Upgrade to Pro to remove the 3-project limit."
        action={<button type="button">Upgrade</button>}
      />,
    );
    expect(screen.getByText('Unlock unlimited projects')).toBeInTheDocument();
    expect(screen.getByText('Upgrade to Pro to remove the 3-project limit.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upgrade' })).toBeInTheDocument();
  });

  it('exposes layout via data-layout attribute', () => {
    const { rerender } = render(
      <UpgradePrompt title="x" action={<button type="button">go</button>} />,
    );
    expect(screen.getByText('x').closest('[data-slot="upgrade-prompt"]')).toHaveAttribute(
      'data-layout',
      'card',
    );
    rerender(
      <UpgradePrompt title="x" layout="banner" action={<button type="button">go</button>} />,
    );
    expect(screen.getByText('x').closest('[data-slot="upgrade-prompt"]')).toHaveAttribute(
      'data-layout',
      'banner',
    );
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <UpgradePrompt
        title="Unlock unlimited projects"
        description="Upgrade to Pro."
        action={<button type="button">Upgrade</button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
