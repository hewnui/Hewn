import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Switch } from "./switch";

afterEach(() => cleanup());

describe("Switch", () => {
  it("renders accessible switch", () => {
    renderWithProviders(<Switch>Motion</Switch>);
    expect(screen.getByRole("switch", { name: "Motion" })).toBeTruthy();
  });
});
