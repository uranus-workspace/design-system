import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@uranus-workspace/design-system';
import {
  type AnchorHTMLAttributes,
  type ComponentProps,
  type ElementType,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
} from 'react';
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

/**
 * Brand / top region of the sidebar (fixed height row inside `SidebarHeader`).
 */
export function AppSidebarHeader({ children, className, ...props }: AppSidebarHeaderProps) {
  return (
    <SidebarHeader data-slot="app-sidebar-header" className={className} {...props}>
      <div className="flex h-12 min-h-12 items-center gap-2 px-2">{children}</div>
    </SidebarHeader>
  );
}

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
  /** Brand mark — only used with the legacy `groups` API. */
  logo?: ReactNode;
  /**
   * Declarative nav config — convenient for static menus.
   * Ignored when `children` is passed; prefer composing with
   * `AppSidebar.Header`, `AppSidebar.Content`, and `AppSidebar.NavLink` for custom structure.
   */
  groups?: SidebarNavGroup[];
  /** Footer — only used with the legacy `groups` API. */
  footer?: ReactNode;
  /** Override link component for this sidebar instance (and legacy `groups` items). */
  linkComponent?: ElementType<AnchorHTMLAttributes<HTMLAnchorElement>>;
  /**
   * Compositional API: `AppSidebar.Header`, `AppSidebar.Content`, `AppSidebar.Footer`,
   * and design-system `SidebarGroup` / `SidebarMenu` primitives as needed.
   */
  children?: ReactNode;
}

const AppSidebarRoot = forwardRef<HTMLDivElement, AppSidebarProps>(function AppSidebar(
  { logo, groups, footer, linkComponent, children, ...props },
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
            <SidebarContent>
              {(groups ?? []).map((group, groupIndex) => (
                <SidebarGroup key={group.label ?? `group-${groupIndex}`}>
                  {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <AppSidebarNavLink
                          key={item.href}
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
 * compound slots (`Header`, `Content`, `Footer`, `NavLink`) or a legacy `groups` config.
 *
 * Prefer the compositional API when you need mixed content, non-link rows, or full control.
 */
export const AppSidebar = Object.assign(AppSidebarRoot, {
  Header: AppSidebarHeader,
  Content: AppSidebarContent,
  Footer: AppSidebarFooter,
  NavLink: AppSidebarNavLink,
});
