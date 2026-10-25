"use client";

import { AnimatePresence, m } from "motion/react";
import { Checkbox as AriaCheckbox } from "react-aria-components";
import { iconPop, iconState } from "@hewnui/motion";
import { useMotionMode } from "../../providers/motion-provider";
import {
  checkboxBoxClass,
  checkboxClassName,
  checkboxMarkClass,
} from "./checkbox.styles";
import type { CheckboxProps } from "./checkbox.types";

function CheckMark({ animate }: { animate: boolean }) {
  const mark = (
    <svg viewBox="0 0 12 12" className={checkboxMarkClass} aria-hidden>
      <path
        d="M2.5 6.2 4.8 8.5 9.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!animate) return mark;

  return (
    <m.span
      className="flex"
      variants={iconState}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={iconPop}
    >
      {mark}
    </m.span>
  );
}

export function Checkbox({ children, className, ...props }: CheckboxProps) {
  const { motionEnabled } = useMotionMode();

  return (
    <AriaCheckbox {...props} className={checkboxClassName(className)}>
      {({ isSelected }) => (
        <>
          <span className={checkboxBoxClass} data-kp-control="checkbox">
            <AnimatePresence initial={false}>
              {isSelected ? (
                <CheckMark key="check" animate={motionEnabled} />
              ) : null}
            </AnimatePresence>
          </span>
          {children ? <span>{children}</span> : null}
        </>
      )}
    </AriaCheckbox>
  );
}
