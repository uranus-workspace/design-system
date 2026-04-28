import { type VariantProps, cva } from 'class-variance-authority';

export const authLayoutVariants = cva('grid min-h-svh w-full bg-background', {
  variants: {
    variant: {
      split: 'grid-cols-1 lg:grid-cols-2',
      centered: 'place-items-center px-4',
    },
  },
  defaultVariants: {
    variant: 'split',
  },
});

export type AuthLayoutVariantProps = VariantProps<typeof authLayoutVariants>;
