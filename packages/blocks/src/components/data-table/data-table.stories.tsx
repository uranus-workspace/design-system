import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, Input } from '@uranus-workspace/design-system';
import { DataTable } from './data-table.js';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'invited' | 'paused';
  amount: number;
}

const customers: Customer[] = Array.from({ length: 25 }, (_, index) => ({
  id: String(index + 1),
  name: ['Alice', 'Bruno', 'Camila', 'Diego', 'Erika'][index % 5] ?? 'Felipe',
  email: `customer${index + 1}@uranus.com.br`,
  status: (['active', 'invited', 'paused'] as const)[index % 3] ?? 'active',
  amount: Math.round(Math.random() * 1000),
}));

const columns: ColumnDef<Customer, unknown>[] = [
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row }) =>
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        row.original.amount,
      ),
  },
];

const meta: Meta<typeof DataTable<Customer>> = {
  title: 'Blocks/Data/DataTable',
  component: DataTable<Customer>,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataTable<Customer>>;

export const Default: Story = {
  args: {
    data: customers,
    columns,
    caption: 'Lista de clientes',
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    caption: 'Lista vazia',
    emptyState: <span className="text-sm text-muted-foreground">Nenhum cliente encontrado.</span>,
  },
};

export const WithToolbarAndPagination: Story = {
  args: {
    data: customers,
    columns,
    caption: 'Com toolbar',
    toolbar: () => (
      <div className="flex items-center gap-2">
        <Input placeholder="Buscar…" className="w-64" />
        <Button variant="outline" size="sm">
          Exportar
        </Button>
      </div>
    ),
    pagination: (table) => (
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    ),
  },
};
