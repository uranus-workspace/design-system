import { type HTMLAttributes, type ReactNode, forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';

export interface FormSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading. Rendered as `<h2>` by default; override with `as` prop is not exposed on purpose. */
  title: ReactNode;
  /** Optional supporting copy under the title. */
  description?: ReactNode;
  /** Form fields. */
  children: ReactNode;
  /** Footer slot — typically the Save/Cancel button group. */
  footer?: ReactNode;
  /** Layout variant. `stacked` (default) renders the heading above the fields; `split` puts the heading on the left and fields on the right at `md+`. */
  layout?: 'stacked' | 'split';
}

/**
 * The atomic unit of a settings or long-form page. Composes a `<section>` with
 * an `<h2>` (linked via `aria-labelledby`), an optional description, the
 * fields, and a footer. The `split` layout is what lives inside settings tabs.
 */
export const FormSection = forwardRef<HTMLElement, FormSectionProps>(function FormSection(
  { title, description, children, footer, layout = 'stacked', className, ...props },
  ref,
) {
  const headingId = useId();
  const descriptionId = useId();
  return (
    <section
      ref={ref}
      data-slot="form-section"
      data-layout={layout}
      aria-labelledby={headingId}
      aria-describedby={description ? descriptionId : undefined}
      className={cn(
        'border-b py-8 last:border-b-0',
        layout === 'split' ? 'md:grid md:grid-cols-3 md:gap-8' : 'flex flex-col gap-6',
        className,
      )}
      {...props}
    >
      <header className={cn(layout === 'split' ? 'md:col-span-1' : '', 'flex flex-col gap-1')}>
        <h2 id={headingId} className="text-base font-semibold text-foreground">
          {title}
        </h2>
        {description ? (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>

      <div
        className={cn(
          layout === 'split' ? 'md:col-span-2 mt-4 md:mt-0' : '',
          'flex flex-col gap-4',
        )}
      >
        <div data-slot="form-section-fields" className="flex flex-col gap-4">
          {children}
        </div>
        {footer ? (
          <div
            data-slot="form-section-footer"
            className="flex flex-wrap items-center justify-end gap-2"
          >
            {footer}
          </div>
        ) : null}
      </div>
    </section>
  );
});
