import { Sparkles } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import {
  type UpgradePromptVariantProps,
  upgradePromptVariants,
} from './upgrade-prompt.variants.js';

export interface UpgradePromptProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    UpgradePromptVariantProps {
  /** Promo title — usually a benefit, not a feature ("Unlock unlimited projects"). */
  title: ReactNode;
  /** Supporting description. */
  description?: ReactNode;
  /** Decorative icon. Defaults to a sparkles icon. */
  icon?: ReactNode;
  /** CTA(s). Typically a single primary button. */
  action: ReactNode;
}

/**
 * Promo card driving paid conversions. Three layouts:
 *
 * - `inline` — sits inside a feature gate or a paywalled empty-state.
 * - `card` — standalone card on the dashboard or in a settings page.
 * - `banner` — top-of-app strip; uses primary background.
 */
export const UpgradePrompt = forwardRef<HTMLDivElement, UpgradePromptProps>(function UpgradePrompt(
  { title, description, icon, action, layout, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="upgrade-prompt"
      data-layout={layout ?? 'card'}
      className={cn(upgradePromptVariants({ layout }), className)}
      {...props}
    >
      {layout !== 'banner' ? (
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
        >
          {icon ?? <Sparkles className="size-5" />}
        </span>
      ) : null}
      <div className={cn('flex flex-1 flex-col gap-1', layout === 'banner' ? 'mr-4' : '')}>
        <p
          className={cn(
            'text-sm font-semibold',
            layout === 'banner' ? 'text-current' : 'text-foreground',
          )}
        >
          {title}
        </p>
        {description ? (
          <p
            className={cn(
              'text-sm',
              layout === 'banner' ? 'text-current opacity-80' : 'text-muted-foreground',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      <div data-slot="upgrade-prompt-action" className={cn(layout === 'card' ? 'pt-2' : '')}>
        {action}
      </div>
    </div>
  );
});
