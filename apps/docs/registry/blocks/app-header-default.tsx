'use client';
import { AppHeader } from '@uranus-workspace/blocks';
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
  SidebarProvider,
} from '@uranus-workspace/design-system';
import { Bell, ChevronRight, Search } from 'lucide-react';

export default function AppHeaderDefault() {
  return (
    <SidebarProvider className="min-h-0 w-full">
      <div className="flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-fd-border bg-background">
        <AppHeader
          breadcrumbs={
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
              <span className="text-fd-muted-foreground">Produtos</span>
              <ChevronRight aria-hidden className="size-4 shrink-0 text-fd-muted-foreground" />
              <span className="truncate font-medium text-fd-foreground">Visão geral</span>
            </nav>
          }
          searchTrigger={
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" aria-hidden />
              Buscar
            </Button>
          }
          notifications={
            <Button variant="ghost" size="icon" aria-label="Notificações">
              <Bell className="size-4" aria-hidden />
            </Button>
          }
          userMenu={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full p-0"
                  aria-label="Menu da conta"
                >
                  <Avatar className="size-9">
                    <AvatarFallback className="text-xs">UT</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-normal">
                  <span className="text-sm font-medium">Conta</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
        <div className="border-t border-border px-4 py-3 text-xs text-fd-muted-foreground">
          Preview do chrome global — largura total do painel; trigger da sidebar à esquerda.
        </div>
      </div>
    </SidebarProvider>
  );
}
