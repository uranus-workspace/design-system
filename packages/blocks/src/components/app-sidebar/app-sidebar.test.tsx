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
import { AppSidebar } from './app-sidebar.js';

const renderWithProvider = (ui: React.ReactElement) =>
  render(<SidebarProvider>{ui}</SidebarProvider>);

function composedSidebarTree() {
  return (
    <>
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
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <AppSidebar.NavLink href="/settings" label="Settings">
                Settings
              </AppSidebar.NavLink>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </AppSidebar.Content>
      <AppSidebar.Footer>
        <span data-testid="footer">User menu</span>
      </AppSidebar.Footer>
    </>
  );
}

describe('AppSidebar', () => {
  it('renders composed Brand slots', () => {
    renderWithProvider(
      <AppSidebar>
        <AppSidebar.Header>
          <AppSidebar.Brand>
            <AppSidebar.Brand.Icon>
              <span aria-hidden>U</span>
            </AppSidebar.Brand.Icon>
            <AppSidebar.Brand.Body>
              <AppSidebar.Brand.Title>Docs</AppSidebar.Brand.Title>
              <AppSidebar.Brand.Subtitle>v2</AppSidebar.Brand.Subtitle>
            </AppSidebar.Brand.Body>
            <AppSidebar.Brand.Action>
              <button type="button">Menu</button>
            </AppSidebar.Brand.Action>
          </AppSidebar.Brand>
        </AppSidebar.Header>
      </AppSidebar>,
    );
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('v2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });

  it('renders composed header, navigation groups, links, and footer', () => {
    renderWithProvider(<AppSidebar>{composedSidebarTree()}</AppSidebar>);
    expect(screen.getByText('Uranus')).toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: /Projects/ })).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders search inside composed content', () => {
    renderWithProvider(
      <AppSidebar>
        <AppSidebar.Header>
          <span>Uranus</span>
        </AppSidebar.Header>
        <AppSidebar.Content>
          <AppSidebar.Search placeholder="Find…" />
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <AppSidebar.NavLink href="/dashboard" label="Dashboard">
                  Dashboard
                </AppSidebar.NavLink>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </AppSidebar.Content>
      </AppSidebar>,
    );
    expect(screen.getByPlaceholderText('Find…')).toBeInTheDocument();
  });

  it('marks the active item with aria-current="page"', () => {
    renderWithProvider(<AppSidebar>{composedSidebarTree()}</AppSidebar>);
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
    renderWithProvider(<AppSidebar linkComponent={CustomLink}>{composedSidebarTree()}</AppSidebar>);
    expect(screen.getAllByTestId('custom-link').length).toBeGreaterThan(0);
  });

  it('has no a11y violations', async () => {
    const { container } = renderWithProvider(<AppSidebar>{composedSidebarTree()}</AppSidebar>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
