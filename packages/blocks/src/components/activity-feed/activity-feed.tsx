import { Avatar, AvatarFallback, AvatarImage } from '@uranus-workspace/design-system';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface ActivityActor {
  name: string;
  avatarUrl?: string;
  initials?: string;
}

export interface ActivityItem {
  id: string;
  actor: ActivityActor;
  /** What the actor did, e.g. `"created"`, `"approved"`. */
  action: ReactNode;
  /** Optional target of the action, e.g. `"Project Apollo"`. */
  target?: ReactNode;
  /** Pre-formatted timestamp string. */
  timestamp: ReactNode;
  /** Optional decorative icon rendered next to the avatar. */
  icon?: ReactNode;
}

export interface ActivityFeedProps extends HTMLAttributes<HTMLOListElement> {
  items: ActivityItem[];
  /** Element shown when `items` is empty. */
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

/**
 * Vertical timeline rendered as an `<ol>` so screen readers announce the
 * length of the activity history. Each item shows actor avatar, action,
 * optional target, and a timestamp.
 */
export const ActivityFeed = forwardRef<HTMLOListElement, ActivityFeedProps>(function ActivityFeed(
  { items, emptyState, className, ...props },
  ref,
) {
  if (items.length === 0) {
    return (
      <div
        data-slot="activity-feed-empty"
        role="status"
        className={cn('rounded-md border bg-card p-6 text-center', className)}
      >
        {emptyState ?? <p className="text-sm text-muted-foreground">No activity yet.</p>}
      </div>
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
        <li key={item.id} data-slot="activity-feed-item" className="flex items-start gap-3">
          <div className="relative flex flex-col items-center">
            <Avatar className="size-9">
              {item.actor.avatarUrl ? (
                <AvatarImage src={item.actor.avatarUrl} alt={item.actor.name} />
              ) : null}
              <AvatarFallback>{getInitials(item.actor)}</AvatarFallback>
            </Avatar>
            {item.icon ? (
              <span
                aria-hidden
                className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-background text-xs ring-2 ring-background"
              >
                {item.icon}
              </span>
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm">
              <span className="font-medium text-foreground">{item.actor.name}</span>{' '}
              <span className="text-muted-foreground">{item.action}</span>
              {item.target ? (
                <>
                  {' '}
                  <span className="font-medium text-foreground">{item.target}</span>
                </>
              ) : null}
            </p>
            <time className="text-xs text-muted-foreground">{item.timestamp}</time>
          </div>
        </li>
      ))}
    </ol>
  );
});
