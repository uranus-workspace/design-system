import { Search } from 'lucide-react';
import { type HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { cn } from '../../lib/cn.js';

export interface SearchingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Source titles being checked. Cycled at `intervalMs` cadence. */
  sources?: string[];
  /** Cycle interval in ms. Default 1500. */
  intervalMs?: number;
  /** Optional fixed status label. */
  label?: string;
}

const DEFAULT_LABEL = 'Pesquisando…';

/**
 * Status pill that cycles through `sources` as the assistant searches the web
 * or knowledge base. Announces via `role="status"` with `aria-live="polite"`.
 */
export const SearchingIndicator = forwardRef<HTMLDivElement, SearchingIndicatorProps>(
  function SearchingIndicator(
    { sources, intervalMs = 1500, label = DEFAULT_LABEL, className, ...props },
    ref,
  ) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (!sources || sources.length <= 1) return;
      const id = setInterval(() => setIndex((c) => (c + 1) % sources.length), intervalMs);
      return () => clearInterval(id);
    }, [sources, intervalMs]);

    const current = sources && sources.length > 0 ? sources[index] : undefined;

    return (
      <div
        ref={ref}
        data-slot="searching-indicator"
        role="status"
        aria-live="polite"
        className={cn(
          'inline-flex items-center gap-2 rounded-full border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground',
          className,
        )}
        {...props}
      >
        <Search aria-hidden className="size-3.5 motion-safe:animate-pulse" />
        <span className="font-medium text-foreground">{label}</span>
        {current ? (
          <span
            key={current}
            data-slot="searching-source"
            className="max-w-[28ch] truncate text-muted-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300"
          >
            {current}
          </span>
        ) : null}
      </div>
    );
  },
);
