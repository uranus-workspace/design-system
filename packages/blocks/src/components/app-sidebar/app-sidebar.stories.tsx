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
import { AppSidebar, type SidebarNavGroup } from './app-sidebar.js';

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

const groups: SidebarNavGroup[] = [
  {
    label: 'Getting started',
    items: [
      { label: 'Installation', href: '#install', icon: <Home aria-hidden className="size-4" /> },
      {
        label: 'Project structure',
        href: '#structure',
        icon: <Folder aria-hidden className="size-4" />,
      },
    ],
  },
  {
    label: 'Build your application',
    items: [
      { label: 'Routing', href: '#routing', icon: <Layers aria-hidden className="size-4" /> },
      {
        label: 'Data fetching',
        href: '#data',
        icon: <Zap aria-hidden className="size-4" />,
        active: true,
      },
      { label: 'Rendering', href: '#render', icon: <Home aria-hidden className="size-4" /> },
    ],
  },
];

/** Sidebar rail only — brand + search + grouped nav (sidebar-01–style density). */
export const RailOnly: Story = {
  name: 'Rail · sidebar-01 style',
  args: {
    collapsible: 'none',
    className: 'min-h-0 flex-1 border-r border-sidebar-border',
    search: <AppSidebar.Search placeholder="Search the docs…" />,
    logo: (
      <AppSidebar.Brand
        icon={<BookOpen aria-hidden />}
        title="Documentation"
        subtitle="v1.0.1"
        action={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            aria-label="Switch"
          >
            <ChevronsUpDown aria-hidden className="size-4 opacity-70" />
          </Button>
        }
      />
    ),
    groups,
    footer: (
      <div className="border-t border-sidebar-border px-2 py-2 text-xs text-sidebar-foreground/70">
        v0.0.1
      </div>
    ),
  },
};

export const NoFooter: Story = {
  args: {
    collapsible: 'none',
    className: 'min-h-0 flex-1 border-r border-sidebar-border',
    logo: <span className="text-base font-semibold">Uranus</span>,
    groups,
  },
};

export const Compositional: Story = {
  render: () => (
    <AppSidebar collapsible="none" className="min-h-0 flex-1 border-r border-sidebar-border">
      <AppSidebar.Header>
        <AppSidebar.Brand
          icon={<BookOpen aria-hidden />}
          title="Documentation"
          subtitle="v1.0.1"
          action={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Switch"
            >
              <ChevronsUpDown aria-hidden className="size-4 opacity-70" />
            </Button>
          }
        />
      </AppSidebar.Header>
      <AppSidebar.Content>
        <AppSidebar.Search placeholder="Search…" />
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <AppSidebar.NavLink
                href="#"
                icon={<Home aria-hidden className="size-4" />}
                active
                label="Dashboard"
              >
                Dashboard
              </AppSidebar.NavLink>
              <AppSidebar.NavLink
                href="#"
                icon={<Folder aria-hidden className="size-4" />}
                badge="3"
                label="Projects"
              >
                Projects
              </AppSidebar.NavLink>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </AppSidebar.Content>
      <AppSidebar.Footer>
        <div className="text-xs text-sidebar-foreground/70">Footer</div>
      </AppSidebar.Footer>
    </AppSidebar>
  ),
};
