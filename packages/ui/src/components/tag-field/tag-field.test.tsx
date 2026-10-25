import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/render";
import { TagField, TagFieldItem } from "./tag-field";

afterEach(() => cleanup());

function Field(props: {
  defaultValue?: string[];
  value?: string[];
  maxSelections?: number;
  onChange?: (value: Array<string | number>) => void;
  name?: string;
}) {
  return (
    <TagField label="Skills" placeholder="Add skill" {...props}>
      <TagFieldItem id="react">React</TagFieldItem>
      <TagFieldItem id="vue" isDisabled>
        Vue
      </TagFieldItem>
      <TagFieldItem id="svelte">Svelte</TagFieldItem>
      <TagFieldItem id="solid">Solid</TagFieldItem>
    </TagField>
  );
}

async function openList(user: ReturnType<typeof userEvent.setup>) {
  const input = screen.getByRole("combobox", { name: "Skills" });
  await user.click(input);
  await user.keyboard("{ArrowDown}");
}

describe("TagField", () => {
  it("renders a labeled combobox", () => {
    renderWithProviders(<Field />);
    expect(screen.getByRole("combobox", { name: "Skills" })).toBeTruthy();
  });

  it("selects options from the listbox and shows removable tags", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(<Field onChange={onChange} />);

    await openList(user);
    await user.click(screen.getByRole("option", { name: "React" }));

    expect(onChange).toHaveBeenCalledWith(["react"]);
    await user.keyboard("{Escape}");
    expect(screen.getByText("React")).toBeTruthy();
    expect(document.querySelector('[slot="remove"]')).toBeTruthy();
  });

  it("removes the last tag with Backspace on an empty input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(
      <Field defaultValue={["react", "svelte"]} onChange={onChange} />,
    );

    const input = screen.getByRole("combobox", { name: "Skills" });
    await user.click(input);
    await user.keyboard("{Backspace}");

    expect(onChange).toHaveBeenCalledWith(["react"]);
  });

  it("moves focus between tags with arrow keys", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Field defaultValue={["react", "svelte"]} />);

    const group = screen.getByRole("grid", { name: "Selected" });
    const tags = within(group).getAllByRole("row");
    await user.click(tags[0]!);
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(tags[1]);
  });

  it("respects maxSelections", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(
      <Field defaultValue={["react"]} maxSelections={1} onChange={onChange} />,
    );

    await openList(user);
    await user.click(screen.getByRole("option", { name: "Svelte" }));
    const calls = onChange.mock.calls.map((call) => call[0] as string[]);
    expect(calls.every((keys) => keys.length <= 1)).toBe(true);
    expect(
      calls.some((keys) => keys.includes("svelte") && keys.includes("react")),
    ).toBe(false);
  });

  it("supports controlled selection and disabled items", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(<Field value={["solid"]} onChange={onChange} />);

    await openList(user);
    expect(
      screen.getByRole("option", { name: "Vue" }).getAttribute("aria-disabled"),
    ).toBe("true");
    await user.click(screen.getByRole("option", { name: "React" }));
    expect(onChange).toHaveBeenCalledWith(["solid", "react"]);
  });
});
