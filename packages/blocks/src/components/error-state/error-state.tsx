import { Button } from '@uranus-workspace/design-system';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Decorative icon. Defaults to a warning triangle. */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Action slot. When omitted but `onRetry` is set, a default "Try again" button is rendered. */
  actions?: ReactNode;
  /** Click handler for the default retry button. Hidden when `actions` is provided. */
  onRetry?: () => void;
  /** Label for the default retry button. Defaults to `"Try again"`. */
  retryLabel?: ReactNode;
}

/**
 * Failure twin of [EmptyState](../empty-state/empty-state.js). Mirrors the
 * same API so swapping between the two requires no layout changes. Uses
 * `role="alert"` so screen readers announce errors immediately.
 */
export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(function ErrorState(
  { icon, title, description, actions, onRetry, retryLabel = 'Try again', className, ...props },
  ref,
) {
  const renderedActions =
    actions ??
    (onRetry ? (
      <Button variant="outline" size="sm" onClick={onRetry} className="gap-2">
        <RefreshCw aria-hidden className="size-4" />
        <span>{retryLabel}</span>
      </Button>
    ) : null);

  return (
    <div
      ref={ref}
      role="alert"
      data-slot="error-state"
      className={cn(
        'mx-auto flex max-w-md flex-col items-center justify-center gap-4 rounded-lg border border-destructive/40 bg-destructive/5 px-6 py-12 text-center',
        className,
      )}
      {...props}
    >
      <div
        data-slot="error-state-icon"
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive"
      >
        {icon ?? <AlertTriangle className="size-6" />}
      </div>
      <div className="flex flex-col gap-1">
        <h2 data-slot="error-state-title" className="text-lg font-semibold text-foreground">
          {title}
        </h2>
        {description ? (
          <p data-slot="error-state-description" className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {renderedActions ? (
        <div
          data-slot="error-state-actions"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {renderedActions}
        </div>
      ) : null}
    </div>
  );
});
