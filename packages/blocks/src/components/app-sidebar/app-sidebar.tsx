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
  forwardRef,
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

export interface AppSidebarProps extends Omit<SidebarProps, 'children'> {
  /** Brand mark rendered in the sidebar header. */
  logo?: ReactNode;
  /** Navigation groups, each with an optional label and a list of items. */
  groups: SidebarNavGroup[];
  /** Footer content, e.g. a `<UserMenu />` or settings link. */
  footer?: ReactNode;
  /** Override the link component used for nav items (per-instance). */
  linkComponent?: ElementType<AnchorHTMLAttributes<HTMLAnchorElement>>;
}

/**
 * Opinionated dashboard sidebar — composes the `Sidebar` primitive with a
 * branded header, grouped navigation, and a footer slot.
 *
 * Each item renders through `BlockLink`, so consumers can either pass
 * `linkComponent` here or wrap their tree with `<LinkProvider>` once at the
 * application root.
 */
export const AppSidebar = forwardRef<HTMLDivElement, AppSidebarProps>(function AppSidebar(
  { logo, groups, footer, linkComponent, ...props },
  ref,
) {
  return (
    <Sidebar ref={ref} data-slot="app-sidebar" {...props}>
      {logo ? (
        <SidebarHeader data-slot="app-sidebar-logo">
          <div className="flex h-12 items-center gap-2 px-2">{logo}</div>
        </SidebarHeader>
      ) : null}
      <SidebarContent>
        {groups.map((group, groupIndex) => (
          <SidebarGroup key={group.label ?? `group-${groupIndex}`}>
            {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={item.active} tooltip={item.label}>
                      <BlockLink
                        href={item.href}
                        linkComponent={linkComponent}
                        aria-current={item.active ? 'page' : undefined}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </BlockLink>
                    </SidebarMenuButton>
                    {item.badge != null ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {footer ? <SidebarFooter data-slot="app-sidebar-footer">{footer}</SidebarFooter> : null}
    </Sidebar>
  );
});
