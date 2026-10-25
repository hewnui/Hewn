"use client";

import {
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateRangePickerStateContext,
  Heading,
  RangeCalendar,
} from "react-aria-components";
import { useContext } from "react";
import { resolvePresets } from "./date-range-picker.presets";
import {
  dateRangeCellClass,
  dateRangeDialogClass,
  dateRangeNavButtonClass,
  dateRangePresetButtonClass,
  dateRangePresetsClass,
} from "./date-range-picker.styles";
import type {
  DateRangePreset,
  DateRangePresetId,
} from "./date-range-picker.types";

function PresetList({
  presets,
}: {
  presets: DateRangePresetId[] | DateRangePreset[] | undefined;
}) {
  const state = useContext(DateRangePickerStateContext);
  const items = resolvePresets(presets);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={dateRangePresetsClass} role="list">
      {items.map((preset) => (
        <Button
          key={preset.id}
          slot={null}
          className={dateRangePresetButtonClass}
          onPress={() => {
            const range = preset.getRange();
            state?.setValue(range);
            state?.close();
          }}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
}

export function DateRangePickerPopoverBody({
  showPresets,
  presets,
}: {
  showPresets: boolean;
  presets: DateRangePresetId[] | DateRangePreset[] | undefined;
}) {
  return (
    <div className={dateRangeDialogClass}>
      {showPresets ? <PresetList presets={presets} /> : null}
      <RangeCalendar className="text-sm">
        <header className="mb-3 flex items-center justify-between gap-2">
          <Button slot="previous" className={dateRangeNavButtonClass}>
            ‹
          </Button>
          <Heading className="text-sm font-semibold" />
          <Button slot="next" className={dateRangeNavButtonClass}>
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
              <CalendarCell date={date} className={dateRangeCellClass} />
            )}
          </CalendarGridBody>
        </CalendarGrid>
      </RangeCalendar>
    </div>
  );
}
