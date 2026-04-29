import { Badge } from '@uranus-workspace/design-system';
import { X } from 'lucide-react';
import { type HTMLAttributes, type LiHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export type FilterBarProps = HTMLAttributes<HTMLDivElement>;

export type FilterBarChipsProps = HTMLAttributes<HTMLUListElement>;

export type FilterBarChipProps = Omit<LiHTMLAttributes<HTMLLIElement>, 'children'> & {
  /** Stable id passed to `onRemove` so consumers can identify which chip to drop. */
  id: string;
  label: ReactNode;
  onRemove: (id: string) => void;
};

/**
 * Wrapper `<ul>` for chips. Place inside **`FilterBar`** to host **`FilterBar.Chip`** items.
 */
export const FilterBarChips = forwardRef<HTMLUListElement, FilterBarChipsProps>(
  function FilterBarChips({ className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        data-slot="filter-bar-chips"
        className={cn('flex flex-wrap items-center gap-1.5', className)}
        {...props}
      />
    );
  },
);

/**
 * Single removable filter chip (`<li>`) for use inside **`FilterBar.Chips`**.
 */
export const FilterBarChip = forwardRef<HTMLLIElement, FilterBarChipProps>(function FilterBarChip(
  { id, label, onRemove, className, ...props },
  ref,
) {
  const labelText = typeof label === 'string' ? label : '';
  return (
    <li ref={ref} data-slot="filter-bar-chip" className={cn(className)} {...props}>
      <Badge variant="secondary" className="gap-1 py-0.5 pl-2.5 pr-1">
        <span>{label}</span>
        <button
          type="button"
          onClick={() => onRemove(id)}
          aria-label={`Remover filtro ${labelText}`}
          className="ml-1 rounded-full p-0.5 hover:bg-muted/70"
        >
          <X aria-hidden className="size-3" />
        </button>
      </Badge>
    </li>
  );
});

const FilterBarRoot = forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="filter-bar"
      role="toolbar"
      aria-label={props['aria-label'] ?? 'Filtros'}
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-md border bg-background p-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

FilterBarRoot.displayName = 'FilterBar';
FilterBarChips.displayName = 'FilterBar.Chips';
FilterBarChip.displayName = 'FilterBar.Chip';

/**
 * Toolbar wrapper for filter UIs. Compose a search input, an "add filter" trigger,
 * a chip list (**`FilterBar.Chips`** + **`FilterBar.Chip`**), and a "clear all" button
 * as **children**. The root renders `role="toolbar"` and a default `aria-label="Filtros"`.
 */
export const FilterBar = Object.assign(FilterBarRoot, {
  Chips: FilterBarChips,
  Chip: FilterBarChip,
});
