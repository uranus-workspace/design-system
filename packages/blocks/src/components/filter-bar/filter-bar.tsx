import { Badge, Button } from '@uranus-workspace/design-system';
import { Plus, X } from 'lucide-react';
import { type HTMLAttributes, type LiHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface ActiveFilter {
  /** Stable id used as React key and to remove the filter. */
  id: string;
  /** Visible label, e.g. `"Status: Active"`. */
  label: ReactNode;
}

type FilterBarSlots = {
  /** Called when the user clears all filters at once. Hidden when omitted. */
  onClearAll?: () => void;
  /** Trigger for adding a new filter (typically a `Popover`). */
  addFilterTrigger?: ReactNode;
  /** Searchbox or other left-aligned slot before the chips. */
  leadingSlot?: ReactNode;
};

export type FilterBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  FilterBarSlots &
  (
    | {
        /** Legacy: chip list from config. */
        filters: ActiveFilter[];
        onRemoveFilter: (id: string) => void;
        children?: never;
      }
    | {
        filters?: undefined;
        onRemoveFilter?: undefined;
        /** Compositional chip row; used when `filters` is omitted. */
        children?: ReactNode;
      }
  );

export type FilterBarChipProps = Omit<LiHTMLAttributes<HTMLLIElement>, 'children'> & {
  id: string;
  label: ReactNode;
  onRemove: (id: string) => void;
};

/**
 * Single removable filter chip (`<li>`) for use inside **`FilterBar`** compositional mode.
 */
export const FilterBarChip = forwardRef<HTMLLIElement, FilterBarChipProps>(function FilterBarChip(
  { id, label, onRemove, className, ...props },
  ref,
) {
  return (
    <li ref={ref} className={cn(className)} {...props}>
      <Badge variant="secondary" className="gap-1 py-0.5 pl-2.5 pr-1">
        <span>{label}</span>
        <button
          type="button"
          onClick={() => onRemove(id)}
          aria-label={`Remove filter ${typeof label === 'string' ? label : ''}`}
          className="ml-1 rounded-full p-0.5 hover:bg-muted/70"
        >
          <X aria-hidden className="size-3" />
        </button>
      </Badge>
    </li>
  );
});

const FilterBarRoot = forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  {
    filters,
    onRemoveFilter,
    onClearAll,
    addFilterTrigger,
    leadingSlot,
    children,
    className,
    ...props
  },
  ref,
) {
  const legacyLayout = filters !== undefined;
  const chipCount = legacyLayout ? filters.length : 0;

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
        {legacyLayout
          ? filters.map((filter) => (
              <FilterBarChip
                key={filter.id}
                id={filter.id}
                label={filter.label}
                onRemove={onRemoveFilter}
              />
            ))
          : children}
      </ul>

      {legacyLayout && onClearAll && chipCount > 0 ? (
        <Button variant="ghost" size="sm" type="button" onClick={onClearAll} className="ml-auto">
          Clear all
        </Button>
      ) : null}
    </div>
  );
});

FilterBarRoot.displayName = 'FilterBar';
FilterBarChip.displayName = 'FilterBar.Chip';

/**
 * Chip-row filter UI with a slot for a search input or popover trigger to add
 * new filters. Each chip renders as a removable `Badge` with an `X` button.
 * Pass **`filters`** + **`onRemoveFilter`** for a config array, or omit them and
 * render **`FilterBar.Chip`** (or custom `<li>` nodes) as **`children`** inside the list.
 */
export const FilterBar = Object.assign(FilterBarRoot, {
  Chip: FilterBarChip,
});
