import { cleanup } from "@testing-library/react";
import type { ColumnDef } from "@tanstack/react-table";
import { afterEach, describe, it } from "vitest";
import { AreaChart } from "../components/area-chart";
import { Badge } from "../components/badge";
import { BarChart } from "../components/bar-chart";
import { Breadcrumb, Breadcrumbs } from "../components/breadcrumbs";
import { Button } from "../components/button";
import { DataTable } from "../components/data-table";
import { LineChart } from "../components/line-chart";
import { Link } from "../components/link";
import { Skeleton } from "../components/skeleton";
import { Sparkline } from "../components/sparkline";
import { Spinner } from "../components/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "../components/table";
import { Tab, TabList, TabPanel, Tabs } from "../components/tabs";
import { expectNoA11yViolations } from "./a11y";
import { renderWithProviders } from "./render";

afterEach(() => cleanup());

const series = [
  {
    id: "a",
    label: "Revenue",
    data: [
      { x: "Mon", y: 12 },
      { x: "Tue", y: 18 },
      { x: "Wed", y: 15 },
    ],
  },
];

type Row = { id: string; name: string; score: number };
const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "score", header: "Score" },
];

describe("a11y display", () => {
  it("Button", async () => {
    const { container } = renderWithProviders(<Button>Save changes</Button>);
    await expectNoA11yViolations(container);
  });

  it("Badge", async () => {
    const { container } = renderWithProviders(<Badge>New</Badge>);
    await expectNoA11yViolations(container);
  });

  it("Link", async () => {
    const { container } = renderWithProviders(
      <Link href="/docs/getting-started">Getting started</Link>,
    );
    await expectNoA11yViolations(container);
  });

  it("Skeleton", async () => {
    const { container } = renderWithProviders(<Skeleton />);
    await expectNoA11yViolations(container);
  });

  it("Spinner", async () => {
    const { container } = renderWithProviders(<Spinner />);
    await expectNoA11yViolations(container);
  });

  it("Breadcrumbs", async () => {
    const { container } = renderWithProviders(
      <Breadcrumbs>
        <Breadcrumb href="/docs">Docs</Breadcrumb>
        <Breadcrumb>Button</Breadcrumb>
      </Breadcrumbs>,
    );
    await expectNoA11yViolations(container);
  });

  it("Tabs", async () => {
    const { container } = renderWithProviders(
      <Tabs defaultSelectedKey="overview">
        <TabList aria-label="Sections">
          <Tab id="overview">Overview</Tab>
          <Tab id="tokens">Tokens</Tab>
        </TabList>
        <TabPanel id="overview">Overview content</TabPanel>
        <TabPanel id="tokens">Token content</TabPanel>
      </Tabs>,
    );
    await expectNoA11yViolations(container);
  });

  it("Table", async () => {
    const { container } = renderWithProviders(
      <Table aria-label="Team">
        <TableHeader>
          <TableColumn isRowHeader>Name</TableColumn>
          <TableColumn>Role</TableColumn>
        </TableHeader>
        <TableBody items={[{ id: "1", name: "Nova", role: "Ops" }]}>
          {(item) => (
            <TableRow id={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.role}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>,
    );
    await expectNoA11yViolations(container);
  });

  it("DataTable", async () => {
    const { container } = renderWithProviders(
      <DataTable
        aria-label="Scores"
        columns={columns}
        data={[{ id: "1", name: "Nova", score: 92 }]}
        getRowId={(row) => row.id}
      />,
    );
    await expectNoA11yViolations(container);
  });

  it("Sparkline", async () => {
    const { container } = renderWithProviders(
      <Sparkline data={[2, 4, 3, 8]} summary="Weekly signups trend" />,
    );
    await expectNoA11yViolations(container);
  });

  it("LineChart", async () => {
    const { container } = renderWithProviders(
      <LineChart series={series} summary="Revenue this week" />,
    );
    await expectNoA11yViolations(container);
  });

  it("AreaChart", async () => {
    const { container } = renderWithProviders(
      <AreaChart series={series} summary="Revenue area" />,
    );
    await expectNoA11yViolations(container);
  });

  it("BarChart", async () => {
    const { container } = renderWithProviders(
      <BarChart series={series} summary="Revenue bars" />,
    );
    await expectNoA11yViolations(container);
  });
});
