import { Button } from '@uranus-workspace/design-system';
import { AlertTriangle, CheckCircle2, Info, Megaphone, X } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import {
  type AnnouncementBannerVariantProps,
  announcementBannerVariants,
} from './announcement-banner.variants.js';

type AnnouncementIntent = NonNullable<AnnouncementBannerVariantProps['intent']>;

const intentIcon: Record<AnnouncementIntent, ReactNode> = {
  info: <Info aria-hidden className="size-4 shrink-0" />,
  success: <CheckCircle2 aria-hidden className="size-4 shrink-0" />,
  warning: <AlertTriangle aria-hidden className="size-4 shrink-0" />,
  danger: <AlertTriangle aria-hidden className="size-4 shrink-0" />,
  neutral: <Megaphone aria-hidden className="size-4 shrink-0" />,
};

export interface AnnouncementBannerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    AnnouncementBannerVariantProps {
  /** Bold leading copy. */
  title: ReactNode;
  /** Optional supporting copy. */
  description?: ReactNode;
  /** Optional CTA(s) shown after the description. */
  action?: ReactNode;
  /** Called when the user dismisses the banner. Hides the X when omitted. */
  onDismiss?: () => void;
  /** Override the default intent icon. */
  icon?: ReactNode;
}

/**
 * Top-of-app announcement banner. Variants for `info`, `success`, `warning`,
 * `danger`, and `neutral`. The banner uses `role="status"` (or `"alert"` when
 * `intent="danger"`) so screen readers announce changes.
 */
export const AnnouncementBanner = forwardRef<HTMLDivElement, AnnouncementBannerProps>(
  function AnnouncementBanner(
    { title, description, action, onDismiss, intent, icon, className, ...props },
    ref,
  ) {
    const resolvedIntent: AnnouncementIntent = intent ?? 'info';
    const role = resolvedIntent === 'danger' ? 'alert' : 'status';

    return (
      <div
        ref={ref}
        role={role}
        data-slot="announcement-banner"
        data-intent={resolvedIntent}
        className={cn(announcementBannerVariants({ intent }), className)}
        {...props}
      >
        <span aria-hidden className="text-current">
          {icon ?? intentIcon[resolvedIntent]}
        </span>
        <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium text-current">{title}</span>
          {description ? <span className="opacity-80">{description}</span> : null}
        </div>
        {action ? (
          <div data-slot="announcement-banner-action" className="ml-auto flex items-center gap-2">
            {action}
          </div>
        ) : null}
        {onDismiss ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            aria-label="Dismiss announcement"
            className="size-7 text-current hover:bg-current/10 hover:text-current"
          >
            <X aria-hidden className="size-4" />
          </Button>
        ) : null}
      </div>
    );
  },
);
