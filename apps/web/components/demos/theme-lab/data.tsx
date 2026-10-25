"use client";

import {
  Sparkline,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@hewnui/ui";
import { ThemeLabSection } from "./section";

const rows = [
  { id: "1", name: "Nova Hale", role: "Ops", load: "47.2%" },
  { id: "2", name: "Riven Cole", role: "Design", load: "62.8%" },
  { id: "3", name: "Mira Solis", role: "Finance", load: "31.5%" },
];

const spark = [12, 18, 14, 22, 19, 28, 24, 31, 27, 34];

export function ThemeLabData() {
  return (
    <div className="space-y-6">
      <ThemeLabSection
        title="Metric strip"
        description="Tabular numerals and sparklines share accent without extra chart chrome."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Requests", value: "128,402" },
            { label: "p95 latency", value: "184ms" },
            { label: "Error rate", value: "0.38%" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-[var(--kp-radius-md)] border border-border bg-surface px-4 py-3"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 font-mono text-xl font-medium tabular-nums text-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 rounded-[var(--kp-radius-md)] border border-border bg-surface px-4 py-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Throughput trend
            </p>
            <p className="mt-1 font-mono text-lg font-medium tabular-nums text-foreground">
              +12.4%
            </p>
          </div>
          <Sparkline
            data={spark}
            summary="Throughput trend over the last ten intervals"
            width={180}
            height={44}
          />
        </div>
      </ThemeLabSection>

      <ThemeLabSection
        title="Table"
        description="Row hover, borders, and header weight follow the active pack."
      >
        <Table aria-label="Theme Lab roster">
          <TableHeader>
            <TableColumn isRowHeader>Name</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Load</TableColumn>
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <span className="font-mono tabular-nums">{item.load}</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ThemeLabSection>
    </div>
  );
}
