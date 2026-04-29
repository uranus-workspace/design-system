import { Button } from '@uranus-workspace/design-system';
import { type HTMLAttributes, type LiHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export type NotificationListProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export interface NotificationListHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  /** When set together with `unreadCount > 0`, renders a "Marcar tudo como lido" button. */
  onMarkAllRead?: () => void;
  unreadCount?: number;
}

export const NotificationListHeader = forwardRef<HTMLElement, NotificationListHeaderProps>(
  function NotificationListHeader(
    { title = 'Notificações', onMarkAllRead, unreadCount = 0, className, ...props },
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
            Marcar tudo como lido
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

export interface NotificationListItemProps
  extends Omit<LiHTMLAttributes<HTMLLIElement>, 'title' | 'children'> {
  title: ReactNode;
  description?: ReactNode;
  timestamp: ReactNode;
  unread?: boolean;
  onSelect?: () => void;
}

export const NotificationListItem = forwardRef<HTMLLIElement, NotificationListItemProps>(
  function NotificationListItem(
    { title, description, timestamp, unread, onSelect, className, ...props },
    ref,
  ) {
    const content = (
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
  function NotificationList({ className, children, ...props }, ref) {
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
 * Notification dropdown / page list. Compose with **`NotificationList.Header`**,
 * **`NotificationList.List`**, and **`NotificationList.Item`**.
 */
export const NotificationList = Object.assign(NotificationListRoot, {
  Header: NotificationListHeader,
  List: NotificationListList,
  Item: NotificationListItem,
});
