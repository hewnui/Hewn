import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Empty } from "./empty";

describe("Empty", () => {
  it("announces as a status region", () => {
    render(<Empty title="No jobs">Queue is clear.</Empty>);
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText("No jobs")).toBeTruthy();
  });
});
