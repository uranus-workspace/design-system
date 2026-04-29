import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface ThinkingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Status label read by screen readers and rendered next to the dots. */
  label?: string;
  /** Compact variant: dots only (no label). */
  dotsOnly?: boolean;
}

/**
 * Three breathing dots with an optional status label. Announces via
 * `role="status"` with `aria-live="polite"` so the assistant turn is heard.
 */
export const ThinkingIndicator = forwardRef<HTMLDivElement, ThinkingIndicatorProps>(
  function ThinkingIndicator({ label = 'Pensando…', dotsOnly, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="thinking-indicator"
        role="status"
        aria-live="polite"
        className={cn('inline-flex items-center gap-2 text-muted-foreground', className)}
        {...props}
      >
        <span data-slot="thinking-dots" className="inline-flex items-center gap-1" aria-hidden>
          <span
            className={cn(
              'inline-block size-1.5 rounded-full bg-current',
              'motion-safe:animate-pulse [animation-delay:0ms]',
            )}
          />
          <span
            className={cn(
              'inline-block size-1.5 rounded-full bg-current',
              'motion-safe:animate-pulse [animation-delay:200ms]',
            )}
          />
          <span
            className={cn(
              'inline-block size-1.5 rounded-full bg-current',
              'motion-safe:animate-pulse [animation-delay:400ms]',
            )}
          />
        </span>
        {dotsOnly ? (
          <span className="sr-only">{label}</span>
        ) : (
          <span className="text-xs">{label}</span>
        )}
      </div>
    );
  },
);
