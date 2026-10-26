import { parseDate } from "@internationalized/date";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/render";
import { DatePicker } from "./date-picker";
import type { DatePickerProps, DateValue } from "./date-picker.types";

afterEach(() => cleanup());

describe("DatePicker", () => {
  it("renders a labeled date field", () => {
    renderWithProviders(<DatePicker label="Ship date" />);
    expect(screen.getByRole("group", { name: "Ship date" })).toBeTruthy();
  });

  it("accepts value, defaultValue, onChange, and name", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: DateValue | null) => void>();
    const props: DatePickerProps = {
      label: "Due date",
      name: "due",
      defaultValue: parseDate("2026-10-26"),
      onChange,
    };

    const { rerender } = renderWithProviders(<DatePicker {...props} />);
    expect(screen.getByRole("group", { name: "Due date" })).toBeTruthy();

    // Hidden form input carries the field name for native submit.
    const named = document.querySelector('input[name="due"]');
    expect(named).toBeTruthy();
    expect((named as HTMLInputElement).value).toContain("2026");

    rerender(
      <DatePicker
        label="Due date"
        name="due"
        value={parseDate("2026-11-01")}
        onChange={onChange}
      />,
    );
    expect((document.querySelector('input[name="due"]') as HTMLInputElement).value)
      .toContain("2026-11-01");

    // Interact so onChange is exercised through the Aria field.
    const spinbuttons = screen.getAllByRole("spinbutton");
    await user.click(spinbuttons[0]!);
    await user.keyboard("{ArrowUp}");
    expect(onChange).toHaveBeenCalled();
  });
});
