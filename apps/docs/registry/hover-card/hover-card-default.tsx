'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@uranus-workspace/design-system';
import { CalendarDays } from 'lucide-react';

export default function HoverCardDefault() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="px-0">
          @gustavo
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/gustavobertoi.png" alt="Gustavo Bertoi" />
            <AvatarFallback>GB</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Gustavo Bertoi</h4>
            <p className="text-sm text-muted-foreground">
              Engenheiro de software na Uranus. Construindo ferramentas para times de produto.
            </p>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <CalendarDays className="mr-1 size-3" />
              Entrou em março de 2024
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
