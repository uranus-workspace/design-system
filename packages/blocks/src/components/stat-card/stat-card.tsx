import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import {
  type StatCardDeltaVariantProps,
  type StatCardVariantProps,
  statCardDeltaVariants,
  statCardVariants,
} from './stat-card.variants.js';

export interface StatCardDelta {
  /** Numeric or formatted change value (e.g. `"+12%"`, `12.5`). */
  value: ReactNode;
  /** Direction. Defaults to `"neutral"`. */
  direction?: NonNullable<StatCardDeltaVariantProps['direction']>;
  /** Optional period label (e.g. `"vs last week"`). */
  label?: ReactNode;
}

export interface StatCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    StatCardVariantProps {
  label: ReactNode;
  value: ReactNode;
  /** Optional delta indicator with direction-aware icon and color. */
  delta?: StatCardDelta;
  /** Decorative icon shown to the right of the label. */
  icon?: ReactNode;
  /** Optional sparkline element rendered at the bottom (typically a `<ChartContainer>`). */
  sparkline?: ReactNode;
}

const directionIcon = {
  up: <ArrowUpRight aria-hidden className="size-3" />,
  down: <ArrowDownRight aria-hidden className="size-3" />,
  neutral: <Minus aria-hidden className="size-3" />,
} as const;

/**
 * KPI card — label, value, optional delta, optional icon and sparkline.
 *
 * The delta block is announced as an inline group; consumers should make
 * sure the `value` itself is meaningful in isolation since assistive tech
 * users may skip the delta.
 */
export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, delta, icon, sparkline, intent, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="stat-card"
      className={cn(statCardVariants({ intent }), className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <span data-slot="stat-card-label" className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        {icon ? (
          <span aria-hidden className="text-muted-foreground">
            {icon}
          </span>
        ) : null}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span
          data-slot="stat-card-value"
          className="text-3xl font-semibold tabular-nums tracking-tight text-foreground"
        >
          {value}
        </span>
        {delta ? (
          <span
            data-slot="stat-card-delta"
            className={statCardDeltaVariants({ direction: delta.direction ?? 'neutral' })}
          >
            {directionIcon[delta.direction ?? 'neutral']}
            <span>{delta.value}</span>
            {delta.label ? <span className="text-muted-foreground">{delta.label}</span> : null}
          </span>
        ) : null}
      </div>
      {sparkline ? <div data-slot="stat-card-sparkline">{sparkline}</div> : null}
    </div>
  );
});
