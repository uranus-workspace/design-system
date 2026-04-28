import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { type NotificationItem, NotificationList } from './notification-list.js';

const items: NotificationItem[] = [
  {
    id: '1',
    title: 'New comment on Project Apollo',
    description: 'Bruno: looks great!',
    timestamp: '2m',
    unread: true,
  },
  {
    id: '2',
    title: 'Build finished',
    description: 'main passed in 2m31s',
    timestamp: '1h',
  },
];

describe('NotificationList', () => {
  it('renders the heading and items', () => {
    render(<NotificationList items={items} />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('New comment on Project Apollo')).toBeInTheDocument();
  });

  it('marks unread items with aria-current', () => {
    render(<NotificationList items={items} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveAttribute('aria-current', 'true');
    expect(listItems[1]).not.toHaveAttribute('aria-current');
  });

  it('shows mark-all-read only when there are unread items', () => {
    const onMarkAllRead = vi.fn();
    const { rerender } = render(<NotificationList items={items} onMarkAllRead={onMarkAllRead} />);
    expect(screen.getByRole('button', { name: 'Mark all read' })).toBeInTheDocument();
    rerender(
      <NotificationList
        items={items.map((i) => ({ ...i, unread: false }))}
        onMarkAllRead={onMarkAllRead}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Mark all read' })).not.toBeInTheDocument();
  });

  it('calls onSelect when a clickable item is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    const item: NotificationItem = {
      id: '1',
      title: 'New comment on Project Apollo',
      timestamp: '2m',
      onSelect,
    };
    render(<NotificationList items={[item]} />);
    await user.click(screen.getByRole('button', { name: /New comment/ }));
    expect(onSelect).toHaveBeenCalled();
  });

  it('renders the empty state when no items', () => {
    render(<NotificationList items={[]} />);
    expect(screen.getByText("You're all caught up")).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<NotificationList items={items} onMarkAllRead={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('supports composition with Header, List, and Item', () => {
    render(
      <NotificationList>
        <NotificationList.Header title="Alerts" unreadCount={1} onMarkAllRead={vi.fn()} />
        <NotificationList.List>
          <NotificationList.Item {...items[0]} />
        </NotificationList.List>
      </NotificationList>,
    );
    expect(screen.getByText('Alerts')).toBeInTheDocument();
    expect(screen.getByText('New comment on Project Apollo')).toBeInTheDocument();
  });
});
