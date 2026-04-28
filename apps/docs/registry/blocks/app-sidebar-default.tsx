'use client';
import { AppSidebar } from '@uranus-workspace/blocks';
import { SidebarProvider } from '@uranus-workspace/design-system';
import { Home } from 'lucide-react';

export default function AppSidebarDefault() {
  return (
    <SidebarProvider>
      <div className="flex h-[360px] w-[260px] overflow-hidden rounded-lg border border-fd-border">
        <AppSidebar
          logo={<span className="font-semibold">Uranus</span>}
          groups={[
            {
              label: 'Menu',
              items: [
                {
                  label: 'Dashboard',
                  href: '#',
                  icon: <Home aria-hidden className="size-4" />,
                  active: true,
                },
              ],
            },
          ]}
        />
      </div>
    </SidebarProvider>
  );
}
