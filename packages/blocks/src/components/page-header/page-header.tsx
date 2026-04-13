import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { title, description, actions, breadcrumbs, className, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      data-slot="page-header"
      className={cn(
        'flex flex-col gap-4 border-b border-border bg-background px-6 py-8 md:flex-row md:items-end md:justify-between md:gap-6',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-2">
        {breadcrumbs ? (
          <nav aria-label="Breadcrumb" data-slot="page-header-breadcrumbs">
            {breadcrumbs}
          </nav>
        ) : null}
        <h1
          data-slot="page-header-title"
          className="truncate text-3xl font-semibold tracking-tight text-foreground"
        >
          {title}
        </h1>
        {description ? (
          <p
            data-slot="page-header-description"
            className="max-w-2xl text-sm text-muted-foreground"
          >
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div data-slot="page-header-actions" className="flex flex-shrink-0 items-center gap-2">
          {actions}
        </div>
      ) : null}
    </header>
  );
});
