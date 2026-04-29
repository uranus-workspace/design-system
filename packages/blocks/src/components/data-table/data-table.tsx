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
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@uranus-workspace/design-system';
import { type HTMLAttributes, type ReactNode, createContext, useContext, useState } from 'react';
import { cn } from '../../lib/cn.js';

interface DataTableContextValue {
  table: TanStackTable<unknown>;
}

const DataTableContext = createContext<DataTableContextValue | null>(null);

/**
 * Read the underlying TanStack `Table` instance from `DataTable.Provider`.
 * Re-cast the row type at the call site (e.g. `useDataTable<Customer>()`).
 */
export function useDataTable<TData>(): { table: TanStackTable<TData> } {
  const ctx = useContext(DataTableContext);
  if (!ctx) {
    throw new Error('useDataTable must be used within DataTable.Provider');
  }
  return { table: ctx.table as unknown as TanStackTable<TData> };
}

export interface DataTableProviderProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  /** Enable row selection (you must include a checkbox column in `columns`). */
  enableRowSelection?: boolean;
  /** Enable header sorting. Defaults to `true`. */
  enableSorting?: boolean;
  /** Page size when client-side pagination is used. Defaults to 10. Pass `0` to disable pagination. */
  pageSize?: number;
  children?: ReactNode;
}

function DataTableProvider<TData>({
  data,
  columns,
  enableRowSelection = false,
  enableSorting = true,
  pageSize = 10,
  children,
}: DataTableProviderProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable<TData>({
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

  const value: DataTableContextValue = { table: table as unknown as TanStackTable<unknown> };
  return <DataTableContext.Provider value={value}>{children}</DataTableContext.Provider>;
}

DataTableProvider.displayName = 'DataTable.Provider';

export interface DataTableRootProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Accessible caption for the table — required for screen readers. */
  caption: ReactNode;
  /** Element rendered when there are zero rows. */
  emptyState?: ReactNode;
  /** Optional row click handler. */
  onRowClick?: (row: TData) => void;
}

function DataTableRoot<TData = unknown>({
  caption,
  emptyState,
  onRowClick,
  className,
  ...props
}: DataTableRootProps<TData>) {
  const { table } = useDataTable<TData>();
  const rows = table.getRowModel().rows;
  const visibleColumnCount = table.getAllLeafColumns().length;

  return (
    <div data-slot="data-table-root" className={cn('rounded-md border', className)} {...props}>
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
                {emptyState ?? (
                  <span className="text-sm text-muted-foreground">Sem resultados.</span>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

DataTableRoot.displayName = 'DataTable.Root';

export type DataTableToolbarProps = HTMLAttributes<HTMLDivElement>;

function DataTableToolbar({ className, ...props }: DataTableToolbarProps) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
}

DataTableToolbar.displayName = 'DataTable.Toolbar';

export interface DataTablePaginationProps extends HTMLAttributes<HTMLDivElement> {
  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
}

function DataTablePagination({
  className,
  previousLabel = 'Anterior',
  nextLabel = 'Próxima',
  ...props
}: DataTablePaginationProps) {
  const { table } = useDataTable<unknown>();
  return (
    <div
      data-slot="data-table-pagination"
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      <span className="text-sm text-muted-foreground">
        Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          type="button"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          {previousLabel}
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}

DataTablePagination.displayName = 'DataTable.Pagination';

/**
 * Generic data table built on TanStack Table v8 and the design-system
 * `Table` primitive. Compose with **`DataTable.Provider`** + **`DataTable.Root`**,
 * and optionally **`DataTable.Toolbar`** / **`DataTable.Pagination`** as children.
 * Custom toolbar/pagination cells access the underlying TanStack `Table` via
 * **`useDataTable<T>()`**.
 */
export const DataTable = {
  Provider: DataTableProvider,
  Root: DataTableRoot,
  Toolbar: DataTableToolbar,
  Pagination: DataTablePagination,
};
