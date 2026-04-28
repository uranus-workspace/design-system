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
});
