import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import type { ReactNode } from "react";

export type SwitchProps = Omit<AriaSwitchProps, "className" | "children"> & {
  children?: ReactNode;
  className?: string;
};
