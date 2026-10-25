import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableEmpty,
  TableHeader,
  TableRow,
} from "./table";

afterEach(() => cleanup());

const rows = [
  { id: "1", name: "Nova Hale", role: "Ops" },
  { id: "2", name: "Riven Cole", role: "Design" },
];

describe("Table", () => {
  it("renders column headers and cells", () => {
    renderWithProviders(
      <Table aria-label="Team">
        <TableHeader>
          <TableColumn isRowHeader>Name</TableColumn>
          <TableColumn>Role</TableColumn>
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow id={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.role}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("grid", { name: "Team" })).toBeTruthy();
    expect(screen.getByText("Nova Hale")).toBeTruthy();
    expect(screen.getByText("Design")).toBeTruthy();
  });

  it("renders empty state", () => {
    renderWithProviders(<TableEmpty title="No teammates">Invite someone.</TableEmpty>);
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText("No teammates")).toBeTruthy();
  });
});
