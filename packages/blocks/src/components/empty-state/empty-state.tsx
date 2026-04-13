import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, description, actions, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      data-slot="empty-state"
      className={cn(
        'mx-auto flex max-w-md flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-background px-6 py-12 text-center',
        className,
      )}
      {...props}
    >
      {icon ? (
        <div
          data-slot="empty-state-icon"
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          {icon}
        </div>
      ) : null}
      <div className="flex flex-col gap-1">
        <h2 data-slot="empty-state-title" className="text-lg font-semibold text-foreground">
          {title}
        </h2>
        {description ? (
          <p data-slot="empty-state-description" className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div
          data-slot="empty-state-actions"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
});
