import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Breadcrumb, Breadcrumbs } from "./breadcrumbs";

afterEach(() => cleanup());

describe("Breadcrumbs", () => {
  it("renders a navigation trail with the current page", () => {
    renderWithProviders(
      <Breadcrumbs>
        <Breadcrumb href="/docs">Docs</Breadcrumb>
        <Breadcrumb href="/docs/components">Components</Breadcrumb>
        <Breadcrumb>Button</Breadcrumb>
      </Breadcrumbs>,
    );
    expect(screen.getByLabelText("Breadcrumbs")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Docs" })).toBeTruthy();
    expect(screen.getByText("Button")).toBeTruthy();
  });
});
