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
  <div className="flex min-w-0 items-center gap-1.5 text-sm">
    <span className="text-muted-foreground">Workspace</span>
    <ChevronRight aria-hidden className="size-4 shrink-0 text-muted-foreground" />
    <span className="truncate font-medium text-foreground">Dashboard</span>
  </div>
);

export const Default: Story = {
  render: () => (
    <AppHeader>
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      <AppHeader.Breadcrumbs>{crumb}</AppHeader.Breadcrumbs>
      <AppHeader.Actions>
        <Button variant="outline" size="sm" type="button" className="gap-2">
          <Search aria-hidden className="size-4" />
          <span>Search</span>
        </Button>
        <Button variant="ghost" size="icon" type="button" aria-label="Notifications">
          <Bell aria-hidden className="size-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="size-9 rounded-full p-0"
              type="button"
              aria-label="Account menu"
            >
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
      </AppHeader.Actions>
    </AppHeader>
  ),
};

export const Minimal: Story = {
  render: () => (
    <AppHeader>
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      <AppHeader.Breadcrumbs>
        <span className="text-sm text-muted-foreground">Dashboard</span>
      </AppHeader.Breadcrumbs>
    </AppHeader>
  ),
};

export const NoSidebarChrome: Story = {
  name: 'Marketing route (no sidebar trigger)',
  render: () => (
    <AppHeader>
      <AppHeader.Breadcrumbs>
        <span className="text-sm font-medium text-foreground">Marketing · Pricing</span>
      </AppHeader.Breadcrumbs>
      <AppHeader.Actions>
        <Button variant="outline" size="sm" type="button" className="gap-2">
          <Search aria-hidden className="size-4" />
          Search
        </Button>
      </AppHeader.Actions>
    </AppHeader>
  ),
};
