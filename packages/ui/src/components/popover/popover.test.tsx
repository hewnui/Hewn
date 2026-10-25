import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "../button";
import { renderWithProviders } from "../../test/render";
import { Popover, PopoverBody, PopoverTitle, PopoverTrigger } from "./popover";

afterEach(() => cleanup());

describe("Popover", () => {
  it("opens anchored content from a trigger", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <PopoverTrigger>
        <Button>Details</Button>
        <Popover>
          <PopoverTitle>Latency</PopoverTitle>
          <PopoverBody>Median response is 47.2ms.</PopoverBody>
        </Popover>
      </PopoverTrigger>,
    );
    await user.click(screen.getByRole("button", { name: "Details" }));
    expect(await screen.findByRole("dialog")).toBeTruthy();
    expect(screen.getByText("Median response is 47.2ms.")).toBeTruthy();
  });
});
