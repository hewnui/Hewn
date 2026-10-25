"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableEmpty,
  TableHeader,
  TableLoading,
  TableRow,
  type SortDescriptor,
} from "@hewnui/ui";

type Person = {
  id: string;
  name: string;
  role: string;
  score: number;
};

const seed: Person[] = [
  { id: "1", name: "Nova Hale", role: "Ops", score: 92 },
  { id: "2", name: "Riven Cole", role: "Design", score: 88 },
  { id: "3", name: "Mira Quill", role: "Engineering", score: 95 },
];

export function TableDemo() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [mode, setMode] = useState<"data" | "empty" | "loading">("loading");

  const rows = useMemo(() => {
    const next = [...seed];
    const column = String(sortDescriptor.column);
    next.sort((a, b) => {
      const left = a[column as keyof Person];
      const right = b[column as keyof Person];
      const cmp = left === right ? 0 : left < right ? -1 : 1;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
    return next;
  }, [sortDescriptor]);

  return (
    <div className="not-prose my-6 space-y-4">
      <div
        role="group"
        aria-label="Table sample state"
        className="inline-flex flex-wrap gap-0.5 rounded-[var(--kp-radius-md)] border bg-muted/50 p-1"
      >
        {(["data", "empty", "loading"] as const).map((value) => {
          const active = mode === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setMode(value)}
              className={
                active
                  ? "min-h-10 rounded-[calc(var(--kp-radius-md)-0.15rem)] bg-accent px-3 text-xs font-medium capitalize text-accent-foreground shadow-[var(--kp-shadow-surface)] transition-[transform,background-color] active:scale-[0.96]"
                  : "min-h-10 rounded-[calc(var(--kp-radius-md)-0.15rem)] px-3 text-xs font-medium capitalize text-muted-foreground transition-[transform,background-color,color] hover:bg-muted hover:text-foreground active:scale-[0.96]"
              }
            >
              {value}
            </button>
          );
        })}
      </div>

      {mode === "loading" ? (
        <div
          data-kp-surface
          className="rounded-[var(--kp-radius-lg)] border shadow-[var(--kp-shadow-surface)]"
        >
          <TableLoading />
        </div>
      ) : null}

      {mode === "empty" ? (
        <div
          data-kp-surface
          className="rounded-[var(--kp-radius-lg)] border shadow-[var(--kp-shadow-surface)]"
        >
          <TableEmpty title="No teammates yet">
            Invite collaborators to populate this table.
          </TableEmpty>
        </div>
      ) : null}

      {mode === "data" ? (
        <Table
          aria-label="Team roster"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <TableHeader>
            <TableColumn id="name" isRowHeader allowsSorting>
              Name
            </TableColumn>
            <TableColumn id="role" allowsSorting>
              Role
            </TableColumn>
            <TableColumn id="score" allowsSorting>
              Score
            </TableColumn>
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.score}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
