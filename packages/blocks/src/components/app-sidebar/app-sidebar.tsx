import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@uranus-workspace/design-system';
import { Search } from 'lucide-react';
import {
  type AnchorHTMLAttributes,
  type ComponentProps,
  type ElementRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
} from 'react';
import { cn } from '../../lib/cn.js';
import { BlockLink } from '../../lib/link.js';

type SidebarProps = ComponentProps<typeof Sidebar>;

const AppSidebarLinkComponentContext = createContext<
  ElementType<AnchorHTMLAttributes<HTMLAnchorElement>> | undefined
>(undefined);

export interface AppSidebarHeaderProps extends ComponentProps<typeof SidebarHeader> {
  children?: ReactNode;
}

/** Top region of the sidebar — wraps `SidebarHeader` (padding/gap come from the primitive). */
export function AppSidebarHeader({ children, className, ...props }: AppSidebarHeaderProps) {
  return (
    <SidebarHeader data-slot="app-sidebar-header" className={className} {...props}>
      {children}
    </SidebarHeader>
  );
}

export type AppSidebarBrandProps = HTMLAttributes<HTMLDivElement>;

const AppSidebarBrandRoot = forwardRef<HTMLDivElement, AppSidebarBrandProps>(
  function AppSidebarBrand({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="app-sidebar-brand"
        className={cn('flex w-full min-w-0 items-center gap-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

AppSidebarBrandRoot.displayName = 'AppSidebar.Brand';

export type AppSidebarBrandIconProps = HTMLAttributes<HTMLDivElement>;

/** Left tile — typically a Lucide icon or monogram (sidebar-01 density). */
export function AppSidebarBrandIcon({ className, children, ...props }: AppSidebarBrandIconProps) {
  return (
    <div
      data-slot="app-sidebar-brand-icon"
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground [&_svg]:size-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

AppSidebarBrandIcon.displayName = 'AppSidebar.Brand.Icon';

export type AppSidebarBrandBodyProps = HTMLAttributes<HTMLDivElement>;

/** Stacks **`Title`** + **`Subtitle`** in the flexible middle column. */
export function AppSidebarBrandBody({ className, children, ...props }: AppSidebarBrandBodyProps) {
  return (
    <div
      data-slot="app-sidebar-brand-body"
      className={cn('grid min-w-0 flex-1 gap-0.5 text-left leading-tight', className)}
      {...props}
    >
      {children}
    </div>
  );
}

AppSidebarBrandBody.displayName = 'AppSidebar.Brand.Body';

export type AppSidebarBrandTitleProps = HTMLAttributes<HTMLSpanElement>;

export function AppSidebarBrandTitle({ className, children, ...props }: AppSidebarBrandTitleProps) {
  return (
    <span
      data-slot="app-sidebar-brand-title"
      className={cn('truncate font-semibold text-sidebar-foreground', className)}
      {...props}
    >
      {children}
    </span>
  );
}

AppSidebarBrandTitle.displayName = 'AppSidebar.Brand.Title';

export type AppSidebarBrandSubtitleProps = HTMLAttributes<HTMLSpanElement>;

export function AppSidebarBrandSubtitle({
  className,
  children,
  ...props
}: AppSidebarBrandSubtitleProps) {
  return (
    <span
      data-slot="app-sidebar-brand-subtitle"
      className={cn('truncate text-xs text-sidebar-foreground/70', className)}
      {...props}
    >
      {children}
    </span>
  );
}

AppSidebarBrandSubtitle.displayName = 'AppSidebar.Brand.Subtitle';

export type AppSidebarBrandActionProps = HTMLAttributes<HTMLDivElement>;

/** Trailing slot — workspace switcher, version menu, etc. */
export function AppSidebarBrandAction({
  className,
  children,
  ...props
}: AppSidebarBrandActionProps) {
  return (
    <div
      data-slot="app-sidebar-brand-action"
      className={cn('flex shrink-0 items-center', className)}
      {...props}
    >
      {children}
    </div>
  );
}

AppSidebarBrandAction.displayName = 'AppSidebar.Brand.Action';

/**
 * Brand row (sidebar-01): compose **`Brand.Icon`**, **`Brand.Body`** (**`Title`** / **`Subtitle`**), **`Brand.Action`**.
 */
export const AppSidebarBrand = Object.assign(AppSidebarBrandRoot, {
  Icon: AppSidebarBrandIcon,
  Body: AppSidebarBrandBody,
  Title: AppSidebarBrandTitle,
  Subtitle: AppSidebarBrandSubtitle,
  Action: AppSidebarBrandAction,
});

export type AppSidebarSearchProps = ComponentProps<typeof SidebarInput>;

/**
 * Search field with leading icon — uses `SidebarInput` token styling.
 */
export const AppSidebarSearch = forwardRef<ElementRef<typeof SidebarInput>, AppSidebarSearchProps>(
  function AppSidebarSearch({ className, placeholder = 'Search…', ...props }, ref) {
    return (
      <div data-slot="app-sidebar-search" className="px-2 pb-2">
        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-sidebar-foreground/50"
          />
          <SidebarInput
            ref={ref}
            placeholder={placeholder}
            className={cn('h-9 bg-background pl-9 shadow-none', className)}
            {...props}
          />
        </div>
      </div>
    );
  },
);

AppSidebarSearch.displayName = 'AppSidebarSearch';

export interface AppSidebarContentProps extends ComponentProps<typeof SidebarContent> {
  children?: ReactNode;
}

/** Primary scrollable navigation area. */
export function AppSidebarContent({ className, ...props }: AppSidebarContentProps) {
  return <SidebarContent data-slot="app-sidebar-content" className={className} {...props} />;
}

export interface AppSidebarFooterProps extends ComponentProps<typeof SidebarFooter> {
  children?: ReactNode;
}

/** Bottom slot (user menu, version, etc.). */
export function AppSidebarFooter({ className, ...props }: AppSidebarFooterProps) {
  return <SidebarFooter data-slot="app-sidebar-footer" className={className} {...props} />;
}

export type AppSidebarNavLinkProps = {
  href: string;
  icon?: ReactNode;
  badge?: ReactNode;
  active?: boolean;
  /** Collapsed-sidebar tooltip; defaults to plain-text `children` when `children` is a string. */
  label?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

/**
 * One navigation row: `SidebarMenuItem` + `BlockLink`, with optional icon and badge.
 * Respects `linkComponent` on `AppSidebar` and `LinkProvider` from the tree.
 */
export const AppSidebarNavLink = forwardRef<HTMLAnchorElement, AppSidebarNavLinkProps>(
  function AppSidebarNavLink(
    { href, icon, badge, active, label, children, className, ...anchorRest },
    ref,
  ) {
    const instanceLink = useContext(AppSidebarLinkComponentContext);
    const tooltipFromChildren =
      typeof children === 'string' || typeof children === 'number' ? String(children) : undefined;

    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={active} tooltip={label ?? tooltipFromChildren}>
          <BlockLink
            ref={ref}
            href={href}
            className={className}
            linkComponent={instanceLink}
            aria-current={active ? 'page' : undefined}
            {...anchorRest}
          >
            {icon}
            <span className="truncate">{children}</span>
          </BlockLink>
        </SidebarMenuButton>
        {badge != null ? <SidebarMenuBadge>{badge}</SidebarMenuBadge> : null}
      </SidebarMenuItem>
    );
  },
);

export interface AppSidebarProps extends Omit<SidebarProps, 'children'> {
  /** Override link component for **`AppSidebar.NavLink`** (`BlockLink`). */
  linkComponent?: ElementType<AnchorHTMLAttributes<HTMLAnchorElement>>;
  /** Compound layout — **`Header`**, **`Content`**, **`Footer`**, **`SidebarGroup`** / **`NavLink`**, etc. */
  children: ReactNode;
}

const AppSidebarRoot = forwardRef<HTMLDivElement, AppSidebarProps>(function AppSidebar(
  { linkComponent, children, ...props },
  ref,
) {
  return (
    <AppSidebarLinkComponentContext.Provider value={linkComponent}>
      <Sidebar ref={ref} data-slot="app-sidebar" {...props}>
        {children}
      </Sidebar>
    </AppSidebarLinkComponentContext.Provider>
  );
});

AppSidebarRoot.displayName = 'AppSidebar';
AppSidebarNavLink.displayName = 'AppSidebarNavLink';

/**
 * Opinionated dashboard sidebar — composes **`Sidebar`** with **`Header`**, **`Brand`** (**`Icon`**, **`Body`**, **`Title`**, **`Subtitle`**, **`Action`**), **`Search`**, **`Content`**, **`Footer`**, **`NavLink`**.
 * Use **`collapsible="none"`** in embedded previews so the rail stays in layout flow.
 */
export const AppSidebar = Object.assign(AppSidebarRoot, {
  Header: AppSidebarHeader,
  Brand: AppSidebarBrand,
  Search: AppSidebarSearch,
  Content: AppSidebarContent,
  Footer: AppSidebarFooter,
  NavLink: AppSidebarNavLink,
});
