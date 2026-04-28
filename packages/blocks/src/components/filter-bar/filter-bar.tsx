import { Badge, Button } from '@uranus-workspace/design-system';
import { Plus, X } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface ActiveFilter {
  /** Stable id used as React key and to remove the filter. */
  id: string;
  /** Visible label, e.g. `"Status: Active"`. */
  label: ReactNode;
}

export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  /** List of currently applied filters. */
  filters: ActiveFilter[];
  /** Called when the user removes a single filter. */
  onRemoveFilter: (id: string) => void;
  /** Called when the user clears all filters at once. Hidden when omitted. */
  onClearAll?: () => void;
  /** Trigger for adding a new filter (typically a `Popover`). */
  addFilterTrigger?: ReactNode;
  /** Searchbox or other left-aligned slot before the chips. */
  leadingSlot?: ReactNode;
}

/**
 * Chip-row filter UI with a slot for a search input or popover trigger to add
 * new filters. Each chip renders as a removable `Badge` with an `X` button.
 */
export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  { filters, onRemoveFilter, onClearAll, addFilterTrigger, leadingSlot, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="filter-bar"
      role="toolbar"
      aria-label="Filters"
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-md border bg-background p-2',
        className,
      )}
      {...props}
    >
      {leadingSlot ? <div data-slot="filter-bar-leading">{leadingSlot}</div> : null}

      {addFilterTrigger ?? (
        <Button variant="outline" size="sm" type="button" disabled>
          <Plus aria-hidden className="size-3" />
          <span>Add filter</span>
        </Button>
      )}

      <ul className="flex flex-wrap items-center gap-1.5">
        {filters.map((filter) => (
          <li key={filter.id}>
            <Badge variant="secondary" className="gap-1 py-0.5 pl-2.5 pr-1">
              <span>{filter.label}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter(filter.id)}
                aria-label={`Remove filter ${typeof filter.label === 'string' ? filter.label : ''}`}
                className="ml-1 rounded-full p-0.5 hover:bg-muted/70"
              >
                <X aria-hidden className="size-3" />
              </button>
            </Badge>
          </li>
        ))}
      </ul>

      {onClearAll && filters.length > 0 ? (
        <Button variant="ghost" size="sm" type="button" onClick={onClearAll} className="ml-auto">
          Clear all
        </Button>
      ) : null}
    </div>
  );
});
