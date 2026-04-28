import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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

export interface SidebarNavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: ReactNode;
  active?: boolean;
}

export interface SidebarNavGroup {
  label?: string;
  items: SidebarNavItem[];
}

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

export interface AppSidebarBrandProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Left mark — icon or monogram (centered in a rounded square). */
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Trailing control (e.g. workspace/version `DropdownMenu` trigger). */
  action?: ReactNode;
}

/**
 * Docs-style brand row — title + optional subtitle + optional action (matches shadcn sidebar-01 header density).
 */
export function AppSidebarBrand({
  icon,
  title,
  subtitle,
  action,
  className,
  ...props
}: AppSidebarBrandProps) {
  return (
    <div
      data-slot="app-sidebar-brand"
      className={cn('flex w-full min-w-0 items-center gap-2', className)}
      {...props}
    >
      {icon ? (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground [&_svg]:size-4">
          {icon}
        </div>
      ) : null}
      <div className="grid min-w-0 flex-1 gap-0.5 text-left leading-tight">
        <span className="truncate font-semibold text-sidebar-foreground">{title}</span>
        {subtitle ? (
          <span className="truncate text-xs text-sidebar-foreground/70">{subtitle}</span>
        ) : null}
      </div>
      {action ? <div className="flex shrink-0 items-center">{action}</div> : null}
    </div>
  );
}

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
  /** Brand / logo slot — only used with the declarative `groups` API. */
  logo?: ReactNode;
  /** Search field below header — prefer `<AppSidebarSearch />` or custom `SidebarInput`. */
  search?: ReactNode;
  /**
   * Declarative nav config — convenient for static menus.
   * Ignored when `children` is passed; prefer composing with
   * `AppSidebar.Header`, `AppSidebar.Content`, and `AppSidebar.NavLink` for custom structure.
   */
  groups?: SidebarNavGroup[];
  /** Footer — only used with the declarative `groups` API. */
  footer?: ReactNode;
  /** Override link component for this sidebar instance (and declarative `groups` items). */
  linkComponent?: ElementType<AnchorHTMLAttributes<HTMLAnchorElement>>;
  /**
   * Compositional API: `AppSidebar.Header`, `AppSidebar.Content`, `AppSidebar.Footer`,
   * and design-system `SidebarGroup` / `SidebarMenu` primitives as needed.
   */
  children?: ReactNode;
}

const AppSidebarRoot = forwardRef<HTMLDivElement, AppSidebarProps>(function AppSidebar(
  { logo, search, groups, footer, linkComponent, children, ...props },
  ref,
) {
  const compositional = children != null;

  return (
    <AppSidebarLinkComponentContext.Provider value={linkComponent}>
      <Sidebar ref={ref} data-slot="app-sidebar" {...props}>
        {compositional ? (
          children
        ) : (
          <>
            {logo ? <AppSidebarHeader>{logo}</AppSidebarHeader> : null}
            <SidebarContent className="gap-0">
              {search}
              {(groups ?? []).map((group, groupIndex) => (
                <SidebarGroup key={group.label ?? `group-${groupIndex}`}>
                  {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item, itemIndex) => (
                        <AppSidebarNavLink
                          key={`${group.label ?? groupIndex}-${itemIndex}-${item.label}`}
                          href={item.href}
                          icon={item.icon}
                          badge={item.badge}
                          active={item.active}
                          label={item.label}
                        >
                          {item.label}
                        </AppSidebarNavLink>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
            {footer ? <AppSidebarFooter>{footer}</AppSidebarFooter> : null}
          </>
        )}
      </Sidebar>
    </AppSidebarLinkComponentContext.Provider>
  );
});

AppSidebarRoot.displayName = 'AppSidebar';
AppSidebarNavLink.displayName = 'AppSidebarNavLink';

/**
 * Opinionated dashboard sidebar — composes the `Sidebar` primitive with optional
 * compound slots (`Header`, `Brand`, `Search`, `Content`, `Footer`, `NavLink`) or declarative `groups`.
 *
 * Prefer composition when you need mixed content; use **`collapsible="none"`** in embedded previews so the rail stays in layout flow (see docs).
 */
export const AppSidebar = Object.assign(AppSidebarRoot, {
  Header: AppSidebarHeader,
  Brand: AppSidebarBrand,
  Search: AppSidebarSearch,
  Content: AppSidebarContent,
  Footer: AppSidebarFooter,
  NavLink: AppSidebarNavLink,
});
