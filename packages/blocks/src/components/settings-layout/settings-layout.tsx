import {
  type AnchorHTMLAttributes,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
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

export interface SettingsLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Navigation groups shown in the left rail. */
  groups: SettingsNavGroup[];
  /** Custom Link component for navigation. Defaults to `<a>` (or the `LinkProvider` value if set). */
  linkComponent?: ElementType<AnchorHTMLAttributes<HTMLAnchorElement>>;
  /** Header rendered above the rail and content (e.g. PageHeader). */
  header?: ReactNode;
  /** Page content. Typically a stack of `FormSection` blocks. */
  children: ReactNode;
}

/**
 * Two-column layout for settings pages. Left rail is a vertical nav of links;
 * right column hosts the active section's content. Mobile collapses to a
 * single column with the rail on top.
 */
export const SettingsLayout = forwardRef<HTMLDivElement, SettingsLayoutProps>(
  function SettingsLayout({ groups, linkComponent, header, children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="settings-layout"
        className={cn('flex flex-col gap-6 p-6', className)}
        {...props}
      >
        {header ? <div data-slot="settings-layout-header">{header}</div> : null}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-[220px_1fr] md:gap-8">
          <nav
            aria-label="Settings"
            data-slot="settings-layout-nav"
            className="flex flex-col gap-6"
          >
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
                          'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                          item.active
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
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

          <div data-slot="settings-layout-content" className="flex flex-col">
            {children}
          </div>
        </div>
      </div>
    );
  },
);
