import type { Meta, StoryObj } from '@storybook/react';
import { SidebarProvider } from '@uranus-workspace/design-system';
import { Folder, Home, Settings, Users } from 'lucide-react';
import type { ReactElement } from 'react';
import { AppSidebar, type SidebarNavGroup } from './app-sidebar.js';

const meta: Meta<typeof AppSidebar> = {
  title: 'Blocks/Chrome/AppSidebar',
  component: AppSidebar,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
  decorators: [
    (Story: () => ReactElement) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AppSidebar>;

const groups: SidebarNavGroup[] = [
  {
    label: 'Workspace',
    items: [
      { label: 'Dashboard', href: '#', icon: <Home aria-hidden />, active: true },
      { label: 'Projects', href: '#', icon: <Folder aria-hidden />, badge: '3' },
      { label: 'Team', href: '#', icon: <Users aria-hidden /> },
    ],
  },
  {
    label: 'Account',
    items: [{ label: 'Settings', href: '#', icon: <Settings aria-hidden /> }],
  },
];

export const Default: Story = {
  args: {
    logo: <span className="text-base font-semibold">Uranus</span>,
    groups,
    footer: <div className="px-2 py-1 text-xs text-muted-foreground">v0.0.1</div>,
  },
};

export const NoFooter: Story = {
  args: {
    logo: <span className="text-base font-semibold">Uranus</span>,
    groups,
  },
};
