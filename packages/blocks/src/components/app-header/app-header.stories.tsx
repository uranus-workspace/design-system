import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, Button, SidebarProvider } from '@uranus-workspace/design-system';
import { Bell, Search } from 'lucide-react';
import type { ReactElement } from 'react';
import { AppHeader } from './app-header.js';

const meta: Meta<typeof AppHeader> = {
  title: 'Blocks/Chrome/AppHeader',
  component: AppHeader,
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
type Story = StoryObj<typeof AppHeader>;

export const Default: Story = {
  args: {
    breadcrumbs: (
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>Workspace</li>
        <li aria-hidden>/</li>
        <li className="font-medium text-foreground">Dashboard</li>
      </ol>
    ),
    searchTrigger: (
      <Button variant="outline" size="sm" className="gap-2">
        <Search aria-hidden className="size-4" />
        <span>Search</span>
      </Button>
    ),
    notifications: (
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell aria-hidden className="size-4" />
      </Button>
    ),
    userMenu: (
      <Button variant="ghost" className="size-8 rounded-full p-0" aria-label="User menu">
        <Avatar className="size-8">
          <AvatarFallback>UT</AvatarFallback>
        </Avatar>
      </Button>
    ),
  },
};

export const Minimal: Story = {
  args: {
    breadcrumbs: <span className="text-sm text-muted-foreground">Dashboard</span>,
  },
};
