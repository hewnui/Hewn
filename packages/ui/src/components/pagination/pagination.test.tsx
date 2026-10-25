import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Pagination } from "./pagination";
import { getPaginationItems } from "./pagination.utils";

afterEach(() => cleanup());

describe("getPaginationItems", () => {
  it("inserts ellipsis for large page counts", () => {
    const items = getPaginationItems(5, 20, 1, 1);
    expect(items.some((item) => item.type === "ellipsis")).toBe(true);
    expect(items.find((item) => item.type === "page" && item.page === 5)).toBeTruthy();
  });

  it("lists every page when the total is small", () => {
    const items = getPaginationItems(2, 3, 1, 1);
    expect(items.every((item) => item.type === "page")).toBe(true);
    expect(items).toHaveLength(3);
  });
});

describe("Pagination", () => {
  it("renders a navigation landmark with the current page", () => {
    renderWithProviders(<Pagination total={8} defaultPage={3} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Go to page 3" }).getAttribute(
        "aria-current",
      ),
    ).toBe("page");
  });

  it("supports uncontrolled page changes with previous and next", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    renderWithProviders(
      <Pagination total={5} defaultPage={2} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Go to next page" }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: "Go to previous page" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("supports controlled page selection", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    renderWithProviders(
      <Pagination total={6} page={1} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Go to page 4" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
    expect(
      screen.getByRole("button", { name: "Go to page 1" }).getAttribute(
        "aria-current",
      ),
    ).toBe("page");
  });

  it("supports keyboard activation on page controls", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    renderWithProviders(
      <Pagination total={4} defaultPage={1} onPageChange={onPageChange} />,
    );

    const page2 = screen.getByRole("button", { name: "Go to page 2" });
    page2.focus();
    await user.keyboard("{Enter}");
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("renders SEO-friendly links when getHref is provided", () => {
    renderWithProviders(
      <Pagination
        total={4}
        defaultPage={2}
        getHref={(page) => `/docs?page=${page}`}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Go to page 1" }).getAttribute("href"),
    ).toBe("/docs?page=1");
    expect(
      screen.getByRole("link", { name: "Go to previous page" }).getAttribute(
        "href",
      ),
    ).toBe("/docs?page=1");
    expect(
      screen.getByRole("link", { name: "Go to next page" }).getAttribute("href"),
    ).toBe("/docs?page=3");
  });
});
