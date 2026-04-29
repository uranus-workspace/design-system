import { type VariantProps, cva } from 'class-variance-authority';

export const upgradePromptVariants = cva('flex gap-4', {
  variants: {
    layout: {
      inline: 'flex-row items-center rounded-md border bg-card p-4',
      card: 'flex-col rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-6',
      banner:
        'flex-row items-center justify-between rounded-lg bg-primary px-6 py-4 text-primary-foreground',
    },
  },
  defaultVariants: {
    layout: 'card',
  },
});

export type UpgradePromptVariantProps = VariantProps<typeof upgradePromptVariants>;
