import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input } from '@uranus-workspace/design-system';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FilterBar } from './filter-bar.js';

const meta: Meta<typeof FilterBar> = {
  title: 'Blocks/Data/FilterBar',
  component: FilterBar,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FilterBar>;

const initialChips = [
  { id: 'status', label: 'Status: Ativo' },
  { id: 'plan', label: 'Plano: Pro' },
  { id: 'region', label: 'Região: BR' },
];

export const Default: Story = {
  render: function Render() {
    const [chips, setChips] = useState(initialChips);
    return (
      <FilterBar>
        <Input placeholder="Buscar…" className="w-48" />
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
  },
};

export const Empty: Story = {
  render: () => (
    <FilterBar>
      <Input placeholder="Buscar…" className="w-48" />
      <Button variant="outline" size="sm" type="button">
        <Plus aria-hidden className="size-3" />
        <span>Adicionar filtro</span>
      </Button>
      <FilterBar.Chips />
    </FilterBar>
  ),
};
