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

const SampleSidebar = () => (
  <Sidebar>
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
  args: {
    sidebar: <SampleSidebar />,
    header: (
      <header className="flex h-12 items-center border-b px-4 text-sm">App header slot</header>
    ),
    children: <div className="p-6">Main content area</div>,
  },
};

export const NoHeader: Story = {
  args: {
    sidebar: <SampleSidebar />,
    children: <div className="p-6">Just content, no header</div>,
  },
};
