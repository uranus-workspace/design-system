import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface StreamingTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text emitted so far. Re-renders as the upstream stream chunks arrive. */
  text: string;
  /** Whether the stream is still active (controls the blinking caret). */
  streaming?: boolean;
  /** Caret character. Default `▍`. */
  caret?: string;
}

/**
 * Renders streaming text with a blinking caret while `streaming` is true.
 * The caret animation collapses to a static character when the user prefers
 * reduced motion (driven by the `reduce-motion:` Tailwind variant).
 */
export const StreamingText = forwardRef<HTMLSpanElement, StreamingTextProps>(function StreamingText(
  { text, streaming = false, caret = '▍', className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="streaming-text"
      data-streaming={streaming || undefined}
      className={cn('whitespace-pre-wrap', className)}
      {...props}
    >
      {text}
      {streaming ? (
        <span
          aria-hidden
          data-slot="streaming-caret"
          className={cn(
            'ml-0.5 inline-block translate-y-px text-foreground/70',
            'motion-safe:animate-pulse',
          )}
        >
          {caret}
        </span>
      ) : null}
    </span>
  );
});
