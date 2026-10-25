"use client";

import { DataTable, type ColumnDef } from "@hewnui/ui";

type Row = { id: string; name: string; role: string; score: number };

const data: Row[] = [
  { id: "1", name: "Nova Hale", role: "Ops", score: 92 },
  { id: "2", name: "Riven Cole", role: "Design", score: 88 },
  { id: "3", name: "Mira Quill", role: "Engineering", score: 95 },
];

const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "score", header: "Score" },
];

export function DataTableDemo() {
  return (
    <div className="not-prose my-6">
      <DataTable
        aria-label="Advanced roster"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
