import { Avatar, AvatarFallback, AvatarImage } from '@uranus-workspace/design-system';
import {
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';
import { cn } from '../../lib/cn.js';

export interface ActivityActor {
  name: string;
  avatarUrl?: string;
  initials?: string;
}

export interface ActivityItem {
  id: string;
  actor: ActivityActor;
  action: ReactNode;
  target?: ReactNode;
  timestamp: ReactNode;
  icon?: ReactNode;
}

export interface ActivityFeedProps extends HTMLAttributes<HTMLOListElement> {
  /** Legacy timeline rows. Omit when composing with `ActivityFeed.Item` as children. */
  items?: ActivityItem[];
  emptyState?: ReactNode;
}

function getInitials(actor: ActivityActor): string {
  if (actor.initials) return actor.initials;
  return actor.name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export type ActivityFeedItemProps = ActivityItem & Omit<LiHTMLAttributes<HTMLLIElement>, 'id'>;

export const ActivityFeedItem = forwardRef<HTMLLIElement, ActivityFeedItemProps>(
  function ActivityFeedItem(
    { id: _id, actor, action, target, timestamp, icon, className, ...props },
    ref,
  ) {
    return (
      <li
        ref={ref}
        data-slot="activity-feed-item"
        className={cn('flex items-start gap-3', className)}
        {...props}
      >
        <div className="relative flex flex-col items-center">
          <Avatar className="size-9">
            {actor.avatarUrl ? (
              <AvatarImage src={actor.avatarUrl} alt={actor.name} />
            ) : null}
            <AvatarFallback>{getInitials(actor)}</AvatarFallback>
          </Avatar>
          {icon ? (
            <span
              aria-hidden
              className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-background text-xs ring-2 ring-background"
            >
              {icon}
            </span>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm">
            <span className="font-medium text-foreground">{actor.name}</span>{' '}
            <span className="text-muted-foreground">{action}</span>
            {target ? (
              <>
                {' '}
                <span className="font-medium text-foreground">{target}</span>
              </>
            ) : null}
          </p>
          <time className="text-xs text-muted-foreground">{timestamp}</time>
        </div>
      </li>
    );
  },
);

export interface ActivityFeedEmptyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const ActivityFeedEmpty = forwardRef<HTMLDivElement, ActivityFeedEmptyProps>(
  function ActivityFeedEmpty({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="activity-feed-empty"
        role="status"
        className={cn('rounded-md border bg-card p-6 text-center', className)}
        {...props}
      >
        {children ?? <p className="text-sm text-muted-foreground">No activity yet.</p>}
      </div>
    );
  },
);

const ActivityFeedRoot = forwardRef<HTMLOListElement, ActivityFeedProps>(function ActivityFeed(
  { items, emptyState, className, children, ...props },
  ref,
) {
  const legacyLayout = items !== undefined;

  if (legacyLayout) {
    if (items.length === 0) {
      return (
        <ActivityFeedEmpty>
          {emptyState ?? <p className="text-sm text-muted-foreground">No activity yet.</p>}
        </ActivityFeedEmpty>
      );
    }

    return (
      <ol
        ref={ref}
        data-slot="activity-feed"
        className={cn('flex flex-col gap-4', className)}
        {...props}
      >
        {items.map((item) => (
          <ActivityFeedItem key={item.id} {...item} />
        ))}
      </ol>
    );
  }

  return (
    <ol
      ref={ref}
      data-slot="activity-feed"
      className={cn('flex flex-col gap-4', className)}
      {...props}
    >
      {children}
    </ol>
  );
});

ActivityFeedRoot.displayName = 'ActivityFeed';
ActivityFeedItem.displayName = 'ActivityFeed.Item';
ActivityFeedEmpty.displayName = 'ActivityFeed.Empty';

/**
 * Activity timeline as an `<ol>`. Pass **`items`** or compose **`ActivityFeed.Item`** children.
 * For zero state in compound mode, render **`ActivityFeed.Empty`** instead of the list.
 */
export const ActivityFeed = Object.assign(ActivityFeedRoot, {
  Item: ActivityFeedItem,
  Empty: ActivityFeedEmpty,
});