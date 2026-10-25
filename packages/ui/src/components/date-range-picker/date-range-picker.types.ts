import type { CalendarDate, DateValue } from "@internationalized/date";
import type { ReactNode } from "react";
import type {
  DateRangePickerProps as AriaDateRangePickerProps,
} from "react-aria-components";

/** Inclusive start/end date pair used by React Aria range pickers. */
export type DateRangeValue<T = CalendarDate> = {
  start: T;
  end: T;
};

export type DateRangePresetId =
  | "today"
  | "last-7-days"
  | "last-30-days"
  | "this-month";

export type DateRangePreset = {
  id: string;
  label: string;
  getRange: () => DateRangeValue<CalendarDate>;
};

export type DateRangePickerProps = Omit<
  AriaDateRangePickerProps<DateValue>,
  "className" | "children"
> & {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
  /** Show quick-select presets in the popover. Defaults to true. */
  showPresets?: boolean;
  /**
   * Built-in preset ids to show, or custom presets.
   * Defaults to Today, Last 7 days, Last 30 days, This month.
   */
  presets?: DateRangePresetId[] | DateRangePreset[];
};

export type { DateValue, CalendarDate };
