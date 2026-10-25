"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "../table";

export function DataTable<T extends object>({
  "aria-label": ariaLabel,
  columns,
  data,
  getRowId,
}: {
  "aria-label": string;
  columns: ColumnDef<T, unknown>[];
  data: T[];
  getRowId?: (row: T, index: number) => string;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(getRowId ? { getRowId } : {}),
  });

  const active = sorting[0];

  return (
    <Table
      aria-label={ariaLabel}
      {...(active
        ? {
            sortDescriptor: {
              column: active.id,
              direction: active.desc ? ("descending" as const) : ("ascending" as const),
            },
          }
        : {})}
      onSortChange={(descriptor) =>
        setSorting([
          {
            id: String(descriptor.column),
            desc: descriptor.direction === "descending",
          },
        ])
      }
    >
      <TableHeader>
        {table.getHeaderGroups()[0]?.headers.map((header) => (
          <TableColumn
            key={header.id}
            id={header.id}
            isRowHeader={header.index === 0}
            allowsSorting={header.column.getCanSort()}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} id={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
