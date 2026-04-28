import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface StatGridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns at the largest breakpoint. The grid is always responsive
   * — 1 column on mobile, 2 on `sm`, then `columns` on `lg`.
   *
   * Defaults to `auto`, which uses `grid-cols-[repeat(auto-fit,minmax(220px,1fr))]`.
   */
  columns?: 1 | 2 | 3 | 4 | 'auto';
}

const columnClassMap: Record<NonNullable<StatGridProps['columns']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  auto: 'grid-cols-[repeat(auto-fit,minmax(220px,1fr))]',
};

/**
 * Responsive grid wrapper for [StatCard](./stat-card.js) (or any KPI cards).
 * Centralizes the breakpoint contract so every dashboard surface gets the
 * same horizontal rhythm.
 */
export const StatGrid = forwardRef<HTMLDivElement, StatGridProps>(function StatGrid(
  { columns = 'auto', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="stat-grid"
      className={cn('grid gap-4', columnClassMap[columns], className)}
      {...props}
    />
  );
});
