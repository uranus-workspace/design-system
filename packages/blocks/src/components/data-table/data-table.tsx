import {
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type Table as TanStackTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@uranus-workspace/design-system';
import { type HTMLAttributes, type ReactElement, type ReactNode, useState } from 'react';
import { cn } from '../../lib/cn.js';

export interface DataTableProps<TData> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  /** Render-prop for the toolbar slot. Receives the table instance. */
  toolbar?: (table: TanStackTable<TData>) => ReactNode;
  /** Render-prop for a custom pagination footer. Receives the table instance. */
  pagination?: (table: TanStackTable<TData>) => ReactNode;
  /** Enable row selection (you must include a checkbox column in `columns`). */
  enableRowSelection?: boolean;
  /** Enable header sorting. Defaults to `true`. */
  enableSorting?: boolean;
  /** Page size when client-side pagination is used. Defaults to 10. Pass `0` to disable pagination. */
  pageSize?: number;
  /** Element rendered when there are zero rows. */
  emptyState?: ReactNode;
  /** Optional row click handler. */
  onRowClick?: (row: TData) => void;
  /** Accessible caption for the table — required for screen readers. */
  caption?: ReactNode;
}

/**
 * Generic data table built on TanStack Table v8 and the design-system
 * `Table` primitive. Headless except for sensible defaults: client-side
 * sorting + pagination, optional toolbar slot, optional pagination slot.
 */
export function DataTable<TData>({
  data,
  columns,
  toolbar,
  pagination,
  enableRowSelection = false,
  enableSorting = true,
  pageSize = 10,
  emptyState,
  onRowClick,
  caption,
  className,
  ...props
}: DataTableProps<TData>): ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection,
    enableSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pageSize > 0 ? getPaginationRowModel() : undefined,
    initialState: pageSize > 0 ? { pagination: { pageSize, pageIndex: 0 } } : undefined,
  });

  const rows = table.getRowModel().rows;
  const visibleColumnCount = table.getAllLeafColumns().length;

  return (
    <div data-slot="data-table" className={cn('flex flex-col gap-4', className)} {...props}>
      {toolbar ? <div data-slot="data-table-toolbar">{toolbar(table)}</div> : null}

      <div className="rounded-md border">
        <Table>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  const ariaSort: 'ascending' | 'descending' | 'none' | undefined =
                    sorted === 'asc'
                      ? 'ascending'
                      : sorted === 'desc'
                        ? 'descending'
                        : canSort
                          ? 'none'
                          : undefined;
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} aria-sort={ariaSort}>
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="-mx-2 inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  className={onRowClick ? 'cursor-pointer' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumnCount} className="h-32 text-center">
                  {emptyState ?? <span className="text-sm text-muted-foreground">No results.</span>}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination ? <div data-slot="data-table-pagination">{pagination(table)}</div> : null}
    </div>
  );
}
