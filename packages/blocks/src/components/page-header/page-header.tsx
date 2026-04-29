import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export type PageHeaderBreadcrumbsProps = HTMLAttributes<HTMLElement>;

/** Breadcrumb region for custom compositions — same markup as the `breadcrumbs` slot. */
export const PageHeaderBreadcrumbs = forwardRef<HTMLElement, PageHeaderBreadcrumbsProps>(
  function PageHeaderBreadcrumbs({ children, className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        data-slot="page-header-breadcrumbs"
        className={cn(className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

export type PageHeaderTitleProps = HTMLAttributes<HTMLHeadingElement>;

/** Page `<h1>` with design-system title styles — reusable outside the root slot API. */
export const PageHeaderTitle = forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(
  function PageHeaderTitle({ children, className, ...props }, ref) {
    return (
      <h1
        ref={ref}
        data-slot="page-header-title"
        className={cn('truncate text-3xl font-semibold tracking-tight text-foreground', className)}
        {...props}
      >
        {children}
      </h1>
    );
  },
);

export type PageHeaderDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const PageHeaderDescription = forwardRef<HTMLParagraphElement, PageHeaderDescriptionProps>(
  function PageHeaderDescription({ children, className, ...props }, ref) {
    return (
      <p
        ref={ref}
        data-slot="page-header-description"
        className={cn('max-w-2xl text-sm text-muted-foreground', className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);

export type PageHeaderActionsProps = HTMLAttributes<HTMLDivElement>;

export const PageHeaderActions = forwardRef<HTMLDivElement, PageHeaderActionsProps>(
  function PageHeaderActions({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="page-header-actions"
        className={cn('flex flex-shrink-0 items-center gap-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}

const PageHeaderRoot = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
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
        {breadcrumbs ? <PageHeaderBreadcrumbs>{breadcrumbs}</PageHeaderBreadcrumbs> : null}
        <PageHeaderTitle>{title}</PageHeaderTitle>
        {description ? <PageHeaderDescription>{description}</PageHeaderDescription> : null}
      </div>
      {actions ? <PageHeaderActions>{actions}</PageHeaderActions> : null}
    </header>
  );
});

PageHeaderRoot.displayName = 'PageHeader';
PageHeaderBreadcrumbs.displayName = 'PageHeader.Breadcrumbs';
PageHeaderTitle.displayName = 'PageHeader.Title';
PageHeaderDescription.displayName = 'PageHeader.Description';
PageHeaderActions.displayName = 'PageHeader.Actions';

export const PageHeader = Object.assign(PageHeaderRoot, {
  Breadcrumbs: PageHeaderBreadcrumbs,
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
  Actions: PageHeaderActions,
});
