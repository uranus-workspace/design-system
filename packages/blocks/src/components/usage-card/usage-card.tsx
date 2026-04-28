import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from '@uranus-workspace/design-system';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export type UsageIntent = 'default' | 'warning' | 'danger';

export interface UsageCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Metric label (e.g. `"Storage"`, `"API calls"`). */
  label: ReactNode;
  /** Optional supporting copy under the label. */
  description?: ReactNode;
  /** Current usage. Renders raw — pass formatted numbers if needed. */
  used: number;
  /** Quota / hard ceiling. */
  limit: number;
  /** Unit suffix (e.g. `"GB"`, `"requests"`). Defaults to nothing. */
  unit?: ReactNode;
  /** Optional CTA — usually shown when usage is over the warning threshold. */
  cta?: ReactNode;
  /** Percentage at which to switch to `warning` intent. Defaults to `0.8`. */
  warningThreshold?: number;
  /** Percentage at which to switch to `danger` intent. Defaults to `0.95`. */
  dangerThreshold?: number;
}

const intentRingClass: Record<UsageIntent, string> = {
  default: 'text-muted-foreground',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-destructive',
};

/**
 * Quota usage card with a progress bar that swaps intents past configurable
 * thresholds. Uses tabular numbers so the value/limit ratio aligns nicely.
 */
export const UsageCard = forwardRef<HTMLDivElement, UsageCardProps>(function UsageCard(
  {
    label,
    description,
    used,
    limit,
    unit,
    cta,
    warningThreshold = 0.8,
    dangerThreshold = 0.95,
    className,
    ...props
  },
  ref,
) {
  const ratio = limit > 0 ? used / limit : 0;
  const percent = Math.min(100, Math.round(ratio * 100));
  const intent: UsageIntent =
    ratio >= dangerThreshold ? 'danger' : ratio >= warningThreshold ? 'warning' : 'default';

  return (
    <Card
      ref={ref}
      data-slot="usage-card"
      data-intent={intent}
      className={cn('flex flex-col gap-2', className)}
      {...props}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-2xl font-semibold tabular-nums text-foreground">
            {used.toLocaleString('pt-BR')}
            {unit ? (
              <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>
            ) : null}
          </span>
          <span className={cn('text-xs tabular-nums', intentRingClass[intent])}>
            {percent}% de {limit.toLocaleString('pt-BR')}
            {unit ? ` ${typeof unit === 'string' ? unit : ''}` : ''}
          </span>
        </div>
        <Progress
          value={percent}
          aria-label={`${percent}% used`}
          className={cn(
            'h-2',
            intent === 'warning' && '[&>*]:bg-amber-500',
            intent === 'danger' && '[&>*]:bg-destructive',
          )}
        />
        {cta ? <div data-slot="usage-card-cta">{cta}</div> : null}
      </CardContent>
    </Card>
  );
});
