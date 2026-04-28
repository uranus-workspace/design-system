import { render, screen } from '@testing-library/react';
import { Button, SidebarProvider } from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { AppHeader } from './app-header.js';

const renderWithProvider = (ui: React.ReactElement) =>
  render(<SidebarProvider>{ui}</SidebarProvider>);

describe('AppHeader', () => {
  it('renders as a banner landmark', () => {
    renderWithProvider(<AppHeader hideSidebarTrigger />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders breadcrumbs as a navigation landmark', () => {
    renderWithProvider(<AppHeader hideSidebarTrigger breadcrumbs={<span>Home / Settings</span>} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders search, notifications, and user menu slots', () => {
    renderWithProvider(
      <AppHeader
        hideSidebarTrigger
        searchTrigger={<Button>Search</Button>}
        notifications={<Button>Bell</Button>}
        userMenu={<Button>Avatar</Button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bell' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Avatar' })).toBeInTheDocument();
  });

  it('shows the sidebar trigger by default and hides when requested', () => {
    const { rerender } = renderWithProvider(<AppHeader />);
    expect(screen.getByRole('button', { name: /toggle sidebar/i })).toBeInTheDocument();
    rerender(
      <SidebarProvider>
        <AppHeader hideSidebarTrigger />
      </SidebarProvider>,
    );
    expect(screen.queryByRole('button', { name: /toggle sidebar/i })).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = renderWithProvider(
      <AppHeader hideSidebarTrigger breadcrumbs={<span>Home</span>} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
