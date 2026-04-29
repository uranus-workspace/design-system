'use client';

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@uranus-workspace/design-system';
import { Menu } from 'lucide-react';

export default function SheetLeft() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Abrir menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navegação</SheetTitle>
          <SheetDescription>Acesse rapidamente as principais áreas do produto.</SheetDescription>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1 text-sm">
          <a
            className="rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href="#inicio"
          >
            Início
          </a>
          <a
            className="rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href="#projetos"
          >
            Projetos
          </a>
          <a
            className="rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href="#equipe"
          >
            Equipe
          </a>
          <a
            className="rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href="#configuracoes"
          >
            Configurações
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
