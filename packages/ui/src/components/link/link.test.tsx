import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Link } from "./link";

afterEach(() => cleanup());

describe("Link", () => {
  it("renders an accessible link", () => {
    renderWithProviders(
      <Link href="/docs/getting-started">Getting started</Link>,
    );
    expect(
      screen.getByRole("link", { name: "Getting started" }),
    ).toBeTruthy();
  });
});
