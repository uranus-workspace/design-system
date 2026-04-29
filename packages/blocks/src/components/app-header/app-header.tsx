import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export type AppHeaderBreadcrumbsProps = HTMLAttributes<HTMLElement>;

/** Breadcrumb region — `<nav aria-label="Breadcrumb">` with horizontal overflow. */
export const AppHeaderBreadcrumbs = forwardRef<HTMLElement, AppHeaderBreadcrumbsProps>(
  function AppHeaderBreadcrumbs({ children, className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        data-slot="app-header-breadcrumbs"
        className={cn(
          'flex min-w-0 flex-1 items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          className,
        )}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

export type AppHeaderActionsProps = HTMLAttributes<HTMLDivElement>;

/** Right cluster (search, notifications, user menu). */
export const AppHeaderActions = forwardRef<HTMLDivElement, AppHeaderActionsProps>(
  function AppHeaderActions({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="app-header-actions"
        className={cn('flex shrink-0 items-center gap-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Compose **`SidebarTrigger`**, **`Separator`**, **`AppHeader.Breadcrumbs`**, **`AppHeader.Actions`**, etc.
   * Omit **`SidebarTrigger`** on routes without a sidebar.
   */
  children: ReactNode;
}

const appHeaderChromeClass =
  'sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:gap-3';

const AppHeaderRoot = forwardRef<HTMLElement, AppHeaderProps>(function AppHeader(
  { children, className, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      data-slot="app-header"
      className={cn(appHeaderChromeClass, className)}
      {...props}
    >
      {children}
    </header>
  );
});

AppHeaderRoot.displayName = 'AppHeader';
AppHeaderBreadcrumbs.displayName = 'AppHeader.Breadcrumbs';
AppHeaderActions.displayName = 'AppHeader.Actions';

/**
 * Sticky top bar — semantic `<header>` with spacing aligned to **`SidebarInset`**.
 * Compose primitives from **`@uranus-workspace/design-system`** inside **`children`**.
 */
export const AppHeader = Object.assign(AppHeaderRoot, {
  Breadcrumbs: AppHeaderBreadcrumbs,
  Actions: AppHeaderActions,
});
