'use client';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@uranus-workspace/blocks';

type Row = { id: string; name: string };

const data: Row[] = [
  { id: '1', name: 'Alpha' },
  { id: '2', name: 'Beta' },
];

const columns: ColumnDef<Row, unknown>[] = [{ accessorKey: 'name', header: 'Nome' }];

export default function DataTableDefault() {
  return (
    <div className="w-full max-w-xl">
      <DataTable data={data} columns={columns} caption="Exemplo" pageSize={5} />
    </div>
  );
}
