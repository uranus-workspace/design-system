import { type VariantProps, cva } from 'class-variance-authority';

export const detailDrawerVariants = cva('flex h-full flex-col', {
  variants: {
    size: {
      sm: 'sm:max-w-sm',
      md: 'sm:max-w-md',
      lg: 'sm:max-w-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type DetailDrawerVariantProps = VariantProps<typeof detailDrawerVariants>;
