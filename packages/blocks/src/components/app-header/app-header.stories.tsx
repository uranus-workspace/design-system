import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  SidebarProvider,
  SidebarTrigger,
} from '@uranus-workspace/design-system';
import { Bell, ChevronRight, Search } from 'lucide-react';
import type { ReactElement } from 'react';
import { AppHeader } from './app-header.js';

const meta: Meta<typeof AppHeader> = {
  title: 'Blocks/Chrome/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
  decorators: [
    (Story: () => ReactElement) => (
      <div className="w-full min-w-0 overflow-hidden rounded-lg border bg-background">
        <SidebarProvider className="min-h-0 w-full">
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AppHeader>;

const crumb = (
  <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
    <span className="text-muted-foreground">Workspace</span>
    <ChevronRight aria-hidden className="size-4 shrink-0 text-muted-foreground" />
    <span className="truncate font-medium text-foreground">Dashboard</span>
  </nav>
);

export const Default: Story = {
  args: {
    breadcrumbs: crumb,
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-9 rounded-full p-0" aria-label="Account menu">
            <Avatar className="size-9">
              <AvatarFallback className="text-xs">UT</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="font-normal">
            <span className="text-sm font-medium">Signed in</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
};

export const Minimal: Story = {
  args: {
    breadcrumbs: <span className="text-sm text-muted-foreground">Dashboard</span>,
  },
};

export const NoSidebarChrome: Story = {
  name: 'Marketing route (no sidebar trigger)',
  args: {
    hideSidebarTrigger: true,
    breadcrumbs: <span className="text-sm font-medium text-foreground">Marketing · Pricing</span>,
    searchTrigger: (
      <Button variant="outline" size="sm" className="gap-2">
        <Search aria-hidden className="size-4" />
        Search
      </Button>
    ),
  },
};

export const Composition: Story = {
  render: () => (
    <header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur md:gap-3">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      <AppHeader.Breadcrumbs>{crumb}</AppHeader.Breadcrumbs>
      <AppHeader.Actions>
        <Button variant="outline" size="sm">
          Action
        </Button>
      </AppHeader.Actions>
    </header>
  ),
};
