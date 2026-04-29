'use client';
import { FilterBar } from '@uranus-workspace/blocks';
import { Button, Input } from '@uranus-workspace/design-system';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const initialChips = [
  { id: 'status', label: 'Status: Ativo' },
  { id: 'plan', label: 'Plano: Pro' },
  { id: 'region', label: 'Região: BR' },
];

export default function FilterBarDefault() {
  const [chips, setChips] = useState(initialChips);
  return (
    <FilterBar className="w-full max-w-2xl">
      <Input placeholder="Buscar…" className="w-44" />
      <Button variant="outline" size="sm" type="button">
        <Plus aria-hidden className="size-3" />
        <span>Adicionar filtro</span>
      </Button>
      <FilterBar.Chips>
        {chips.map((c) => (
          <FilterBar.Chip
            key={c.id}
            id={c.id}
            label={c.label}
            onRemove={(id) => setChips((curr) => curr.filter((x) => x.id !== id))}
          />
        ))}
      </FilterBar.Chips>
      {chips.length > 0 ? (
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => setChips([])}
          className="ml-auto"
        >
          Limpar tudo
        </Button>
      ) : null}
    </FilterBar>
  );
}
