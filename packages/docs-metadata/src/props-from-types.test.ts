import { describe, expect, it } from "vitest";
import {
  extractPropsFromComponentSource,
  extractPropsFromTypesSource,
  extractPropsMapsFromSource,
} from "./props-from-types";

describe("extractPropsFromTypesSource", () => {
  it("reads intersection local fields", () => {
    const props = extractPropsFromTypesSource(`
      import type { ReactNode } from "react";
      export type SliderProps = Omit<AriaSliderProps, "className"> & {
        label?: ReactNode;
        showOutput?: boolean;
        className?: string;
      };
    `);
    expect(props.map((prop) => prop.name)).toEqual([
      "label",
      "showOutput",
      "className",
    ]);
    expect(props.find((prop) => prop.name === "showOutput")?.type).toBe(
      "boolean",
    );
  });

  it("marks required fields without question tokens", () => {
    const props = extractPropsFromTypesSource(`
      export type BoxProps = {
        children: ReactNode;
        className?: string;
      };
    `);
    expect(props.find((prop) => prop.name === "children")?.required).toBe(true);
    expect(props.find((prop) => prop.name === "className")?.required).toBe(
      undefined,
    );
  });

  it("filters to the primary export when exportName is set", () => {
    const source = `
      export type CommandPaletteProps = { children: ReactNode; className?: string };
      export type CommandPaletteItemProps = { id: string; heading: ReactNode };
    `;
    const root = extractPropsFromTypesSource(source, "CommandPalette");
    expect(root.map((prop) => prop.name).sort()).toEqual([
      "children",
      "className",
    ]);
    const maps = extractPropsMapsFromSource(source);
    expect(maps.get("CommandPaletteItemProps")?.map((prop) => prop.name)).toEqual([
      "id",
      "heading",
    ]);
  });
});

describe("extractPropsFromComponentSource", () => {
  it("reads inline destructured prop object types", () => {
    const props = extractPropsFromComponentSource(
      `
      export function DataTable<T extends object>({
        "aria-label": ariaLabel,
        columns,
        data,
      }: {
        "aria-label": string;
        columns: ColumnDef<T, unknown>[];
        data: T[];
        getRowId?: (row: T, index: number) => string;
      }) {
        return null;
      }
      `,
      "DataTable",
    );
    expect(props.map((prop) => prop.name).sort()).toEqual([
      "aria-label",
      "columns",
      "data",
      "getRowId",
    ]);
    expect(props.find((prop) => prop.name === "aria-label")?.required).toBe(
      true,
    );
  });

  it("reads a local Omit intersection alias in the same file", () => {
    const props = extractPropsFromComponentSource(
      `
      type SelectProps = Omit<AriaSelectProps<object>, "children" | "className"> & {
        children: ReactNode;
        className?: string;
        label?: ReactNode;
        variant?: SelectVariant;
      };
      export function Select(props: SelectProps) {
        return null;
      }
      `,
      "Select",
    );
    expect(props.map((prop) => prop.name).sort()).toEqual([
      "children",
      "className",
      "label",
      "variant",
    ]);
  });
});
