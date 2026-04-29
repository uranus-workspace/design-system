'use client';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@uranus-workspace/blocks';
import { Badge } from '@uranus-workspace/design-system';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'ativo' | 'convidado' | 'pausado';
  amount: number;
}

const customers: Customer[] = [
  { id: '1', name: 'Alice Costa', email: 'alice@uranus.com.br', status: 'ativo', amount: 1280 },
  { id: '2', name: 'Bruno Lima', email: 'bruno@uranus.com.br', status: 'ativo', amount: 870 },
  {
    id: '3',
    name: 'Camila Souza',
    email: 'camila@uranus.com.br',
    status: 'convidado',
    amount: 248,
  },
  {
    id: '4',
    name: 'Diego Almeida',
    email: 'diego@uranus.com.br',
    status: 'pausado',
    amount: 99,
  },
  {
    id: '5',
    name: 'Erika Martins',
    email: 'erika@uranus.com.br',
    status: 'ativo',
    amount: 1990,
  },
  {
    id: '6',
    name: 'Felipe Andrade',
    email: 'felipe@uranus.com.br',
    status: 'ativo',
    amount: 615,
  },
  {
    id: '7',
    name: 'Gabriela Tavares',
    email: 'gabriela@uranus.com.br',
    status: 'convidado',
    amount: 350,
  },
  {
    id: '8',
    name: 'Henrique Pires',
    email: 'henrique@uranus.com.br',
    status: 'ativo',
    amount: 740,
  },
];

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

export default function DataTableDefault() {
  return (
    <div className="flex w-full flex-col gap-3">
      <DataTable.Provider data={customers} columns={columns} pageSize={5}>
        <DataTable.Root caption="Clientes ativos no workspace" />
        <DataTable.Pagination />
      </DataTable.Provider>
    </div>
  );
}
