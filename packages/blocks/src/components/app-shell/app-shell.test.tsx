import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { AppShell } from './app-shell.js';

describe('AppShell', () => {
  it('renders the sidebar, header, content, and right panel slots', () => {
    render(
      <AppShell
        sidebar={<aside data-testid="sidebar">Sidebar</aside>}
        header={<header data-testid="header">Header</header>}
        rightPanel={<aside data-testid="right">Right</aside>}
      >
        <p>Main content</p>
      </AppShell>,
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('exposes the main landmark via SidebarInset', () => {
    render(
      <AppShell sidebar={<aside>Sidebar</aside>}>
        <p>Body</p>
      </AppShell>,
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <AppShell sidebar={<aside aria-label="Primary">Sidebar</aside>}>
        <p>Body</p>
      </AppShell>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('supports the compound API', () => {
    render(
      <AppShell>
        <AppShell.Sidebar>
          <aside data-testid="compound-sidebar">Sidebar</aside>
        </AppShell.Sidebar>
        <AppShell.Inset>
          <AppShell.Header>
            <header data-testid="compound-header">Header</header>
          </AppShell.Header>
          <AppShell.Content>
            <p>Compound body</p>
          </AppShell.Content>
        </AppShell.Inset>
        <AppShell.RightPanel>
          <aside data-testid="compound-right">Right</aside>
        </AppShell.RightPanel>
      </AppShell>,
    );
    expect(screen.getByTestId('compound-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('compound-header')).toBeInTheDocument();
    expect(screen.getByTestId('compound-right')).toBeInTheDocument();
    expect(screen.getByText('Compound body')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
