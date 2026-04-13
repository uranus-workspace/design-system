import { render, screen } from '@testing-library/react';
import { Button } from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './empty-state.js';

describe('EmptyState', () => {
  it('renders title, description, icon, and actions', () => {
    render(
      <EmptyState
        icon={<span data-testid="icon">★</span>}
        title="No projects yet"
        description="Create your first project to get started."
        actions={<Button>New project</Button>}
      />,
    );
    expect(screen.getByRole('heading', { name: 'No projects yet' })).toBeInTheDocument();
    expect(screen.getByText('Create your first project to get started.')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New project' })).toBeInTheDocument();
  });

  it('has the status landmark', () => {
    render(<EmptyState title="Empty" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <EmptyState
        title="Empty"
        description="Nothing to see here."
        actions={<Button>Do it</Button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
