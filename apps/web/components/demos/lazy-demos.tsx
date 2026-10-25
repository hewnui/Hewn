"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Per-demo `next/dynamic` boundaries. Must live in a Client Component —
 * Server Components that call `dynamic()` do not code-split client leaves
 * (see Next.js lazy-loading guide).
 *
 * The docs catch-all route shares one client graph, so static MDX imports of
 * every demo still land in one mega-chunk. `dynamic()` keeps SSR previews in
 * HTML while only mounting (and downloading) the specimen the page renders.
 */
function demo(
  loader: () => Promise<Record<string, ComponentType>>,
  name: string,
) {
  return dynamic(() =>
    loader().then((mod) => {
      const Comp = mod[name];
      if (!Comp) throw new Error(`Demo export missing: ${name}`);
      return Comp;
    }),
  );
}

export const BadgeDemo = demo(
  () => import("@/components/demos/badge-demo"),
  "BadgeDemo",
);
export const BreadcrumbsDemo = demo(
  () => import("@/components/demos/breadcrumbs-demo"),
  "BreadcrumbsDemo",
);
export const ButtonDemo = demo(
  () => import("@/components/demos/button-demo"),
  "ButtonDemo",
);
export const CardDemo = demo(
  () => import("@/components/demos/card-demo"),
  "CardDemo",
);
export const CheckboxDemo = demo(
  () => import("@/components/demos/checkbox-demo"),
  "CheckboxDemo",
);
export const CheckboxGroupDemo = demo(
  () => import("@/components/demos/checkbox-group-demo"),
  "CheckboxGroupDemo",
);
export const ColorPickerDemo = demo(
  () => import("@/components/demos/color-picker-demo"),
  "ColorPickerDemo",
);
export const ComboboxDemo = demo(
  () => import("@/components/demos/combobox-demo"),
  "ComboboxDemo",
);
export const CommandPaletteDemo = demo(
  () => import("@/components/demos/command-palette-demo"),
  "CommandPaletteDemo",
);
export const DataTableDemo = demo(
  () => import("@/components/demos/data-table-demo"),
  "DataTableDemo",
);
export const DatePickerDemo = demo(
  () => import("@/components/demos/date-picker-demo"),
  "DatePickerDemo",
);
export const DateRangePickerDemo = demo(
  () => import("@/components/demos/date-range-picker-demo"),
  "DateRangePickerDemo",
);
export const DialogDemo = demo(
  () => import("@/components/demos/dialog-demo"),
  "DialogDemo",
);
export const DonutChartDemo = demo(
  () => import("@/components/demos/donut-chart-demo"),
  "DonutChartDemo",
);
export const DrawerDemo = demo(
  () => import("@/components/demos/drawer-demo"),
  "DrawerDemo",
);
export const EmptyDemo = demo(
  () => import("@/components/demos/empty-demo"),
  "EmptyDemo",
);
export const FileUploadDemo = demo(
  () => import("@/components/demos/file-upload-demo"),
  "FileUploadDemo",
);
export const FormDemo = demo(
  () => import("@/components/demos/form-demo"),
  "FormDemo",
);
export const InputGroupDemo = demo(
  () => import("@/components/demos/input-group-demo"),
  "InputGroupDemo",
);
export const InputOtpDemo = demo(
  () => import("@/components/demos/input-otp-demo"),
  "InputOtpDemo",
);
export const LinkDemo = demo(
  () => import("@/components/demos/link-demo"),
  "LinkDemo",
);
export const MenuDemo = demo(
  () => import("@/components/demos/menu-demo"),
  "MenuDemo",
);
export const MotionDemo = demo(
  () => import("@/components/demos/motion-demo"),
  "MotionDemo",
);
export const NumberFieldDemo = demo(
  () => import("@/components/demos/number-field-demo"),
  "NumberFieldDemo",
);
export const PaginationDemo = demo(
  () => import("@/components/demos/pagination-demo"),
  "PaginationDemo",
);
export const PasswordFieldDemo = demo(
  () => import("@/components/demos/password-field-demo"),
  "PasswordFieldDemo",
);
export const PopoverDemo = demo(
  () => import("@/components/demos/popover-demo"),
  "PopoverDemo",
);
export const ProgressDemo = demo(
  () => import("@/components/demos/progress-demo"),
  "ProgressDemo",
);
export const RadioGroupDemo = demo(
  () => import("@/components/demos/radio-group-demo"),
  "RadioGroupDemo",
);
export const SearchFieldDemo = demo(
  () => import("@/components/demos/search-field-demo"),
  "SearchFieldDemo",
);
export const SelectDemo = demo(
  () => import("@/components/demos/select-demo"),
  "SelectDemo",
);
export const SkeletonDemo = demo(
  () => import("@/components/demos/skeleton-demo"),
  "SkeletonDemo",
);
export const SliderDemo = demo(
  () => import("@/components/demos/slider-demo"),
  "SliderDemo",
);
export const SparklineDemo = demo(
  () => import("@/components/demos/sparkline-demo"),
  "SparklineDemo",
);
export const SpinnerDemo = demo(
  () => import("@/components/demos/spinner-demo"),
  "SpinnerDemo",
);
export const LineChartDemo = demo(
  () => import("@/components/demos/line-chart-demo"),
  "LineChartDemo",
);
export const AreaChartDemo = demo(
  () => import("@/components/demos/area-chart-demo"),
  "AreaChartDemo",
);
export const BarChartDemo = demo(
  () => import("@/components/demos/bar-chart-demo"),
  "BarChartDemo",
);
export const StepperDemo = demo(
  () => import("@/components/demos/stepper-demo"),
  "StepperDemo",
);
export const SwitchDemo = demo(
  () => import("@/components/demos/switch-demo"),
  "SwitchDemo",
);
export const TableDemo = demo(
  () => import("@/components/demos/table-demo"),
  "TableDemo",
);
export const TabsDemo = demo(
  () => import("@/components/demos/tabs-demo"),
  "TabsDemo",
);
export const TagFieldDemo = demo(
  () => import("@/components/demos/tag-field-demo"),
  "TagFieldDemo",
);
export const TextAreaDemo = demo(
  () => import("@/components/demos/text-area-demo"),
  "TextAreaDemo",
);
export const TextFieldDemo = demo(
  () => import("@/components/demos/text-field-demo"),
  "TextFieldDemo",
);
export const ToastDemo = demo(
  () => import("@/components/demos/toast-demo"),
  "ToastDemo",
);
export const TooltipDemo = demo(
  () => import("@/components/demos/tooltip-demo"),
  "TooltipDemo",
);
export const ThemeLabPanel = demo(
  () => import("@/components/demos/theme-lab-panel"),
  "ThemeLabPanel",
);
