import { Button } from '@uranus-workspace/design-system';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import { EmptyState } from '../empty-state/empty-state.js';

export interface NotificationItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /** Pre-formatted timestamp string. */
  timestamp: ReactNode;
  /** When `true`, the item shows a visible unread dot and `aria-current="true"`. */
  unread?: boolean;
  /** Optional click handler — when provided, the item renders as a button. */
  onSelect?: () => void;
}

export interface NotificationListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  items: NotificationItem[];
  /** Header title shown above the list. Defaults to `"Notifications"`. */
  title?: ReactNode;
  /** Action shown in the header (e.g. mark all as read). */
  onMarkAllRead?: () => void;
  /** Override the empty state. Defaults to `<EmptyState />` with a generic message. */
  emptyState?: ReactNode;
}

/**
 * List of notifications used inside a header bell `Popover` or a dedicated
 * notifications page. Composes `EmptyState` for the zero-state and a small
 * `Button` slot for "Mark all as read".
 */
export const NotificationList = forwardRef<HTMLDivElement, NotificationListProps>(
  function NotificationList(
    { items, title = 'Notifications', onMarkAllRead, emptyState, className, ...props },
    ref,
  ) {
    const hasItems = items.length > 0;
    const unreadCount = items.filter((item) => item.unread).length;

    return (
      <div
        ref={ref}
        data-slot="notification-list"
        className={cn('flex w-80 flex-col', className)}
        {...props}
      >
        <header className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-sm font-medium">{title}</span>
          {onMarkAllRead && unreadCount > 0 ? (
            <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
              Mark all read
            </Button>
          ) : null}
        </header>

        {hasItems ? (
          <ul data-slot="notification-list-items" className="max-h-96 overflow-auto">
            {items.map((item) => {
              const content = (
                <>
                  <span className="flex items-center gap-2">
                    {item.unread ? (
                      <span aria-hidden className="size-2 rounded-full bg-primary" />
                    ) : (
                      <span aria-hidden className="size-2" />
                    )}
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                  </span>
                  {item.description ? (
                    <span className="block pl-4 text-sm text-muted-foreground">
                      {item.description}
                    </span>
                  ) : null}
                  <time className="block pl-4 text-xs text-muted-foreground">{item.timestamp}</time>
                </>
              );
              return (
                <li
                  key={item.id}
                  className="border-b last:border-b-0"
                  aria-current={item.unread ? 'true' : undefined}
                >
                  {item.onSelect ? (
                    <button
                      type="button"
                      onClick={item.onSelect}
                      className="flex w-full flex-col gap-1 px-4 py-3 text-left hover:bg-muted/50"
                    >
                      {content}
                    </button>
                  ) : (
                    <div className="flex flex-col gap-1 px-4 py-3">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="px-4 py-6">
            {emptyState ?? (
              <EmptyState title="You're all caught up" description="No new notifications." />
            )}
          </div>
        )}
      </div>
    );
  },
);
