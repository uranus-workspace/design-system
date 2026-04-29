import { Separator } from '@uranus-workspace/design-system';
import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface AuthDividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Label between SSO and credential sections. Keep short for narrow cards. */
  label?: string;
}

/** Two-line separator with centered text — use between SSO buttons and email/password flows. */
export const AuthDivider = forwardRef<HTMLDivElement, AuthDividerProps>(function AuthDivider(
  { label = 'or continue with', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="auth-divider"
      className={cn('flex items-center gap-3 py-3', className)}
      {...props}
    >
      <Separator className="flex-1" />
      <span className="shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <Separator className="flex-1" />
    </div>
  );
});
