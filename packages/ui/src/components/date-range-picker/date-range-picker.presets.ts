import {
  endOfMonth,
  getLocalTimeZone,
  startOfMonth,
  today,
} from "@internationalized/date";
import type {
  DateRangePreset,
  DateRangePresetId,
} from "./date-range-picker.types";

const builtin: Record<DateRangePresetId, DateRangePreset> = {
  today: {
    id: "today",
    label: "Today",
    getRange: () => {
      const day = today(getLocalTimeZone());
      return { start: day, end: day };
    },
  },
  "last-7-days": {
    id: "last-7-days",
    label: "Last 7 days",
    getRange: () => {
      const end = today(getLocalTimeZone());
      return { start: end.subtract({ days: 6 }), end };
    },
  },
  "last-30-days": {
    id: "last-30-days",
    label: "Last 30 days",
    getRange: () => {
      const end = today(getLocalTimeZone());
      return { start: end.subtract({ days: 29 }), end };
    },
  },
  "this-month": {
    id: "this-month",
    label: "This month",
    getRange: () => {
      const day = today(getLocalTimeZone());
      return { start: startOfMonth(day), end: endOfMonth(day) };
    },
  },
};

export const defaultPresetIds: DateRangePresetId[] = [
  "today",
  "last-7-days",
  "last-30-days",
  "this-month",
];

export function resolvePresets(
  presets: DateRangePresetId[] | DateRangePreset[] | undefined,
): DateRangePreset[] {
  if (!presets) {
    return defaultPresetIds.map((id) => builtin[id]);
  }
  if (presets.length === 0) {
    return [];
  }
  if (typeof presets[0] === "string") {
    return (presets as DateRangePresetId[]).map((id) => builtin[id]);
  }
  return presets as DateRangePreset[];
}
