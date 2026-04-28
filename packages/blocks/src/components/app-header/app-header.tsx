import { Separator, SidebarTrigger } from '@uranus-workspace/design-system';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Breadcrumbs or location label rendered after the sidebar trigger. */
  breadcrumbs?: ReactNode;
  /** Search trigger (typically a `Button` opening `<SearchCommand />`). */
  searchTrigger?: ReactNode;
  /** Notification bell + popover. */
  notifications?: ReactNode;
  /** User menu (`DropdownMenu` with `Avatar` trigger). */
  userMenu?: ReactNode;
  /** Hide the sidebar trigger when the shell does not have a sidebar. */
  hideSidebarTrigger?: boolean;
}

/**
 * Sticky top bar for dashboard surfaces — composes `SidebarTrigger`,
 * breadcrumb slot, search trigger, notifications bell, and user menu.
 *
 * Renders a semantic `<header role="banner">` so screen readers can navigate
 * to it directly, and uses a `backdrop-blur` background that plays well with
 * the `SidebarInset`'s scrollable main area.
 */
export const AppHeader = forwardRef<HTMLElement, AppHeaderProps>(function AppHeader(
  { breadcrumbs, searchTrigger, notifications, userMenu, hideSidebarTrigger, className, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      data-slot="app-header"
      className={cn(
        'sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:gap-3',
        className,
      )}
      {...props}
    >
      {!hideSidebarTrigger ? (
        <>
          <SidebarTrigger data-slot="app-header-sidebar-trigger" />
          <Separator orientation="vertical" className="h-5" />
        </>
      ) : null}
      {breadcrumbs ? (
        <nav
          aria-label="Breadcrumb"
          data-slot="app-header-breadcrumbs"
          className="flex min-w-0 flex-1 items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {breadcrumbs}
        </nav>
      ) : (
        <div className="flex-1" />
      )}
      <div data-slot="app-header-actions" className="flex shrink-0 items-center gap-2">
        {searchTrigger ? <div data-slot="app-header-search">{searchTrigger}</div> : null}
        {notifications ? <div data-slot="app-header-notifications">{notifications}</div> : null}
        {userMenu ? <div data-slot="app-header-user-menu">{userMenu}</div> : null}
      </div>
    </header>
  );
});
