import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import type { ColumnDef } from "@tanstack/react-table";
import { renderWithProviders } from "../../test/render";
import { DataTable } from "./data-table";

type Row = { id: string; name: string; score: number };

const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "score", header: "Score" },
];

afterEach(() => cleanup());

describe("DataTable", () => {
  it("renders tanstack-backed rows", () => {
    renderWithProviders(
      <DataTable
        aria-label="Scores"
        columns={columns}
        data={[
          { id: "1", name: "Nova", score: 92 },
          { id: "2", name: "Riven", score: 88 },
        ]}
        getRowId={(row) => row.id}
      />,
    );
    expect(screen.getByRole("grid", { name: "Scores" })).toBeTruthy();
    expect(screen.getByText("Nova")).toBeTruthy();
  });

  it("exposes sort direction to assistive tech", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <DataTable
        aria-label="Scores"
        columns={columns}
        data={[
          { id: "1", name: "Nova", score: 92 },
          { id: "2", name: "Riven", score: 88 },
        ]}
        getRowId={(row) => row.id}
      />,
    );

    const score = screen.getByRole("columnheader", { name: /score/i });
    expect(score.getAttribute("aria-sort")).toBe("none");

    await user.click(score);
    expect(score.getAttribute("aria-sort")).toBe("ascending");
  });
});
