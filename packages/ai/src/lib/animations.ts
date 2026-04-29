import type { Transition, Variants } from 'motion/react';

const standard: Transition = { duration: 0.2, ease: [0.2, 0, 0, 1] };
const emphasized: Transition = { duration: 0.32, ease: [0.3, 0, 0, 1] };

export const messageEnterVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: emphasized },
};

export const caretBlinkTransition: Transition = {
  duration: 1.0,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'linear',
};

export const dotPulseTransition = (delay: number): Transition => ({
  duration: 1.0,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'easeInOut',
  delay,
});

export const stageEnterVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: standard },
};

export const sourceCycleVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: standard },
  exit: { opacity: 0, y: -4, transition: standard },
};

export const shimmerTransition: Transition = {
  duration: 1.6,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'linear',
};

/** Returns true on the server and on clients that prefer reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
