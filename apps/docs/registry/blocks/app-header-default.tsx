'use client';
import { AppHeader } from '@uranus-workspace/blocks';
import {
  Avatar,
  AvatarFallback,
  Badge,
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
import { Bell, ChevronRight, LogOut, Search, Settings, User } from 'lucide-react';

export default function AppHeaderDefault() {
  return (
    <SidebarProvider className="min-h-0 w-full">
      <div className="flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-fd-border bg-background">
        <AppHeader>
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <AppHeader.Breadcrumbs>
            <ol className="flex min-w-0 items-center gap-1.5 text-sm">
              <li className="text-fd-muted-foreground">Workspace</li>
              <li aria-hidden>
                <ChevronRight className="size-4 shrink-0 text-fd-muted-foreground" />
              </li>
              <li className="text-fd-muted-foreground">Produtos</li>
              <li aria-hidden>
                <ChevronRight className="size-4 shrink-0 text-fd-muted-foreground" />
              </li>
              <li className="truncate font-medium text-fd-foreground">Visão geral</li>
            </ol>
          </AppHeader.Breadcrumbs>
          <AppHeader.Actions>
            <Button
              variant="outline"
              size="sm"
              className="hidden h-9 w-64 justify-between gap-3 px-3 text-xs text-fd-muted-foreground sm:inline-flex"
            >
              <span className="inline-flex items-center gap-2">
                <Search aria-hidden className="size-4" />
                Buscar projetos, pessoas…
              </span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="sm:hidden"
              type="button"
              aria-label="Buscar"
            >
              <Search className="size-4" aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" type="button" aria-label="Notificações">
              <span className="relative inline-flex">
                <Bell className="size-4" aria-hidden />
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 gap-2 rounded-full px-1 pr-3"
                  aria-label="Menu da conta"
                >
                  <Avatar className="size-7">
                    <AvatarFallback className="text-xs font-medium">GB</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-xs font-medium leading-tight md:inline-flex md:flex-col md:items-start">
                    Gustavo Bertoi
                    <span className="text-[10px] font-normal text-muted-foreground">
                      gustavo@uranus.com.br
                    </span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Gustavo Bertoi</span>
                    <span className="text-xs text-muted-foreground">gustavo@uranus.com.br</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User aria-hidden className="size-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings aria-hidden className="size-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut aria-hidden className="size-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </AppHeader.Actions>
        </AppHeader>
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex flex-col">
            <h1 className="text-base font-semibold tracking-tight text-fd-foreground">
              Visão geral
            </h1>
            <p className="text-xs text-fd-muted-foreground">
              KPIs do workspace, atualizados há 2 minutos.
            </p>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Beta
          </Badge>
        </div>
        <div className="px-4 py-6 text-xs text-fd-muted-foreground">
          Conteúdo da rota vai aqui — o `AppHeader` é o chrome global e fica sticky no topo do
          `AppShell.Inset`.
        </div>
      </div>
    </SidebarProvider>
  );
}
