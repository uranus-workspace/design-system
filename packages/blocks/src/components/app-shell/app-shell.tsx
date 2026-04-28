import { SidebarInset, SidebarProvider } from '@uranus-workspace/design-system';
import {
  type ComponentProps,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';
import { cn } from '../../lib/cn.js';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Persists sidebar collapse via cookie when uncontrolled. Defaults to `true`. */
  defaultSidebarOpen?: boolean;
  /** Controlled sidebar open state. */
  sidebarOpen?: boolean;
  /** Controlled sidebar onChange handler. */
  onSidebarOpenChange?: (open: boolean) => void;
  /**
   * Shell tree — `<AppShell.Sidebar>`, `<AppShell.Inset>` (`Header`, `Content`), optional `<AppShell.RightPanel>`.
   */
  children: ReactNode;
}

const contents = 'contents';

export interface AppShellSidebarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Wrapper for the primary sidebar. Uses `display: contents` so layout matches
 * a direct child of `SidebarProvider`.
 */
export const AppShellSidebar = forwardRef<HTMLDivElement, AppShellSidebarProps>(
  function AppShellSidebar({ children, className, ...props }, ref) {
    return (
      <div ref={ref} data-slot="app-shell-sidebar" className={cn(contents, className)} {...props}>
        {children}
      </div>
    );
  },
);

export type AppShellInsetProps = ComponentProps<typeof SidebarInset>;

export const AppShellInset = forwardRef<ElementRef<typeof SidebarInset>, AppShellInsetProps>(
  function AppShellInset({ className, ...props }, ref) {
    return (
      <SidebarInset
        ref={ref}
        data-slot="app-shell-main"
        className={cn('min-h-0 flex-1 overflow-hidden', className)}
        {...props}
      />
    );
  },
);

export interface AppShellHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Region rendered inside `AppShell.Inset` before the scrollable content. */
export const AppShellHeader = forwardRef<HTMLDivElement, AppShellHeaderProps>(
  function AppShellHeader({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="app-shell-header-slot"
        className={cn(contents, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface AppShellContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Scrollable main area inside `AppShell.Inset`. */
export const AppShellContent = forwardRef<HTMLDivElement, AppShellContentProps>(
  function AppShellContent({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="app-shell-content"
        className={cn(
          'flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface AppShellRightPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Optional trailing region (e.g. detail drawer shell) as a sibling of the inset.
 */
export const AppShellRightPanel = forwardRef<HTMLDivElement, AppShellRightPanelProps>(
  function AppShellRightPanel({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="app-shell-right-panel"
        className={cn(contents, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

const AppShellRoot = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { defaultSidebarOpen = true, sidebarOpen, onSidebarOpenChange, children, className, ...props },
  ref,
) {
  return (
    <SidebarProvider
      ref={ref}
      defaultOpen={defaultSidebarOpen}
      open={sidebarOpen}
      onOpenChange={onSidebarOpenChange}
      className={cn('min-h-svh w-full', className)}
      data-slot="app-shell"
      {...props}
    >
      {children}
    </SidebarProvider>
  );
});

AppShellRoot.displayName = 'AppShell';
AppShellSidebar.displayName = 'AppShell.Sidebar';
AppShellInset.displayName = 'AppShell.Inset';
AppShellHeader.displayName = 'AppShell.Header';
AppShellContent.displayName = 'AppShell.Content';
AppShellRightPanel.displayName = 'AppShell.RightPanel';

/** Dashboard chrome — wraps `SidebarProvider`; compose `Sidebar`, `Inset`, `Header`, `Content`, optional `RightPanel`. */
export const AppShell = Object.assign(AppShellRoot, {
  Sidebar: AppShellSidebar,
  Inset: AppShellInset,
  Header: AppShellHeader,
  Content: AppShellContent,
  RightPanel: AppShellRightPanel,
});
