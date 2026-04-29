import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { NotificationList } from './notification-list.js';

describe('NotificationList', () => {
  it('renders the header and items via composition', () => {
    render(
      <NotificationList>
        <NotificationList.Header title="Notificações" unreadCount={1} />
        <NotificationList.List>
          <NotificationList.Item
            title="Novo comentário em Projeto Apollo"
            description="Bruno: ficou ótimo!"
            timestamp="há 2m"
            unread
          />
          <NotificationList.Item
            title="Build concluído"
            description="main passou em 2m31s"
            timestamp="há 1h"
          />
        </NotificationList.List>
      </NotificationList>,
    );
    expect(screen.getByText('Notificações')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Novo comentário em Projeto Apollo')).toBeInTheDocument();
  });

  it('marks unread items with aria-current', () => {
    render(
      <NotificationList>
        <NotificationList.List>
          <NotificationList.Item title="Unread" timestamp="agora" unread />
          <NotificationList.Item title="Read" timestamp="ontem" />
        </NotificationList.List>
      </NotificationList>,
    );
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveAttribute('aria-current', 'true');
    expect(listItems[1]).not.toHaveAttribute('aria-current');
  });

  it('Header shows mark-all-read only when unreadCount > 0', () => {
    const onMarkAllRead = vi.fn();
    const { rerender } = render(
      <NotificationList.Header
        title="Notificações"
        unreadCount={2}
        onMarkAllRead={onMarkAllRead}
      />,
    );
    expect(screen.getByRole('button', { name: 'Marcar tudo como lido' })).toBeInTheDocument();
    rerender(
      <NotificationList.Header
        title="Notificações"
        unreadCount={0}
        onMarkAllRead={onMarkAllRead}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Marcar tudo como lido' })).not.toBeInTheDocument();
  });

  it('calls onSelect when a clickable item is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <NotificationList>
        <NotificationList.List>
          <NotificationList.Item
            title="Novo comentário em Projeto Apollo"
            timestamp="há 2m"
            onSelect={onSelect}
          />
        </NotificationList.List>
      </NotificationList>,
    );
    await user.click(screen.getByRole('button', { name: /Novo comentário/ }));
    expect(onSelect).toHaveBeenCalled();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <NotificationList>
        <NotificationList.Header title="Notificações" unreadCount={1} onMarkAllRead={vi.fn()} />
        <NotificationList.List>
          <NotificationList.Item
            title="Novo comentário em Projeto Apollo"
            description="Bruno: ficou ótimo!"
            timestamp="há 2m"
            unread
          />
        </NotificationList.List>
      </NotificationList>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
