"use client";

import { AnimatePresence, m } from "motion/react";
import {
  FieldError,
  Label,
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  Text,
} from "react-aria-components";
import { iconPop, iconState } from "@hewnui/motion";
import { useMotionMode } from "../../providers/motion-provider";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
} from "../../styles/field";
import {
  radioClassName,
  radioControlClass,
  radioDotClass,
  radioGroupClassName,
  radioGroupItemsClass,
} from "./radio-group.styles";
import type { RadioGroupProps, RadioProps } from "./radio-group.types";

function RadioDot({ animate }: { animate: boolean }) {
  if (!animate) {
    return <span className={radioDotClass} />;
  }

  return (
    <m.span
      className={radioDotClass}
      variants={iconState}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={iconPop}
    />
  );
}

export function RadioGroup({
  children,
  className,
  description,
  errorMessage,
  label,
  orientation = "vertical",
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      {...props}
      orientation={orientation}
      className={radioGroupClassName(className)}
    >
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      {description ? (
        <Text slot="description" className={fieldDescriptionClass}>
          {description}
        </Text>
      ) : null}
      <div className={radioGroupItemsClass(orientation)}>{children}</div>
      <FieldError className={fieldErrorClass}>{errorMessage}</FieldError>
    </AriaRadioGroup>
  );
}

export function Radio({ children, className, ...props }: RadioProps) {
  const { motionEnabled } = useMotionMode();

  return (
    <AriaRadio {...props} className={radioClassName(className)}>
      {({ isSelected }) => (
        <>
          <span className={radioControlClass} data-kp-control="radio">
            <AnimatePresence initial={false}>
              {isSelected ? (
                <RadioDot key="dot" animate={motionEnabled} />
              ) : null}
            </AnimatePresence>
          </span>
          {children ? <span>{children}</span> : null}
        </>
      )}
    </AriaRadio>
  );
}
