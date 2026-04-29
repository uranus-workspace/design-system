import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { AnnouncementBanner } from './announcement-banner.js';

describe('AnnouncementBanner', () => {
  it('renders title, description and action', () => {
    render(
      <AnnouncementBanner
        title="New version released"
        description="v2.0 is now available."
        action={<button type="button">Learn more</button>}
      />,
    );
    expect(screen.getByText('New version released')).toBeInTheDocument();
    expect(screen.getByText('v2.0 is now available.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
  });

  it('uses role="alert" when intent is danger and "status" otherwise', () => {
    const { rerender } = render(<AnnouncementBanner title="Info" intent="info" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(<AnnouncementBanner title="Danger" intent="danger" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls onDismiss when the close button is clicked', async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(<AnnouncementBanner title="Heads up" onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss announcement' }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <AnnouncementBanner
        title="New version released"
        description="v2.0 is now available."
        intent="success"
        onDismiss={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
