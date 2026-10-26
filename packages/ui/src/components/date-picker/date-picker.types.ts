import type { CalendarDate, DateValue } from "@internationalized/date";
import type { ReactNode } from "react";
import type { DatePickerProps as AriaDatePickerProps } from "react-aria-components";

export type DatePickerProps = Omit<
  AriaDatePickerProps<DateValue>,
  "className" | "children"
> & {
  label?: ReactNode;
  className?: string;
};

export type { DateValue, CalendarDate };
