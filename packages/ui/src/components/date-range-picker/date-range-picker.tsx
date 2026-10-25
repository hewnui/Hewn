"use client";

import {
  Button,
  DateInput,
  DateRangePicker as AriaDateRangePicker,
  DateSegment,
  Dialog,
  FieldError,
  Group,
  Label,
  Popover,
  Text,
} from "react-aria-components";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
} from "../../styles/field";
import { DateRangePickerPopoverBody } from "./date-range-picker.calendar";
import {
  dateRangeGroupClass,
  dateRangeInputClass,
  dateRangePickerClassName,
  dateRangePopoverClass,
  dateRangeSegmentClass,
  dateRangeTriggerClass,
} from "./date-range-picker.styles";
import type { DateRangePickerProps } from "./date-range-picker.types";

export function DateRangePicker({
  className,
  description,
  errorMessage,
  label,
  presets,
  showPresets = true,
  ...props
}: DateRangePickerProps) {
  return (
    <AriaDateRangePicker
      {...props}
      className={dateRangePickerClassName(className)}
    >
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      <Group className={dateRangeGroupClass} data-kp-surface>
        <DateInput slot="start" className={dateRangeInputClass}>
          {(segment) => (
            <DateSegment segment={segment} className={dateRangeSegmentClass} />
          )}
        </DateInput>
        <span aria-hidden="true" className="px-0.5 text-muted-foreground">
          –
        </span>
        <DateInput slot="end" className={dateRangeInputClass}>
          {(segment) => (
            <DateSegment segment={segment} className={dateRangeSegmentClass} />
          )}
        </DateInput>
        <Button className={dateRangeTriggerClass} aria-label="Open calendar">
          ▢
        </Button>
      </Group>
      {description ? (
        <Text slot="description" className={fieldDescriptionClass}>
          {description}
        </Text>
      ) : null}
      <FieldError className={fieldErrorClass}>{errorMessage}</FieldError>
      <Popover className={dateRangePopoverClass} data-kp-surface>
        <Dialog className="outline-none" aria-label="Choose date range">
          <DateRangePickerPopoverBody
            showPresets={showPresets}
            presets={presets}
          />
        </Dialog>
      </Popover>
    </AriaDateRangePicker>
  );
}
