import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { DateRangePicker } from "./date-range-picker";

afterEach(() => cleanup());

function getCalendarTrigger(label: string) {
  const group = screen.getByRole("group", { name: label });
  return within(group).getByRole("button");
}

describe("DateRangePicker", () => {
  it("renders a labeled start and end date group", () => {
    renderWithProviders(
      <DateRangePicker
        label="Travel dates"
        description="Inclusive stay"
        startName="start"
        endName="end"
      />,
    );
    expect(screen.getByRole("group", { name: "Travel dates" })).toBeTruthy();
    expect(screen.getByText("Inclusive stay")).toBeTruthy();
  });

  it("opens the range calendar with keyboard and shows presets", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <DateRangePicker label="Report range" showPresets />,
    );

    const trigger = getCalendarTrigger("Report range");
    trigger.focus();
    await user.keyboard("{Enter}");

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("grid")).toBeTruthy();
    expect(within(dialog).getByRole("button", { name: "Today" })).toBeTruthy();
    expect(
      within(dialog).getByRole("button", { name: "Last 7 days" }),
    ).toBeTruthy();
  });

  it("hides presets when showPresets is false", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <DateRangePicker label="Quiet range" showPresets={false} />,
    );

    await user.click(getCalendarTrigger("Quiet range"));
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).queryByRole("button", { name: "Today" })).toBeNull();
  });

  it("applies a preset from the popover", async () => {
    const user = userEvent.setup();
    let latest: unknown;
    renderWithProviders(
      <DateRangePicker
        label="Preset range"
        onChange={(value) => {
          latest = value;
        }}
      />,
    );

    await user.click(getCalendarTrigger("Preset range"));
    await user.click(await screen.findByRole("button", { name: "Today" }));
    expect(latest).toBeTruthy();
    expect(
      (latest as { start: { toString(): string }; end: { toString(): string } })
        .start.toString(),
    ).toEqual(
      (
        latest as { start: { toString(): string }; end: { toString(): string } }
      ).end.toString(),
    );
  });
});
