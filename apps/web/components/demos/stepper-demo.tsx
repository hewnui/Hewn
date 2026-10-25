"use client";

import { Button, Stepper, StepperStep, useStepper } from "@hewnui/ui";

export function StepperDemo() {
  const { currentIndex, goTo, isFirst, isLast, next, previous } = useStepper({
    count: 4,
    defaultIndex: 1,
  });

  return (
    <div
      data-kp-surface
      className="not-prose my-6 space-y-5 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Stepper
        aria-label="Workspace setup"
        currentIndex={currentIndex}
        onStepChange={goTo}
      >
        <StepperStep description="Name and owners">Account</StepperStep>
        <StepperStep description="Regions and billing">Workspace</StepperStep>
        <StepperStep isOptional description="Invite teammates">
          Team
        </StepperStep>
        <StepperStep description="Review and launch">Launch</StepperStep>
      </Stepper>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onPress={previous} isDisabled={isFirst}>
          Back
        </Button>
        <Button onPress={next} isDisabled={isLast}>
          Continue
        </Button>
      </div>

      <Stepper orientation="vertical" aria-label="Vertical specimen" currentIndex={1}>
        <StepperStep status="complete">Connect source</StepperStep>
        <StepperStep status="current">Map fields</StepperStep>
        <StepperStep status="error">Validate sample</StepperStep>
        <StepperStep status="upcoming">Publish</StepperStep>
      </Stepper>
    </div>
  );
}
