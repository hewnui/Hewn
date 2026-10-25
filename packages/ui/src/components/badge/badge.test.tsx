import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge component", () => {
  it("renders children with default variant", () => {
    render(<Badge>New Feature</Badge>);
    expect(screen.getByText("New Feature")).toBeDefined();
  });

  it("renders dot variant", () => {
    render(<Badge variant="dot" color="success">Live</Badge>);
    expect(screen.getByText("Live")).toBeDefined();
  });
});
