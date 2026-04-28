import { type VariantProps, cva } from 'class-variance-authority';

export const statCardVariants = cva(
  'flex flex-col gap-3 rounded-lg border bg-card p-5 text-card-foreground shadow-sm',
  {
    variants: {
      intent: {
        default: 'border-border',
        positive: 'border-emerald-200 dark:border-emerald-900',
        negative: 'border-destructive/30',
        warning: 'border-amber-300 dark:border-amber-900',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  },
);

export const statCardDeltaVariants = cva(
  'inline-flex items-center gap-1 text-xs font-medium tabular-nums',
  {
    variants: {
      direction: {
        up: 'text-emerald-600 dark:text-emerald-400',
        down: 'text-destructive',
        neutral: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      direction: 'neutral',
    },
  },
);

export type StatCardVariantProps = VariantProps<typeof statCardVariants>;
export type StatCardDeltaVariantProps = VariantProps<typeof statCardDeltaVariants>;
