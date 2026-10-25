"use client";

import {
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@hewnui/ui";

const crew = [
  {
    id: "1",
    name: "Nova Hale",
    initials: "NH",
    role: "On-call",
    load: "47.2%",
  },
  {
    id: "2",
    name: "Riven Cole",
    initials: "RC",
    role: "Design",
    load: "62.8%",
  },
  {
    id: "3",
    name: "Mira Solis",
    initials: "MS",
    role: "Finance",
    load: "31.5%",
  },
  {
    id: "4",
    name: "Kai Vesper",
    initials: "KV",
    role: "Platform",
    load: "54.1%",
  },
] as const;

export function StudioDashboardDataPanel() {
  return (
    <aside className="space-y-5 border-t border-border bg-muted/20 p-5 md:p-6 lg:border-t-0 lg:border-l">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Deploy pipeline
        </p>
        <Progress label="Canary rollout" value={62} className="mt-3" />
        <p className="mt-2 text-xs text-muted-foreground">
          Stage 2 of 4 · eu-west holding at{" "}
          <span className="font-mono tabular-nums text-foreground">14%</span>
        </p>
      </div>
      <div>
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Crew load
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            Now
          </span>
        </div>
        <Table aria-label="Crew roster">
          <TableHeader>
            <TableColumn isRowHeader>Name</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Load</TableColumn>
          </TableHeader>
          <TableBody items={[...crew]}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="grid size-7 place-items-center rounded-full bg-accent/15 text-[10px] font-semibold text-accent"
                      aria-hidden
                    >
                      {item.initials}
                    </span>
                    <span>{item.name}</span>
                  </span>
                </TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <span className="font-mono tabular-nums">{item.load}</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </aside>
  );
}
