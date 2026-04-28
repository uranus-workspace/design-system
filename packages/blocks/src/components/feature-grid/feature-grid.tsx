import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface FeatureItem {
  /** Stable id used as React key. */
  id: string;
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export interface FeatureGridProps extends HTMLAttributes<HTMLDivElement> {
  features: FeatureItem[];
  /**
   * Number of columns at the largest breakpoint. Defaults to `3`. Always
   * 1 column on mobile and 2 on `sm`.
   */
  columns?: 2 | 3 | 4;
}

const columnClass: Record<NonNullable<FeatureGridProps['columns']>, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * Responsive grid of features (icon + title + description). Pairs naturally
 * with [Hero](../hero/hero.js) on the marketing site.
 */
export const FeatureGrid = forwardRef<HTMLDivElement, FeatureGridProps>(function FeatureGrid(
  { features, columns = 3, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="feature-grid"
      className={cn('grid gap-8', columnClass[columns], className)}
      {...props}
    >
      {features.map((feature) => (
        <div key={feature.id} data-slot="feature-grid-item" className="flex flex-col gap-3">
          {feature.icon ? (
            <span
              aria-hidden
              className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
            >
              {feature.icon}
            </span>
          ) : null}
          <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
});
