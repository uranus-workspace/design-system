import { type VariantProps, cva } from 'class-variance-authority';

export const announcementBannerVariants = cva(
  'flex w-full flex-wrap items-center gap-3 px-4 py-3 text-sm sm:px-6',
  {
    variants: {
      intent: {
        info: 'bg-primary/10 text-primary',
        success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
        warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
        danger: 'bg-destructive/15 text-destructive',
        neutral: 'bg-muted text-foreground',
      },
    },
    defaultVariants: {
      intent: 'info',
    },
  },
);

export type AnnouncementBannerVariantProps = VariantProps<typeof announcementBannerVariants>;
