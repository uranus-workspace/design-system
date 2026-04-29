import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface FeatureGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
}

const columnClass: Record<NonNullable<FeatureGridProps['columns']>, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export interface FeatureGridItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export const FeatureGridItem = forwardRef<HTMLDivElement, FeatureGridItemProps>(
  function FeatureGridItem({ icon, title, description, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="feature-grid-item"
        className={cn('flex flex-col gap-3', className)}
        {...props}
      >
        {icon ? (
          <span
            aria-hidden
            className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            {icon}
          </span>
        ) : null}
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    );
  },
);

const FeatureGridRoot = forwardRef<HTMLDivElement, FeatureGridProps>(function FeatureGrid(
  { columns = 3, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="feature-grid"
      className={cn('grid gap-8', columnClass[columns], className)}
      {...props}
    >
      {children}
    </div>
  );
});

FeatureGridRoot.displayName = 'FeatureGrid';
FeatureGridItem.displayName = 'FeatureGrid.Item';

/**
 * Marketing feature grid. Compose with **`FeatureGrid.Item`** children.
 */
export const FeatureGrid = Object.assign(FeatureGridRoot, {
  Item: FeatureGridItem,
});
