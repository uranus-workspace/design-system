import { Button } from '@uranus-workspace/design-system';
import { type HTMLAttributes, type LiHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import { EmptyState } from '../empty-state/empty-state.js';

export interface NotificationItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  timestamp: ReactNode;
  unread?: boolean;
  onSelect?: () => void;
}

export interface NotificationListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Legacy: notification rows. Omit when composing with `NotificationList.Item` inside `NotificationList.List`. */
  items?: NotificationItem[];
  /** Legacy / optional: header title when not using `NotificationList.Header`. */
  title?: ReactNode;
  onMarkAllRead?: () => void;
  emptyState?: ReactNode;
}

function NotificationRowContent({
  title,
  description,
  timestamp,
  unread,
}: Pick<NotificationItem, 'title' | 'description' | 'timestamp' | 'unread'>) {
  return (
    <>
      <span className="flex items-center gap-2">
        {unread ? (
          <span aria-hidden className="size-2 rounded-full bg-primary" />
        ) : (
          <span aria-hidden className="size-2" />
        )}
        <span className="text-sm font-medium text-foreground">{title}</span>
      </span>
      {description ? (
        <span className="block pl-4 text-sm text-muted-foreground">{description}</span>
      ) : null}
      <time className="block pl-4 text-xs text-muted-foreground">{timestamp}</time>
    </>
  );
}

export interface NotificationListHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  onMarkAllRead?: () => void;
  /**
   * Number of unread items — when &gt; 0 with `onMarkAllRead`, shows "Mark all read".
   * In the legacy API this is derived from `items`.
   */
  unreadCount?: number;
}

export const NotificationListHeader = forwardRef<HTMLElement, NotificationListHeaderProps>(
  function NotificationListHeader(
    { title = 'Notifications', onMarkAllRead, unreadCount = 0, className, ...props },
    ref,
  ) {
    return (
      <header
        ref={ref}
        data-slot="notification-list-header"
        className={cn('flex items-center justify-between border-b px-4 py-3', className)}
        {...props}
      >
        <span className="text-sm font-medium">{title}</span>
        {onMarkAllRead && unreadCount > 0 ? (
          <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
            Mark all read
          </Button>
        ) : null}
      </header>
    );
  },
);

export type NotificationListListProps = HTMLAttributes<HTMLUListElement>;

export const NotificationListList = forwardRef<HTMLUListElement, NotificationListListProps>(
  function NotificationListList({ className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        data-slot="notification-list-items"
        className={cn('max-h-96 overflow-auto', className)}
        {...props}
      />
    );
  },
);

export type NotificationListItemProps = NotificationItem &
  Omit<LiHTMLAttributes<HTMLLIElement>, 'id' | 'title'>;

export const NotificationListItem = forwardRef<HTMLLIElement, NotificationListItemProps>(
  function NotificationListItem(
    { id: _id, title, description, timestamp, unread, onSelect, className, ...props },
    ref,
  ) {
    const content = (
      <NotificationRowContent
        title={title}
        description={description}
        timestamp={timestamp}
        unread={unread}
      />
    );
    return (
      <li
        ref={ref}
        data-slot="notification-list-item"
        className={cn('border-b last:border-b-0', className)}
        aria-current={unread ? 'true' : undefined}
        {...props}
      >
        {onSelect ? (
          <button
            type="button"
            onClick={onSelect}
            className="flex w-full flex-col gap-1 px-4 py-3 text-left hover:bg-muted/50"
          >
            {content}
          </button>
        ) : (
          <div className="flex flex-col gap-1 px-4 py-3">{content}</div>
        )}
      </li>
    );
  },
);

const NotificationListRoot = forwardRef<HTMLDivElement, NotificationListProps>(
  function NotificationList(
    { items, title = 'Notifications', onMarkAllRead, emptyState, className, children, ...props },
    ref,
  ) {
    const legacyLayout = items !== undefined;
    const hasItems = legacyLayout && items.length > 0;
    const unreadCount = legacyLayout ? items.filter((item) => item.unread).length : 0;

    if (legacyLayout) {
      return (
        <div
          ref={ref}
          data-slot="notification-list"
          className={cn('flex w-80 flex-col', className)}
          {...props}
        >
          <NotificationListHeader
            title={title}
            onMarkAllRead={onMarkAllRead}
            unreadCount={unreadCount}
          />
          {hasItems ? (
            <NotificationListList>
              {items.map((item) => (
                <NotificationListItem key={item.id} {...item} />
              ))}
            </NotificationListList>
          ) : (
            <div className="px-4 py-6">
              {emptyState ?? (
                <EmptyState title="You're all caught up" description="No new notifications." />
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-slot="notification-list"
        className={cn('flex w-80 flex-col', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

NotificationListRoot.displayName = 'NotificationList';
NotificationListHeader.displayName = 'NotificationList.Header';
NotificationListList.displayName = 'NotificationList.List';
NotificationListItem.displayName = 'NotificationList.Item';

/**
 * Notification dropdown / page list. Use **`items`** for static data or compose
 * with **`Header`**, **`List`**, and **`Item`**.
 */
export const NotificationList = Object.assign(NotificationListRoot, {
  Header: NotificationListHeader,
  List: NotificationListList,
  Item: NotificationListItem,
});
