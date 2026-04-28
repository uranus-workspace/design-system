import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import { type AuthLayoutVariantProps, authLayoutVariants } from './auth-layout.variants.js';

export interface AuthLayoutProps extends HTMLAttributes<HTMLDivElement>, AuthLayoutVariantProps {
  /** Brand panel content (logo, marketing copy, illustration) — only rendered in `split` variant. */
  brandPanel?: ReactNode;
  /** Form content (the actual auth form). */
  children: ReactNode;
}

/**
 * Wrapper for every auth screen — split-screen by default with the brand
 * panel on the left and the form on the right, or centered for minimal
 * flows like email verification.
 *
 * Renders `<main>` so screen readers can land on the form area directly.
 */
export const AuthLayout = forwardRef<HTMLDivElement, AuthLayoutProps>(function AuthLayout(
  { brandPanel, children, variant = 'split', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="auth-layout"
      className={cn(authLayoutVariants({ variant }), className)}
      {...props}
    >
      {variant === 'split' && brandPanel ? (
        <aside
          data-slot="auth-layout-brand"
          aria-hidden="true"
          className="hidden flex-col justify-between bg-cosmic p-10 text-primary-foreground lg:flex"
        >
          {brandPanel}
        </aside>
      ) : null}
      <main
        data-slot="auth-layout-main"
        className={cn(
          'flex w-full items-center justify-center px-4 py-10 sm:px-6',
          variant === 'centered' && 'max-w-lg',
        )}
      >
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
});
