'use client';
import { AppHeader, AppShell, AppSidebar } from '@uranus-workspace/blocks';

export default function AppShellDefault() {
  return (
    <div className="box-border flex h-[min(680px,78vh)] min-h-[520px] w-full flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <AppShell defaultSidebarOpen className="flex h-full min-h-0 w-full flex-1 overflow-hidden">
        <AppShell.Sidebar>
          <AppSidebar
            collapsible="none"
            className="h-full min-h-0 w-[min(100%,16rem)] shrink-0 border-r border-sidebar-border"
            logo={<span className="font-semibold">Uranus</span>}
            groups={[
              {
                label: 'Navegação',
                items: [
                  { label: 'Início', href: '#', active: true },
                  { label: 'Projetos', href: '#' },
                ],
              },
            ]}
          />
        </AppShell.Sidebar>
        <AppShell.Inset className="min-h-0 min-w-0 flex-1">
          <AppShell.Header>
            <AppHeader
              breadcrumbs={
                <span className="truncate text-sm text-fd-muted-foreground">
                  Produtos / Visão geral
                </span>
              }
            />
          </AppShell.Header>
          <AppShell.Content className="bg-muted/15">
            <div className="space-y-3 p-6">
              <p className="text-sm font-medium text-fd-foreground">Área principal</p>
              <p className="text-sm leading-relaxed text-fd-muted-foreground">
                O header permanece fixo enquanto esta região rola (`AppShell.Content`).
              </p>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <div className="h-24 rounded-lg border border-dashed border-fd-border/80 bg-fd-card/50" />
                <div className="h-24 rounded-lg border border-dashed border-fd-border/80 bg-fd-card/50" />
              </div>
            </div>
          </AppShell.Content>
        </AppShell.Inset>
      </AppShell>
    </div>
  );
}
