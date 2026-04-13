'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@uranus-workspace/design-system';
import { CreditCard, FileText, Plus, Settings, User, Users } from 'lucide-react';

export default function CommandDefault() {
  return (
    <Command className="w-full max-w-md rounded-lg border shadow-md">
      <CommandInput placeholder="Buscar páginas, ações e configurações…" />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem>
            <FileText />
            Novo documento
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Plus />
            Criar projeto
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Users />
            Convidar membro da equipe
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Configurações">
          <CommandItem>
            <User />
            Perfil
            <CommandShortcut>⇧⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Faturamento
          </CommandItem>
          <CommandItem>
            <Settings />
            Preferências
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
