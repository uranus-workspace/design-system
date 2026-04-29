import { render, screen } from '@testing-library/react';
import {
  Button,
  Separator,
  SidebarProvider,
  SidebarTrigger,
} from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { AppHeader } from './app-header.js';

const renderWithProvider = (ui: React.ReactElement) =>
  render(<SidebarProvider>{ui}</SidebarProvider>);

describe('AppHeader', () => {
  it('renders as a banner landmark', () => {
    renderWithProvider(
      <AppHeader>
        <span className="sr-only">Title</span>
      </AppHeader>,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders breadcrumbs as a navigation landmark', () => {
    renderWithProvider(
      <AppHeader>
        <AppHeader.Breadcrumbs>
          <span>Home / Settings</span>
        </AppHeader.Breadcrumbs>
      </AppHeader>,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders actions cluster content', () => {
    renderWithProvider(
      <AppHeader>
        <AppHeader.Breadcrumbs>
          <span>Home</span>
        </AppHeader.Breadcrumbs>
        <AppHeader.Actions>
          <Button type="button">Search</Button>
          <Button type="button">Bell</Button>
          <Button type="button">Avatar</Button>
        </AppHeader.Actions>
      </AppHeader>,
    );
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bell' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Avatar' })).toBeInTheDocument();
  });

  it('can include or omit the sidebar trigger', () => {
    const { rerender } = renderWithProvider(
      <AppHeader>
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />
        <AppHeader.Breadcrumbs>
          <span>Area</span>
        </AppHeader.Breadcrumbs>
      </AppHeader>,
    );
    expect(screen.getByRole('button', { name: /toggle sidebar/i })).toBeInTheDocument();

    rerender(
      <SidebarProvider>
        <AppHeader>
          <AppHeader.Breadcrumbs>
            <span>Marketing</span>
          </AppHeader.Breadcrumbs>
        </AppHeader>
      </SidebarProvider>,
    );
    expect(screen.queryByRole('button', { name: /toggle sidebar/i })).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = renderWithProvider(
      <AppHeader>
        <AppHeader.Breadcrumbs>
          <span>Home</span>
        </AppHeader.Breadcrumbs>
      </AppHeader>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('supports trigger, separator, breadcrumbs, and actions together', () => {
    renderWithProvider(
      <AppHeader>
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />
        <AppHeader.Breadcrumbs>
          <span>Trail</span>
        </AppHeader.Breadcrumbs>
        <AppHeader.Actions>
          <Button type="button">Go</Button>
        </AppHeader.Actions>
      </AppHeader>,
    );
    expect(screen.getByRole('button', { name: /toggle sidebar/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent('Trail');
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });

  it('exposes Breadcrumbs and Actions for standalone use', () => {
    renderWithProvider(
      <header className="flex w-full items-center gap-2">
        <AppHeader.Breadcrumbs>
          <span>Trail</span>
        </AppHeader.Breadcrumbs>
        <AppHeader.Actions>
          <Button type="button">Act</Button>
        </AppHeader.Actions>
      </header>,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent('Trail');
    expect(screen.getByRole('button', { name: 'Act' })).toBeInTheDocument();
  });
});
