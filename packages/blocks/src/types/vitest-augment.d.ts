/**
 * Ambient type augmentation for Vitest matchers added at runtime by
 * `packages/test-config/setup.ts`:
 *
 *   - `@testing-library/jest-dom/vitest` (already augments via its own d.ts)
 *   - `expect.extend(toHaveNoViolations)` from `jest-axe` — augmented here,
 *     since `@types/jest-axe` only ships augmentations for `jest`.
 */
import 'vitest';

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): unknown;
  }
}
