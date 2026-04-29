'use client';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable, useDataTable } from '@uranus-workspace/blocks';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from '@uranus-workspace/design-system';
import { Search } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  status: 'ativo' | 'convidado' | 'pausado';
  amount: number;
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'Alice Costa',
    email: 'alice@uranus.com.br',
    plan: 'Enterprise',
    status: 'ativo',
    amount: 12_800,
  },
  {
    id: '2',
    name: 'Bruno Lima',
    email: 'bruno@uranus.com.br',
    plan: 'Pro',
    status: 'ativo',
    amount: 870,
  },
  {
    id: '3',
    name: 'Camila Souza',
    email: 'camila@uranus.com.br',
    plan: 'Free',
    status: 'convidado',
    amount: 0,
  },
  {
    id: '4',
    name: 'Diego Almeida',
    email: 'diego@uranus.com.br',
    plan: 'Pro',
    status: 'pausado',
    amount: 99,
  },
  {
    id: '5',
    name: 'Erika Martins',
    email: 'erika@uranus.com.br',
    plan: 'Enterprise',
    status: 'ativo',
    amount: 19_900,
  },
  {
    id: '6',
    name: 'Felipe Andrade',
    email: 'felipe@uranus.com.br',
    plan: 'Pro',
    status: 'ativo',
    amount: 615,
  },
  {
    id: '7',
    name: 'Gabriela Tavares',
    email: 'gabriela@uranus.com.br',
    plan: 'Free',
    status: 'convidado',
    amount: 0,
  },
  {
    id: '8',
    name: 'Henrique Pires',
    email: 'henrique@uranus.com.br',
    plan: 'Pro',
    status: 'ativo',
    amount: 740,
  },
];

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const statusVariant: Record<Customer['status'], 'default' | 'secondary' | 'outline'> = {
  ativo: 'default',
  convidado: 'secondary',
  pausado: 'outline',
};

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const columns: ColumnDef<Customer, unknown>[] = [
  {
    accessorKey: 'name',
    header: 'Cliente',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarFallback className="text-[11px] font-medium">
            {initialsOf(row.original.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'plan',
    header: 'Plano',
    cell: ({ row }) => <span className="text-sm">{row.original.plan}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">MRR</div>,
    cell: ({ row }) => (
      <div className="text-right font-mono text-sm tabular-nums">
        {currency.format(row.original.amount)}
      </div>
    ),
  },
];

function NameSearch() {
  const { table } = useDataTable<Customer>();
  const value = (table.getColumn('name')?.getFilterValue() as string) ?? '';
  return (
    <div className="relative w-full sm:w-72">
      <Search
        aria-hidden
        className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        aria-label="Buscar cliente"
        placeholder="Buscar por nome…"
        value={value}
        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
        className="pl-8"
      />
    </div>
  );
}

export default function DataTableDefault() {
  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-base">Clientes ativos</CardTitle>
            <p className="text-xs text-muted-foreground">
              {customers.length} clientes neste workspace.
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <DataTable.Provider data={customers} columns={columns} pageSize={5}>
            <DataTable.Toolbar className="justify-start">
              <NameSearch />
            </DataTable.Toolbar>
            <DataTable.Root caption="Clientes ativos no workspace" />
            <DataTable.Pagination />
          </DataTable.Provider>
        </CardContent>
      </Card>
    </div>
  );
}
