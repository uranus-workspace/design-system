import { SidebarInset, SidebarProvider } from '@uranus-workspace/design-system';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Sidebar block (typically `<AppSidebar />`). */
  sidebar: ReactNode;
  /** Header block (typically `<AppHeader />`) rendered inside the inset main area. */
  header?: ReactNode;
  /** Optional right-side detail panel (typically `<DetailDrawer />` or a `<Sheet />`). */
  rightPanel?: ReactNode;
  /** Persists sidebar collapse via cookie when uncontrolled. Defaults to `true`. */
  defaultSidebarOpen?: boolean;
  /** Controlled sidebar open state. */
  sidebarOpen?: boolean;
  /** Controlled sidebar onChange handler. */
  onSidebarOpenChange?: (open: boolean) => void;
  /** Main content. */
  children: ReactNode;
}

/**
 * The chrome for every dashboard surface — composes `SidebarProvider`,
 * `SidebarInset`, an optional sticky header, the main content area, and an
 * optional right-side detail panel.
 *
 * Renders semantic landmarks (`<main>` via `SidebarInset`) and forwards
 * sidebar state to the design-system primitive so cookie-based persistence
 * keeps working without extra wiring.
 */
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  {
    sidebar,
    header,
    rightPanel,
    defaultSidebarOpen = true,
    sidebarOpen,
    onSidebarOpenChange,
    children,
    className,
    ...props
  },
  ref,
) {
  return (
    <SidebarProvider
      ref={ref}
      defaultOpen={defaultSidebarOpen}
      open={sidebarOpen}
      onOpenChange={onSidebarOpenChange}
      className={cn('min-h-svh', className)}
      data-slot="app-shell"
      {...props}
    >
      {sidebar}
      <SidebarInset data-slot="app-shell-main">
        {header}
        <div data-slot="app-shell-content" className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
      {rightPanel}
    </SidebarProvider>
  );
});
