'use client';
import { AppHeader } from '@uranus-workspace/blocks';
import { Button, SidebarProvider } from '@uranus-workspace/design-system';
import { Search } from 'lucide-react';

export default function AppHeaderDefault() {
  return (
    <SidebarProvider>
      <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-fd-border">
        <AppHeader
          breadcrumbs={
            <span className="text-sm text-fd-muted-foreground">Configurações / Perfil</span>
          }
          searchTrigger={
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-4" aria-hidden />
              Buscar
            </Button>
          }
        />
      </div>
    </SidebarProvider>
  );
}
