import type { Transition, Variants } from 'motion/react';

const standard: Transition = { duration: 0.2, ease: [0.2, 0, 0, 1] };
const emphasized: Transition = { duration: 0.32, ease: [0.3, 0, 0, 1] };

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: standard },
  exit: { opacity: 0, transition: standard },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: emphasized },
  exit: { opacity: 0, y: 8, transition: standard },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: emphasized },
  exit: { opacity: 0, scale: 0.96, transition: standard },
};

/**
 * Returns variants that collapse to instant transitions when the user prefers
 * reduced motion. Call from a client component so the media query is checked
 * in the browser.
 */
export function respectReducedMotion(variants: Variants): Variants {
  if (typeof window === 'undefined') return variants;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return variants;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  };
}
