"use client";

import { Switch as AriaSwitch } from "react-aria-components";
import {
  switchClassName,
  switchThumbClass,
  switchTrackClass,
} from "./switch.styles";
import type { SwitchProps } from "./switch.types";

export function Switch({ children, className, ...props }: SwitchProps) {
  return (
    <AriaSwitch {...props} className={switchClassName(className)}>
      <span className={switchTrackClass} data-kp-control="switch">
        <span className={switchThumbClass} data-kp-control="switch-thumb" />
      </span>
      {children ? <span>{children}</span> : null}
    </AriaSwitch>
  );
}
