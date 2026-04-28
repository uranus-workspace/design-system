'use client';
import { AppHeader, AppShell, AppSidebar } from '@uranus-workspace/blocks';

export default function AppShellDefault() {
  return (
    <div className="flex h-[440px] w-full max-w-5xl overflow-hidden rounded-lg border border-fd-border">
      <AppShell
        sidebar={
          <AppSidebar
            logo={<span className="font-semibold">Uranus</span>}
            groups={[
              {
                label: 'Navegação',
                items: [{ label: 'Início', href: '#', active: true }],
              },
            ]}
          />
        }
        header={
          <AppHeader
            breadcrumbs={<span className="truncate text-sm text-fd-muted-foreground">Preview</span>}
          />
        }
      >
        <div className="p-6">
          <p className="text-sm text-fd-muted-foreground">
            Área principal — rolagem independente do header fixo.
          </p>
        </div>
      </AppShell>
    </div>
  );
}
