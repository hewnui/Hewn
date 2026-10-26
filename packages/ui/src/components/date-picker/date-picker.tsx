"use client";

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import { fieldTriggerClass, popoverSurfaceClass } from "../../styles/overlays";
import { cn } from "../../utils/cn";
import type { DatePickerProps } from "./date-picker.types";

export type { DatePickerProps } from "./date-picker.types";

export function DatePicker({
  className,
  label = "Date",
  ...props
}: DatePickerProps) {
  return (
    <AriaDatePicker
      {...props}
      className={cn("flex w-full max-w-sm flex-col gap-1.5 text-sm", className)}
    >
      <Label className="font-medium">{label}</Label>
      <Group className={fieldTriggerClass} data-kp-surface>
        <DateInput className="flex flex-1 gap-0.5 tabular-nums outline-none">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="rounded px-0.5 outline-none data-[placeholder]:text-muted-foreground data-[focused]:bg-muted"
            />
          )}
        </DateInput>
        <Button className="min-h-10 min-w-10 rounded-[var(--kp-radius-sm)] text-muted-foreground outline-none data-[pressed]:scale-[0.96] data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring">
          ▢
        </Button>
      </Group>
      <Popover className={cn(popoverSurfaceClass, "p-3")} data-kp-surface>
        <Dialog className="outline-none">
          <Calendar className="text-sm">
            <header className="mb-3 flex items-center justify-between gap-2">
              <Button
                slot="previous"
                className="min-h-10 min-w-10 rounded-[var(--kp-radius-sm)] outline-none data-[pressed]:scale-[0.96] data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring"
              >
                ‹
              </Button>
              <Heading className="text-sm font-semibold" />
              <Button
                slot="next"
                className="min-h-10 min-w-10 rounded-[var(--kp-radius-sm)] outline-none data-[pressed]:scale-[0.96] data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring"
              >
                ›
              </Button>
            </header>
            <CalendarGrid className="w-full border-separate border-spacing-1">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="size-9 text-xs font-medium text-muted-foreground">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="size-9 rounded-[var(--kp-radius-sm)] text-center outline-none tabular-nums data-[hovered]:bg-muted data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[disabled]:opacity-35 data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
}
