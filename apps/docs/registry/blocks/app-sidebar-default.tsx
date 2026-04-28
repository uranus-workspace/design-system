'use client';
import { AppSidebar, AppSidebarBrand, AppSidebarSearch } from '@uranus-workspace/blocks';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@uranus-workspace/design-system';
import {
  BookOpen,
  ChevronsUpDown,
  Code,
  FileCode,
  FileText,
  FolderTree,
  Layers,
  Rocket,
} from 'lucide-react';

export default function AppSidebarDefault() {
  return (
    <div className="box-border flex h-[min(680px,78vh)] min-h-[520px] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <SidebarProvider className="flex min-h-0 w-full flex-1 flex-col">
        <div className="flex min-h-0 min-w-0 w-full flex-1 flex-row">
          <AppSidebar
            collapsible="none"
            className="w-[min(100%,19rem)] shrink-0 border-r border-sidebar-border"
            search={<AppSidebarSearch placeholder="Search the docs…" />}
            logo={
              <AppSidebarBrand
                icon={<BookOpen aria-hidden />}
                title="Documentation"
                subtitle="v1.0.1"
                action={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    aria-label="Switch workspace"
                  >
                    <ChevronsUpDown aria-hidden className="size-4 opacity-70" />
                  </Button>
                }
              />
            }
            groups={[
              {
                label: 'Getting started',
                items: [
                  {
                    label: 'Installation',
                    href: '#installation',
                    icon: <Rocket aria-hidden className="size-4" />,
                  },
                  {
                    label: 'Project structure',
                    href: '#structure',
                    icon: <FolderTree aria-hidden className="size-4" />,
                  },
                ],
              },
              {
                label: 'Build your application',
                items: [
                  {
                    label: 'Routing',
                    href: '#routing',
                    icon: <Layers aria-hidden className="size-4" />,
                  },
                  {
                    label: 'Data fetching',
                    href: '#data',
                    icon: <Code aria-hidden className="size-4" />,
                    active: true,
                  },
                  {
                    label: 'Rendering',
                    href: '#rendering',
                    icon: <FileCode aria-hidden className="size-4" />,
                  },
                  {
                    label: 'Middleware',
                    href: '#middleware',
                    icon: <FileText aria-hidden className="size-4" />,
                  },
                ],
              },
            ]}
            footer={
              <div className="flex items-center gap-2 border-t border-sidebar-border px-2 py-3">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-xs font-medium text-sidebar-accent-foreground"
                  aria-hidden
                >
                  UT
                </div>
                <div className="grid min-w-0 flex-1 gap-0.5 text-left text-xs leading-tight">
                  <span className="truncate font-medium text-sidebar-foreground">User</span>
                  <span className="truncate text-sidebar-foreground/70">you@uranus.com.br</span>
                </div>
                <ChevronsUpDown aria-hidden className="size-4 shrink-0 opacity-50" />
              </div>
            }
          />
          <SidebarInset className="min-h-0 flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
            <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList className="text-sm">
                  <BreadcrumbItem className="hidden sm:inline-flex">
                    <BreadcrumbLink href="#">Build your application</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden sm:inline-flex" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-auto p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/60" />
                <div className="aspect-video rounded-xl bg-muted/60" />
                <div className="aspect-video rounded-xl bg-muted/60" />
              </div>
              <div className="min-h-40 flex-1 rounded-xl bg-muted/60 md:min-h-min" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
