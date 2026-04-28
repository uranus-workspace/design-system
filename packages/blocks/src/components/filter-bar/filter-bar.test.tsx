import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { FilterBar } from './filter-bar.js';

const filters = [
  { id: 'status', label: 'Status: Active' },
  { id: 'plan', label: 'Plan: Pro' },
];

describe('FilterBar', () => {
  it('renders as a toolbar with each filter as a list item', () => {
    render(<FilterBar filters={filters} onRemoveFilter={vi.fn()} />);
    expect(screen.getByRole('toolbar', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Status: Active')).toBeInTheDocument();
  });

  it('removes a filter when its X button is clicked', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    render(<FilterBar filters={filters} onRemoveFilter={onRemove} />);
    await user.click(screen.getByRole('button', { name: 'Remove filter Plan: Pro' }));
    expect(onRemove).toHaveBeenCalledWith('plan');
  });

  it('shows clear-all only when there are filters and onClearAll is provided', () => {
    const { rerender } = render(<FilterBar filters={filters} onRemoveFilter={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();
    rerender(<FilterBar filters={filters} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeInTheDocument();
    rerender(<FilterBar filters={[]} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <FilterBar filters={filters} onRemoveFilter={vi.fn()} onClearAll={vi.fn()} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders compositional chips when filters are omitted', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    render(
      <FilterBar>
        <FilterBar.Chip id="a" label="A" onRemove={onRemove} />
        <FilterBar.Chip id="b" label="B" onRemove={onRemove} />
      </FilterBar>,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Remove filter B' }));
    expect(onRemove).toHaveBeenCalledWith('b');
  });

  it('has no a11y violations in composition mode', async () => {
    const { container } = render(
      <FilterBar leadingSlot={<span>Search</span>}>
        <FilterBar.Chip id="x" label="Tag" onRemove={vi.fn()} />
      </FilterBar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
