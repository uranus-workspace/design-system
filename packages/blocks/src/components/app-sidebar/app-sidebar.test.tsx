import { render, screen } from '@testing-library/react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarProvider,
} from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { AppSidebar, type SidebarNavGroup } from './app-sidebar.js';

const renderWithProvider = (ui: React.ReactElement) =>
  render(<SidebarProvider>{ui}</SidebarProvider>);

const groups: SidebarNavGroup[] = [
  {
    label: 'Workspace',
    items: [
      { label: 'Dashboard', href: '/dashboard', active: true },
      { label: 'Projects', href: '/projects', badge: '3' },
    ],
  },
  {
    label: 'Account',
    items: [{ label: 'Settings', href: '/settings' }],
  },
];

describe('AppSidebar', () => {
  it('renders logo, group labels, items, and footer', () => {
    renderWithProvider(
      <AppSidebar
        logo={<span>Uranus</span>}
        groups={groups}
        footer={<span data-testid="footer">User menu</span>}
      />,
    );
    expect(screen.getByText('Uranus')).toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: /Projects/ })).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('marks the active item with aria-current="page"', () => {
    renderWithProvider(<AppSidebar groups={groups} />);
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /Projects/ })).not.toHaveAttribute('aria-current');
  });

  it('uses a custom linkComponent when provided', () => {
    const CustomLink = ({
      href,
      children,
      ...rest
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a data-testid="custom-link" href={href} {...rest}>
        {children}
      </a>
    );
    renderWithProvider(<AppSidebar groups={groups} linkComponent={CustomLink} />);
    expect(screen.getAllByTestId('custom-link').length).toBeGreaterThan(0);
  });

  it('has no a11y violations', async () => {
    const { container } = renderWithProvider(
      <AppSidebar logo={<span>Uranus</span>} groups={groups} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('supports compositional API with NavLink and groups', () => {
    renderWithProvider(
      <AppSidebar>
        <AppSidebar.Header>
          <span>Uranus</span>
        </AppSidebar.Header>
        <AppSidebar.Content>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <AppSidebar.NavLink href="/dashboard" active label="Dashboard">
                  Dashboard
                </AppSidebar.NavLink>
                <AppSidebar.NavLink href="/projects" badge="3" label="Projects">
                  Projects
                </AppSidebar.NavLink>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </AppSidebar.Content>
        <AppSidebar.Footer>
          <span data-testid="footer">v1</span>
        </AppSidebar.Footer>
      </AppSidebar>,
    );
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: /Projects/ })).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
