import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, Input } from '@uranus-workspace/design-system';
import { DataTable } from './data-table.js';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'ativo' | 'convidado' | 'pausado';
  amount: number;
}

const NAMES = [
  'Alice Costa',
  'Bruno Lima',
  'Camila Souza',
  'Diego Almeida',
  'Erika Martins',
  'Felipe Andrade',
  'Gabriela Tavares',
  'Henrique Pires',
];
const STATUSES = ['ativo', 'convidado', 'pausado'] as const;
const AMOUNTS = [248, 512, 1280, 99, 740, 1990, 350, 615, 1240, 482, 870, 156];

const customers: Customer[] = Array.from({ length: 12 }, (_, index) => ({
  id: String(index + 1),
  name: NAMES[index % NAMES.length] ?? 'Cliente',
  email: `cliente${index + 1}@uranus.com.br`,
  status: STATUSES[index % STATUSES.length] ?? 'ativo',
  amount: AMOUNTS[index] ?? 100,
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

const meta: Meta = {
  title: 'Blocks/Data/DataTable',
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DataTable.Provider data={customers} columns={columns} pageSize={5}>
      <DataTable.Root caption="Lista de clientes" />
    </DataTable.Provider>
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable.Provider data={[]} columns={columns}>
      <DataTable.Root
        caption="Lista vazia"
        emptyState={
          <span className="text-sm text-muted-foreground">Nenhum cliente encontrado.</span>
        }
      />
    </DataTable.Provider>
  ),
};

export const WithToolbarAndPagination: Story = {
  render: () => (
    <DataTable.Provider data={customers} columns={columns} pageSize={5}>
      <DataTable.Toolbar>
        <Input placeholder="Buscar…" className="w-64" />
        <Button variant="outline" size="sm" type="button">
          Exportar
        </Button>
      </DataTable.Toolbar>
      <DataTable.Root caption="Com toolbar" />
      <DataTable.Pagination />
    </DataTable.Provider>
  ),
};
