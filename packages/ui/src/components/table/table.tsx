"use client";

import type { ReactNode } from "react";
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  type CellProps,
  type ColumnProps,
  type RowProps,
  type TableBodyProps,
  type TableHeaderProps,
  type TableProps,
} from "react-aria-components";
import { cn } from "../../utils/cn";
import { Spinner } from "../spinner";
import { SortGlyph } from "./table-sort-glyph";
import {
  tableCellClass,
  tableColumnClass,
  tableEmptyClass,
  tableHeaderClass,
  tableLoadingClass,
  tableRootClass,
  tableRowClass,
  tableShellClass,
} from "./table.styles";

export function Table({
  children,
  className,
  ...props
}: Omit<TableProps, "className" | "children"> & {
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div data-kp-surface className={tableShellClass()}>
      <AriaTable {...props} className={tableRootClass(className)}>
        {children}
      </AriaTable>
    </div>
  );
}

export function TableHeader<T extends object>({
  children,
  className,
  ...props
}: Omit<TableHeaderProps<T>, "className" | "children"> & {
  children: TableHeaderProps<T>["children"];
  className?: string | undefined;
}) {
  return (
    <AriaTableHeader
      {...props}
      className={cn(tableHeaderClass, className)}
    >
      {children}
    </AriaTableHeader>
  );
}

export function TableColumn({
  children,
  className,
  ...props
}: Omit<ColumnProps, "className" | "children"> & {
  children?: ReactNode;
  className?: string | undefined;
}) {
  return (
    <AriaColumn {...props} className={tableColumnClass(className)}>
      {({ allowsSorting, sortDirection }) => (
        <span className="inline-flex items-center gap-1.5">
          {children}
          {allowsSorting ? <SortGlyph direction={sortDirection} /> : null}
        </span>
      )}
    </AriaColumn>
  );
}

export function TableBody<T extends object>({
  children,
  className,
  ...props
}: Omit<TableBodyProps<T>, "className" | "children"> & {
  children: TableBodyProps<T>["children"];
  className?: string | undefined;
}) {
  return (
    <AriaTableBody
      {...props}
      {...(className !== undefined ? { className } : {})}
    >
      {children}
    </AriaTableBody>
  );
}

export function TableRow<T extends object>({
  children,
  className,
  ...props
}: Omit<RowProps<T>, "className" | "children"> & {
  children: RowProps<T>["children"];
  className?: string | undefined;
}) {
  return (
    <AriaRow {...props} className={tableRowClass(className)}>
      {children}
    </AriaRow>
  );
}

export function TableCell({
  children,
  className,
  ...props
}: Omit<CellProps, "className" | "children"> & {
  children?: ReactNode;
  className?: string | undefined;
}) {
  return (
    <AriaCell {...props} className={tableCellClass(className)}>
      {children}
    </AriaCell>
  );
}

export function TableEmpty({
  children = "No rows to show.",
  title = "Empty",
}: {
  children?: ReactNode;
  title?: ReactNode;
}) {
  return (
    <div className={tableEmptyClass} role="status">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground text-pretty">
        {children}
      </p>
    </div>
  );
}

export function TableLoading({
  children = "Loading rows…",
}: {
  children?: ReactNode;
}) {
  return (
    <div className={tableLoadingClass} role="status" aria-live="polite">
      <div className="flex w-full flex-col gap-3 px-4 py-2">
        <div className="flex items-center justify-center gap-2 text-sm text-foreground">
          <Spinner className="text-accent" />
          <span>{children}</span>
        </div>
        <div className="space-y-2" aria-hidden>
          <div className="h-9 animate-pulse rounded-[var(--kp-radius-md)] bg-[color-mix(in_oklch,var(--kp-muted)_85%,var(--kp-foreground)_8%)]" />
          <div className="h-9 animate-pulse rounded-[var(--kp-radius-md)] bg-[color-mix(in_oklch,var(--kp-muted)_70%,var(--kp-foreground)_6%)]" />
          <div className="h-9 animate-pulse rounded-[var(--kp-radius-md)] bg-[color-mix(in_oklch,var(--kp-muted)_55%,var(--kp-foreground)_5%)]" />
        </div>
      </div>
    </div>
  );
}
