import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { SearchField } from "./search-field";

afterEach(() => cleanup());

describe("SearchField", () => {
  it("renders a labeled search input", () => {
    renderWithProviders(
      <SearchField label="Find projects" placeholder="Name or owner" />,
    );
    expect(screen.getByLabelText("Find projects")).toBeTruthy();
  });
});
