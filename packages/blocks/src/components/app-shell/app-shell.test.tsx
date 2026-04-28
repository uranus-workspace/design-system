import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { AppShell } from './app-shell.js';

describe('AppShell', () => {
  it('renders sidebar, header, content, and right panel slots', () => {
    render(
      <AppShell>
        <AppShell.Sidebar>
          <aside data-testid="sidebar">Sidebar</aside>
        </AppShell.Sidebar>
        <AppShell.Inset>
          <AppShell.Header>
            <header data-testid="header">Header</header>
          </AppShell.Header>
          <AppShell.Content>
            <p>Main content</p>
          </AppShell.Content>
        </AppShell.Inset>
        <AppShell.RightPanel>
          <aside data-testid="right">Right</aside>
        </AppShell.RightPanel>
      </AppShell>,
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('exposes the main landmark via SidebarInset', () => {
    render(
      <AppShell>
        <AppShell.Sidebar>
          <aside>Sidebar</aside>
        </AppShell.Sidebar>
        <AppShell.Inset>
          <AppShell.Content>
            <p>Body</p>
          </AppShell.Content>
        </AppShell.Inset>
      </AppShell>,
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <AppShell>
        <AppShell.Sidebar>
          <aside aria-label="Primary">Sidebar</aside>
        </AppShell.Sidebar>
        <AppShell.Inset>
          <AppShell.Content>
            <p>Body</p>
          </AppShell.Content>
        </AppShell.Inset>
      </AppShell>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
