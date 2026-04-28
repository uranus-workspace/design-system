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

/** Brand gradients from the Uranus preset (`packages/tailwind-config/preset.css`). */
export const authLayoutBrandPanelVariants = cva(
  'hidden flex-col justify-between p-10 text-primary-foreground lg:flex',
  {
    variants: {
      brandTone: {
        cosmic: 'bg-cosmic',
        aurora: 'bg-aurora',
        nebula: 'bg-nebula',
        galaxy: 'bg-galaxy',
      },
    },
    defaultVariants: {
      brandTone: 'cosmic',
    },
  },
);

export type AuthLayoutVariantProps = VariantProps<typeof authLayoutVariants>;
export type AuthLayoutBrandToneProps = VariantProps<typeof authLayoutBrandPanelVariants>;
