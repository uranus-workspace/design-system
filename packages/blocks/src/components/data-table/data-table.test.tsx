import type { ColumnDef } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { DataTable } from './data-table.js';

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
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'amount', header: 'Amount' },
];

describe('DataTable', () => {
  it('renders header and rows', () => {
    render(<DataTable data={data} columns={columns} caption="Test table" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Carol')).toBeInTheDocument();
  });

  it('toggles sort when a sortable header is clicked', async () => {
    const user = userEvent.setup();
    render(<DataTable data={data} columns={columns} caption="Sortable" />);

    const header = screen.getByRole('button', { name: 'Name' });
    expect(header.closest('th')).toHaveAttribute('aria-sort', 'none');

    await user.click(header);
    expect(header.closest('th')).toHaveAttribute('aria-sort', 'ascending');

    await user.click(header);
    expect(header.closest('th')).toHaveAttribute('aria-sort', 'descending');
  });

  it('renders the empty state when no rows', () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        caption="Empty"
        emptyState={<span>Nothing here</span>}
      />,
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();
    render(<DataTable data={data} columns={columns} caption="Clickable" onRowClick={onRowClick} />);
    await user.click(screen.getByText('Alice'));
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it('renders the toolbar render-prop', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="With toolbar"
        toolbar={(table) => <span data-testid="rows">Rows: {table.getRowModel().rows.length}</span>}
      />,
    );
    expect(screen.getByTestId('rows')).toHaveTextContent('Rows: 3');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<DataTable data={data} columns={columns} caption="A11y" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
