import {
  type AnchorHTMLAttributes,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
} from 'react';
import { cn } from '../../lib/cn.js';
import { BlockLink } from '../../lib/link.js';

export interface SettingsNavItem {
  /** Stable id used as React key. */
  id: string;
  label: ReactNode;
  href: string;
  icon?: ReactNode;
  /** Marks the link as the current page (`aria-current="page"`). */
  active?: boolean;
}

export interface SettingsNavGroup {
  /** Section heading rendered above the items. */
  label?: ReactNode;
  items: SettingsNavItem[];
}

const settingsLinkClass = cn(
  'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
);

const settingsLinkActiveClass = 'bg-accent text-accent-foreground';
const settingsLinkInactiveClass = 'text-muted-foreground hover:bg-muted hover:text-foreground';

type LinkComponent = ElementType<AnchorHTMLAttributes<HTMLAnchorElement>> | undefined;

const SettingsLayoutContext = createContext<{ linkComponent?: LinkComponent }>({});

export interface SettingsLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Legacy: navigation groups shown in the left rail.
   * Omit when composing with `SettingsLayout.Nav`, `Group`, and `Link`.
   */
  groups?: SettingsNavGroup[];
  /** Custom `Link` component (e.g. Next.js). Defaults to `<a>` or `LinkProvider`. */
  linkComponent?: LinkComponent;
  /**
   * Legacy: header above the grid when using `groups`.
   * With compound API, use `SettingsLayout.Header` instead.
   */
  header?: ReactNode;
  /** Legacy: right column when using `groups`. Compound: pass full layout as children. */
  children: ReactNode;
}

function NavFromGroups({
  groups,
  linkComponent,
}: {
  groups: SettingsNavGroup[];
  linkComponent?: LinkComponent;
}) {
  return (
    <nav aria-label="Settings" data-slot="settings-layout-nav" className="flex flex-col gap-6">
      {groups.map((group, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: groups are stable by position
          key={index}
          className="flex flex-col gap-1"
        >
          {group.label ? (
            <span className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {group.label}
            </span>
          ) : null}
          <ul className="flex flex-col">
            {group.items.map((item) => (
              <li key={item.id}>
                <BlockLink
                  linkComponent={linkComponent}
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
                  className={cn(
                    settingsLinkClass,
                    item.active ? settingsLinkActiveClass : settingsLinkInactiveClass,
                  )}
                >
                  {item.icon ? (
                    <span aria-hidden className="text-current">
                      {item.icon}
                    </span>
                  ) : null}
                  <span>{item.label}</span>
                </BlockLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export interface SettingsLayoutHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const SettingsLayoutHeader = forwardRef<HTMLDivElement, SettingsLayoutHeaderProps>(
  function SettingsLayoutHeader({ children, className, ...props }, ref) {
    return (
      <div ref={ref} data-slot="settings-layout-header" className={cn(className)} {...props}>
        {children}
      </div>
    );
  },
);

export interface SettingsLayoutGridProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Two-column grid: nav rail + content panel (responsive). */
export const SettingsLayoutGrid = forwardRef<HTMLDivElement, SettingsLayoutGridProps>(
  function SettingsLayoutGrid({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="settings-layout-grid"
        className={cn('flex flex-col gap-6 md:grid md:grid-cols-[220px_1fr] md:gap-8', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface SettingsLayoutNavProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const SettingsLayoutNav = forwardRef<HTMLElement, SettingsLayoutNavProps>(
  function SettingsLayoutNav({ children, className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="Settings"
        data-slot="settings-layout-nav"
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

export interface SettingsLayoutGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Section label above items. */
  label?: ReactNode;
  children?: ReactNode;
}

export const SettingsLayoutGroup = forwardRef<HTMLDivElement, SettingsLayoutGroupProps>(
  function SettingsLayoutGroup({ label, children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="settings-layout-group"
        className={cn('flex flex-col gap-1', className)}
        {...props}
      >
        {label ? (
          <span className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
        ) : null}
        <ul className="flex flex-col">{children}</ul>
      </div>
    );
  },
);

export type SettingsLayoutLinkProps = {
  href: string;
  icon?: ReactNode;
  active?: boolean;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

export const SettingsLayoutLink = forwardRef<HTMLAnchorElement, SettingsLayoutLinkProps>(
  function SettingsLayoutLink({ href, icon, active, children, className, ...anchorProps }, ref) {
    const { linkComponent } = useContext(SettingsLayoutContext);
    return (
      <li>
        <BlockLink
          ref={ref}
          linkComponent={linkComponent}
          href={href}
          aria-current={active ? 'page' : undefined}
          className={cn(
            settingsLinkClass,
            active ? settingsLinkActiveClass : settingsLinkInactiveClass,
            className,
          )}
          {...anchorProps}
        >
          {icon ? (
            <span aria-hidden className="text-current">
              {icon}
            </span>
          ) : null}
          <span>{children}</span>
        </BlockLink>
      </li>
    );
  },
);

export interface SettingsLayoutPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Main settings content column. */
export const SettingsLayoutPanel = forwardRef<HTMLDivElement, SettingsLayoutPanelProps>(
  function SettingsLayoutPanel({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="settings-layout-content"
        className={cn('flex flex-col', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

const SettingsLayoutRoot = forwardRef<HTMLDivElement, SettingsLayoutProps>(function SettingsLayout(
  { groups, linkComponent, header, children, className, ...props },
  ref,
) {
  const legacyLayout = groups !== undefined;

  return (
    <SettingsLayoutContext.Provider value={{ linkComponent }}>
      <div
        ref={ref}
        data-slot="settings-layout"
        className={cn('flex flex-col gap-6 p-6', className)}
        {...props}
      >
        {legacyLayout ? (
          <>
            {header ? <div data-slot="settings-layout-header">{header}</div> : null}
            <div className="flex flex-col gap-6 md:grid md:grid-cols-[220px_1fr] md:gap-8">
              <NavFromGroups groups={groups} linkComponent={linkComponent} />
              <div data-slot="settings-layout-content" className="flex flex-col">
                {children}
              </div>
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </SettingsLayoutContext.Provider>
  );
});

SettingsLayoutRoot.displayName = 'SettingsLayout';
SettingsLayoutHeader.displayName = 'SettingsLayout.Header';
SettingsLayoutGrid.displayName = 'SettingsLayout.Grid';
SettingsLayoutNav.displayName = 'SettingsLayout.Nav';
SettingsLayoutGroup.displayName = 'SettingsLayout.Group';
SettingsLayoutLink.displayName = 'SettingsLayout.Link';
SettingsLayoutPanel.displayName = 'SettingsLayout.Panel';

/**
 * Two-column settings layout: left nav + content. Use **`groups`** for static
 * config, or compose with **`Header`**, **`Grid`**, **`Nav`**, **`Group`**, **`Link`**, **`Panel`**.
 */
export const SettingsLayout = Object.assign(SettingsLayoutRoot, {
  Header: SettingsLayoutHeader,
  Grid: SettingsLayoutGrid,
  Nav: SettingsLayoutNav,
  Group: SettingsLayoutGroup,
  Link: SettingsLayoutLink,
  Panel: SettingsLayoutPanel,
});
