import { describe, expect, it } from "vitest";
import { extractPropsFromTypesSource } from "./props-from-types";

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
});
