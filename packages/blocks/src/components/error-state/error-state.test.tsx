import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { ErrorState } from './error-state.js';

describe('ErrorState', () => {
  it('renders title, description and the default retry button when onRetry is provided', async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();
    render(
      <ErrorState
        title="Something went wrong"
        description="The dashboard could not load."
        onRetry={onRetry}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(screen.getByText('The dashboard could not load.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders the alert role for live regions', () => {
    render(<ErrorState title="Error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('lets consumers override the actions slot', () => {
    render(
      <ErrorState title="Error" actions={<button type="button">Contact support</button>}>
        body
      </ErrorState>,
    );
    expect(screen.getByRole('button', { name: 'Contact support' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <ErrorState
        title="Error"
        description="The dashboard could not load."
        onRetry={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
