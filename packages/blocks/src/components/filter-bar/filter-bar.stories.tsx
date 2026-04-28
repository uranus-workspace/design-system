import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@uranus-workspace/design-system';
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

export const Default: Story = {
  render: function Render() {
    const [filters, setFilters] = useState([
      { id: 'status', label: 'Status: Active' },
      { id: 'plan', label: 'Plan: Pro' },
      { id: 'region', label: 'Region: BR' },
    ]);
    return (
      <FilterBar
        filters={filters}
        onRemoveFilter={(id) => setFilters((curr) => curr.filter((f) => f.id !== id))}
        onClearAll={() => setFilters([])}
        leadingSlot={<Input placeholder="Buscar…" className="w-48" />}
      />
    );
  },
};

export const Empty: Story = {
  args: {
    filters: [],
    onRemoveFilter: () => {},
  },
};

export const Compositional: Story = {
  render: function Render() {
    const [ids, setIds] = useState<string[]>(['status', 'plan']);
    const chips = [
      { id: 'status', label: 'Status: Active' },
      { id: 'plan', label: 'Plan: Pro' },
      { id: 'region', label: 'Region: BR' },
    ].filter((c) => ids.includes(c.id));
    return (
      <FilterBar leadingSlot={<Input placeholder="Buscar…" className="w-48" />}>
        {chips.map((c) => (
          <FilterBar.Chip
            key={c.id}
            id={c.id}
            label={c.label}
            onRemove={(id) => setIds((curr) => curr.filter((x) => x !== id))}
          />
        ))}
      </FilterBar>
    );
  },
};
