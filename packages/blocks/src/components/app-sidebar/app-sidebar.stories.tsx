import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarProvider,
} from '@uranus-workspace/design-system';
import { BookOpen, ChevronsUpDown, Folder, Home, Layers, Zap } from 'lucide-react';
import type { ReactElement } from 'react';
import { AppSidebar } from './app-sidebar.js';

const meta: Meta<typeof AppSidebar> = {
  title: 'Blocks/Chrome/AppSidebar',
  component: AppSidebar,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
  decorators: [
    (Story: () => ReactElement) => (
      <div className="flex h-[480px] w-full max-w-xl overflow-hidden rounded-xl border bg-sidebar shadow-sm">
        <SidebarProvider className="min-h-0 w-full">
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AppSidebar>;

/** Sidebar rail — brand + search + grouped nav (sidebar-01 density). */
export const RailSidebar01Style: Story = {
  name: 'Rail · sidebar-01 style',
  render: () => (
    <AppSidebar collapsible="none" className="min-h-0 flex-1 border-r border-sidebar-border">
      <AppSidebar.Header>
        <AppSidebar.Brand>
          <AppSidebar.Brand.Icon>
            <BookOpen aria-hidden />
          </AppSidebar.Brand.Icon>
          <AppSidebar.Brand.Body>
            <AppSidebar.Brand.Title>Documentation</AppSidebar.Brand.Title>
            <AppSidebar.Brand.Subtitle>v1.0.1</AppSidebar.Brand.Subtitle>
          </AppSidebar.Brand.Body>
          <AppSidebar.Brand.Action>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0"
              aria-label="Switch"
            >
              <ChevronsUpDown aria-hidden className="size-4 opacity-70" />
            </Button>
          </AppSidebar.Brand.Action>
        </AppSidebar.Brand>
      </AppSidebar.Header>
      <AppSidebar.Content>
        <AppSidebar.Search placeholder="Search the docs…" />
        <SidebarGroup>
          <SidebarGroupLabel>Getting started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <AppSidebar.NavLink
                href="#install"
                icon={<Home aria-hidden className="size-4" />}
                label="Installation"
              >
                Installation
              </AppSidebar.NavLink>
              <AppSidebar.NavLink
                href="#structure"
                icon={<Folder aria-hidden className="size-4" />}
                label="Project structure"
              >
                Project structure
              </AppSidebar.NavLink>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Build your application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <AppSidebar.NavLink
                href="#routing"
                icon={<Layers aria-hidden className="size-4" />}
                label="Routing"
              >
                Routing
              </AppSidebar.NavLink>
              <AppSidebar.NavLink
                href="#data"
                icon={<Zap aria-hidden className="size-4" />}
                active
                label="Data fetching"
              >
                Data fetching
              </AppSidebar.NavLink>
              <AppSidebar.NavLink
                href="#render"
                icon={<Home aria-hidden className="size-4" />}
                label="Rendering"
              >
                Rendering
              </AppSidebar.NavLink>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </AppSidebar.Content>
      <AppSidebar.Footer>
        <div className="border-t border-sidebar-border px-2 py-2 text-xs text-sidebar-foreground/70">
          v0.0.1
        </div>
      </AppSidebar.Footer>
    </AppSidebar>
  ),
};

export const NoFooter: Story = {
  render: () => (
    <AppSidebar collapsible="none" className="min-h-0 flex-1 border-r border-sidebar-border">
      <AppSidebar.Header>
        <span className="text-base font-semibold">Uranus</span>
      </AppSidebar.Header>
      <AppSidebar.Content>
        <SidebarGroup>
          <SidebarGroupLabel>Getting started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <AppSidebar.NavLink
                href="#install"
                icon={<Home aria-hidden className="size-4" />}
                label="Installation"
              >
                Installation
              </AppSidebar.NavLink>
              <AppSidebar.NavLink
                href="#structure"
                icon={<Folder aria-hidden className="size-4" />}
                label="Project structure"
              >
                Project structure
              </AppSidebar.NavLink>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Build</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <AppSidebar.NavLink
                href="#routing"
                icon={<Layers aria-hidden className="size-4" />}
                label="Routing"
              >
                Routing
              </AppSidebar.NavLink>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </AppSidebar.Content>
    </AppSidebar>
  ),
};
