import type { ColumnDef } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { DataTable, useDataTable } from './data-table.js';

interface Row {
  id: string;
  name: string;
  amount: number;
}

const data: Row[] = [
  { id: '1', name: 'Alice', amount: 100 },
  { id: '2', name: 'Bob', amount: 50 },
  { id: '3', name: 'Carol', amount: 200 },
];

const columns: ColumnDef<Row, unknown>[] = [
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'amount', header: 'Valor' },
];

describe('DataTable', () => {
  it('renders header and rows', () => {
    render(
      <DataTable.Provider data={data} columns={columns}>
        <DataTable.Root caption="Tabela de teste" />
      </DataTable.Provider>,
    );
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Carol')).toBeInTheDocument();
  });

  it('toggles sort when a sortable header is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DataTable.Provider data={data} columns={columns}>
        <DataTable.Root caption="Sortable" />
      </DataTable.Provider>,
    );

    const header = screen.getByRole('button', { name: 'Nome' });
    expect(header.closest('th')).toHaveAttribute('aria-sort', 'none');

    await user.click(header);
    expect(header.closest('th')).toHaveAttribute('aria-sort', 'ascending');

    await user.click(header);
    expect(header.closest('th')).toHaveAttribute('aria-sort', 'descending');
  });

  it('renders the empty state when no rows', () => {
    render(
      <DataTable.Provider data={[]} columns={columns}>
        <DataTable.Root caption="Vazia" emptyState={<span>Nada por aqui</span>} />
      </DataTable.Provider>,
    );
    expect(screen.getByText('Nada por aqui')).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();
    render(
      <DataTable.Provider data={data} columns={columns}>
        <DataTable.Root caption="Clicável" onRowClick={onRowClick} />
      </DataTable.Provider>,
    );
    await user.click(screen.getByText('Alice'));
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it('lets toolbar children read the table instance via useDataTable', () => {
    function RowCount() {
      const { table } = useDataTable<Row>();
      return <span data-testid="rows">Linhas: {table.getRowModel().rows.length}</span>;
    }
    render(
      <DataTable.Provider data={data} columns={columns}>
        <DataTable.Toolbar>
          <RowCount />
        </DataTable.Toolbar>
        <DataTable.Root caption="Com toolbar" />
      </DataTable.Provider>,
    );
    expect(screen.getByTestId('rows')).toHaveTextContent('Linhas: 3');
  });

  it('renders default pagination buttons', async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: String(index + 1),
      name: `Linha ${index + 1}`,
      amount: index,
    }));
    render(
      <DataTable.Provider data={many} columns={columns} pageSize={5}>
        <DataTable.Root caption="Paginada" />
        <DataTable.Pagination />
      </DataTable.Provider>,
    );
    expect(screen.getByText('Página 1 de 3')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Próxima' }));
    expect(screen.getByText('Página 2 de 3')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <DataTable.Provider data={data} columns={columns}>
        <DataTable.Root caption="A11y" />
      </DataTable.Provider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
