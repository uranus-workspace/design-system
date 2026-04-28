import { Button } from '@uranus-workspace/design-system';
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import type { OAuthProviderId } from './oauth-types.js';

export interface OAuthProviderButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  /** Provider slug for styling, analytics hooks, or `aria-describedby` extensions. */
  provider?: OAuthProviderId;
  children: ReactNode;
}

/** Full-width outlined button for triggering an OAuth/OIDC redirect or popup. Consumers own the click handler. */
export const OAuthProviderButton = forwardRef<HTMLButtonElement, OAuthProviderButtonProps>(
  function OAuthProviderButton({ provider = 'generic', className, children, ...props }, ref) {
    return (
      <Button
        ref={ref}
        type="button"
        variant="outline"
        className={cn('w-full justify-center gap-2', className)}
        data-provider={provider}
        data-slot="oauth-provider-button"
        {...props}
      >
        {children}
      </Button>
    );
  },
);
