"use client";

import {
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { DateRangePicker } from "./date-range-picker";

export function DateRangePickerBasicExample() {
  return <DateRangePicker label="Travel dates" />;
}

export function DateRangePickerPresetsExample() {
  return (
    <DateRangePicker
      label="Report range"
      description="Choose a preset or pick a custom span."
      showPresets
      presets={["today", "last-7-days", "last-30-days", "this-month"]}
    />
  );
}

export function DateRangePickerBoundsExample() {
  const now = today(getLocalTimeZone());
  return (
    <DateRangePicker
      label="Booking window"
      minValue={now}
      maxValue={now.add({ months: 3 })}
      isDateUnavailable={(date) => date.toDate(getLocalTimeZone()).getDay() === 0}
    />
  );
}
