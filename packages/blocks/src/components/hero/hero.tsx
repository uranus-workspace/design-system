import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Optional eyebrow / pre-title chip. */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** CTA buttons or links. */
  actions?: ReactNode;
  /** Optional media slot rendered to the right at `lg+`, below otherwise. */
  media?: ReactNode;
  /** Stack alignment when there is no media. Defaults to `"center"`. */
  align?: 'start' | 'center';
}

/**
 * Top-of-page hero used by marketing and the public docs site. When `media`
 * is provided, becomes a 2-column layout at `lg`.
 */
export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { eyebrow, title, description, actions, media, align = 'center', className, ...props },
  ref,
) {
  const hasMedia = Boolean(media);
  return (
    <section
      ref={ref}
      data-slot="hero"
      data-align={align}
      className={cn(
        'flex flex-col gap-12 px-6 py-16 sm:py-24',
        hasMedia ? 'lg:flex-row lg:items-center lg:gap-16' : '',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex flex-1 flex-col gap-6',
          !hasMedia && align === 'center' ? 'mx-auto max-w-3xl text-center items-center' : '',
        )}
      >
        {eyebrow ? (
          <span
            data-slot="hero-eyebrow"
            className="inline-flex items-center self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {eyebrow}
          </span>
        ) : null}
        <h1
          data-slot="hero-title"
          className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        >
          {title}
        </h1>
        {description ? (
          <p
            data-slot="hero-description"
            className="text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            {description}
          </p>
        ) : null}
        {actions ? (
          <div
            data-slot="hero-actions"
            className={cn(
              'flex flex-wrap items-center gap-3',
              !hasMedia && align === 'center' ? 'justify-center' : '',
            )}
          >
            {actions}
          </div>
        ) : null}
      </div>
      {hasMedia ? (
        <div data-slot="hero-media" className="flex-1">
          {media}
        </div>
      ) : null}
    </section>
  );
});
