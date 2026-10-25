import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, it } from "vitest";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { ColorPicker } from "../components/color-picker";
import {
  CommandPalette,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteTrigger,
} from "../components/command-palette";
import { DateRangePicker } from "../components/date-range-picker";
import { DonutChart } from "../components/donut-chart";
import { Empty } from "../components/empty";
import { Pagination } from "../components/pagination";
import { Stepper, StepperStep } from "../components/stepper";
import { TagField, TagFieldItem } from "../components/tag-field";
import { expectNoA11yViolations } from "./a11y";
import { renderWithProviders } from "./render";

afterEach(() => cleanup());

describe("a11y launch components", () => {
  it("Card", async () => {
    const { container } = renderWithProviders(
      <Card>
        <Card.Header>Latency</Card.Header>
        <Card.Body>p95 is 211ms.</Card.Body>
      </Card>,
    );
    await expectNoA11yViolations(container);
  });

  it("Empty", async () => {
    const { container } = renderWithProviders(
      <Empty title="No jobs">Queue is clear.</Empty>,
    );
    await expectNoA11yViolations(container);
  });

  it("DonutChart", async () => {
    const { container } = renderWithProviders(
      <DonutChart
        summary="Traffic share"
        slices={[
          { id: "edge", label: "Edge", value: 62 },
          { id: "origin", label: "Origin", value: 38 },
        ]}
      />,
    );
    await expectNoA11yViolations(container);
  });

  it("TagField", async () => {
    const { container } = renderWithProviders(
      <TagField label="Skills" placeholder="Add skill">
        <TagFieldItem id="react">React</TagFieldItem>
        <TagFieldItem id="svelte">Svelte</TagFieldItem>
      </TagField>,
    );
    await expectNoA11yViolations(container);
  });

  it("Pagination", async () => {
    const { container } = renderWithProviders(
      <Pagination total={8} defaultPage={3} />,
    );
    await expectNoA11yViolations(container);
  });

  it("CommandPalette open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <CommandPaletteTrigger>
        <Button>Open commands</Button>
        <CommandPalette>
          <CommandPaletteInput />
          <CommandPaletteList>
            <CommandPaletteGroup heading="Actions">
              <CommandPaletteItem id="new-file" textValue="New file">
                New file
              </CommandPaletteItem>
            </CommandPaletteGroup>
          </CommandPaletteList>
        </CommandPalette>
      </CommandPaletteTrigger>,
    );
    await user.click(screen.getByRole("button", { name: "Open commands" }));
    await expectNoA11yViolations(container);
  });

  it("Stepper", async () => {
    const { container } = renderWithProviders(
      <Stepper currentIndex={1} aria-label="Checkout">
        <StepperStep>Account</StepperStep>
        <StepperStep>Shipping</StepperStep>
        <StepperStep>Payment</StepperStep>
      </Stepper>,
    );
    await expectNoA11yViolations(container);
  });

  it("DateRangePicker", async () => {
    const { container } = renderWithProviders(
      <DateRangePicker label="Travel dates" />,
    );
    await expectNoA11yViolations(container);
  });

  it("ColorPicker", async () => {
    const { container } = renderWithProviders(
      <ColorPicker label="Brand accent" defaultValue="#1a6b4a" />,
    );
    await expectNoA11yViolations(container);
  });
});
