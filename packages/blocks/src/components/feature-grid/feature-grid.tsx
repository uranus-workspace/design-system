import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface FeatureItem {
  id: string;
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export interface FeatureGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Legacy cells. Omit when composing with `FeatureGrid.Item`. */
  features?: FeatureItem[];
  columns?: 2 | 3 | 4;
}

const columnClass: Record<NonNullable<FeatureGridProps['columns']>, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export type FeatureGridItemProps = FeatureItem & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export const FeatureGridItem = forwardRef<HTMLDivElement, FeatureGridItemProps>(
  function FeatureGridItem({ id: _id, icon, title, description, className, ...props }, ref) {
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
  { features, columns = 3, className, children, ...props },
  ref,
) {
  const legacyLayout = features !== undefined;
  return (
    <div
      ref={ref}
      data-slot="feature-grid"
      className={cn('grid gap-8', columnClass[columns], className)}
      {...props}
    >
      {legacyLayout
        ? features.map((feature) => <FeatureGridItem key={feature.id} {...feature} />)
        : children}
    </div>
  );
});

FeatureGridRoot.displayName = 'FeatureGrid';
FeatureGridItem.displayName = 'FeatureGrid.Item';

/**
 * Marketing feature grid. Pass **`features`** or compose **`FeatureGrid.Item`** children.
 */
export const FeatureGrid = Object.assign(FeatureGridRoot, {
  Item: FeatureGridItem,
});
