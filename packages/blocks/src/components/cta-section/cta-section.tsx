import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface CTASectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Optional eyebrow chip above the title. */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Primary + secondary action buttons. */
  actions: ReactNode;
}

/**
 * Bottom-of-page CTA. Centered card on a tinted background — the moment
 * marketing pages convert visitors. Pairs with [Hero](../hero/hero.js) and
 * [FeatureGrid](../feature-grid/feature-grid.js).
 */
export const CTASection = forwardRef<HTMLElement, CTASectionProps>(function CTASection(
  { eyebrow, title, description, actions, className, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      data-slot="cta-section"
      className={cn(
        'mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-2xl bg-primary/5 px-6 py-16 text-center sm:py-20',
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2
        data-slot="cta-section-title"
        className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p
          data-slot="cta-section-description"
          className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground"
        >
          {description}
        </p>
      ) : null}
      <div
        data-slot="cta-section-actions"
        className="flex flex-wrap items-center justify-center gap-3"
      >
        {actions}
      </div>
    </section>
  );
});
