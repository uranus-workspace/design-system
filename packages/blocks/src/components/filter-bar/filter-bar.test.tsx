import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { FilterBar } from './filter-bar.js';

describe('FilterBar', () => {
  it('renders as a toolbar with each chip as a list item', () => {
    render(
      <FilterBar>
        <FilterBar.Chips>
          <FilterBar.Chip id="status" label="Status: Ativo" onRemove={vi.fn()} />
          <FilterBar.Chip id="plan" label="Plano: Pro" onRemove={vi.fn()} />
        </FilterBar.Chips>
      </FilterBar>,
    );
    expect(screen.getByRole('toolbar', { name: 'Filtros' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Status: Ativo')).toBeInTheDocument();
  });

  it('removes a chip when its X button is clicked', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    render(
      <FilterBar>
        <FilterBar.Chips>
          <FilterBar.Chip id="status" label="Status: Ativo" onRemove={onRemove} />
          <FilterBar.Chip id="plan" label="Plano: Pro" onRemove={onRemove} />
        </FilterBar.Chips>
      </FilterBar>,
    );
    await user.click(screen.getByRole('button', { name: 'Remover filtro Plano: Pro' }));
    expect(onRemove).toHaveBeenCalledWith('plan');
  });

  it('renders a custom clear-all button as a sibling child', async () => {
    const onClearAll = vi.fn();
    const user = userEvent.setup();
    render(
      <FilterBar>
        <FilterBar.Chips>
          <FilterBar.Chip id="status" label="Status" onRemove={vi.fn()} />
        </FilterBar.Chips>
        <Button variant="ghost" size="sm" className="ml-auto" onClick={onClearAll}>
          Limpar tudo
        </Button>
      </FilterBar>,
    );
    await user.click(screen.getByRole('button', { name: 'Limpar tudo' }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <FilterBar>
        <FilterBar.Chips>
          <FilterBar.Chip id="status" label="Status: Ativo" onRemove={vi.fn()} />
          <FilterBar.Chip id="plan" label="Plano: Pro" onRemove={vi.fn()} />
        </FilterBar.Chips>
      </FilterBar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
