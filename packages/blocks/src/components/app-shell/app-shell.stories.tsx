import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@uranus-workspace/design-system';
import { AppShell } from './app-shell.js';

const meta: Meta<typeof AppShell> = {
  title: 'Blocks/Chrome/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AppShell>;

/** In-flow sidebar so the chrome stays inside the Storybook canvas (production apps use the default collapsible sidebar). */
const SampleSidebar = () => (
  <Sidebar collapsible="none" className="border-r border-sidebar-border">
    <SidebarHeader>
      <span className="px-2 text-sm font-semibold">Uranus</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>Dashboard</SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>Projects</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
);

export const Default: Story = {
  render: () => (
    <AppShell defaultSidebarOpen className="min-h-[480px]">
      <AppShell.Sidebar>
        <SampleSidebar />
      </AppShell.Sidebar>
      <AppShell.Inset>
        <AppShell.Header>
          <header className="flex h-12 shrink-0 items-center border-b px-4 text-sm">
            App header slot
          </header>
        </AppShell.Header>
        <AppShell.Content>
          <div className="p-6">Main content area — scrolls independently of the header.</div>
        </AppShell.Content>
      </AppShell.Inset>
    </AppShell>
  ),
};

export const NoHeader: Story = {
  render: () => (
    <AppShell defaultSidebarOpen className="min-h-[420px]">
      <AppShell.Sidebar>
        <SampleSidebar />
      </AppShell.Sidebar>
      <AppShell.Inset>
        <AppShell.Content>
          <div className="p-6">Content only — no header row.</div>
        </AppShell.Content>
      </AppShell.Inset>
    </AppShell>
  ),
};

export const WithRightPanel: Story = {
  render: () => (
    <AppShell defaultSidebarOpen className="min-h-[480px]">
      <AppShell.Sidebar>
        <SampleSidebar />
      </AppShell.Sidebar>
      <AppShell.Inset>
        <AppShell.Header>
          <header className="flex h-12 shrink-0 items-center border-b px-4 text-sm">
            Detail view
          </header>
        </AppShell.Header>
        <AppShell.Content>
          <div className="p-6">Primary pane</div>
        </AppShell.Content>
      </AppShell.Inset>
      <AppShell.RightPanel>
        <aside className="flex h-full min-h-0 w-72 flex-col border-l bg-muted/30 p-4 text-sm">
          Secondary panel
        </aside>
      </AppShell.RightPanel>
    </AppShell>
  ),
};
