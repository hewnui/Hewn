import { cleanup } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { Checkbox } from "../components/checkbox";
import { CheckboxGroup } from "../components/checkbox-group";
import { FileUpload } from "../components/file-upload";
import { Form } from "../components/form";
import { InputGroup } from "../components/input-group";
import { InputOtp } from "../components/input-otp";
import { NumberField } from "../components/number-field";
import { PasswordField } from "../components/password-field";
import { Progress } from "../components/progress";
import { Radio, RadioGroup } from "../components/radio-group";
import { SearchField } from "../components/search-field";
import { Slider } from "../components/slider";
import { Switch } from "../components/switch";
import { TextArea } from "../components/text-area";
import { TextField } from "../components/text-field";
import { expectNoA11yViolations } from "./a11y";
import { renderWithProviders } from "./render";

afterEach(() => cleanup());

describe("a11y forms", () => {
  it("TextField", async () => {
    const { container } = renderWithProviders(<TextField label="Email" />);
    await expectNoA11yViolations(container);
  });

  it("TextArea", async () => {
    const { container } = renderWithProviders(<TextArea label="Notes" />);
    await expectNoA11yViolations(container);
  });

  it("NumberField", async () => {
    const { container } = renderWithProviders(
      <NumberField label="Quantity" defaultValue={1} />,
    );
    await expectNoA11yViolations(container);
  });

  it("SearchField", async () => {
    const { container } = renderWithProviders(<SearchField label="Search" />);
    await expectNoA11yViolations(container);
  });

  it("PasswordField", async () => {
    const { container } = renderWithProviders(
      <PasswordField label="Password" />,
    );
    await expectNoA11yViolations(container);
  });

  it("InputGroup", async () => {
    const { container } = renderWithProviders(
      <InputGroup label="Website" prefix="https://" suffix=".dev" />,
    );
    await expectNoA11yViolations(container);
  });

  it("InputOtp", async () => {
    const { container } = renderWithProviders(
      <InputOtp label="Verification code" length={4} />,
    );
    await expectNoA11yViolations(container);
  });

  it("Checkbox", async () => {
    const { container } = renderWithProviders(<Checkbox>Notify me</Checkbox>);
    await expectNoA11yViolations(container);
  });

  it("CheckboxGroup", async () => {
    const { container } = renderWithProviders(
      <CheckboxGroup label="Topics" defaultValue={["billing"]}>
        <Checkbox value="billing">Billing</Checkbox>
        <Checkbox value="product">Product</Checkbox>
      </CheckboxGroup>,
    );
    await expectNoA11yViolations(container);
  });

  it("RadioGroup", async () => {
    const { container } = renderWithProviders(
      <RadioGroup label="Plan" defaultValue="pro">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>,
    );
    await expectNoA11yViolations(container);
  });

  it("Switch", async () => {
    const { container } = renderWithProviders(<Switch>Motion</Switch>);
    await expectNoA11yViolations(container);
  });

  it("Slider", async () => {
    const { container } = renderWithProviders(
      <Slider label="Opacity" defaultValue={42} minValue={0} maxValue={100} />,
    );
    await expectNoA11yViolations(container);
  });

  it("Form", async () => {
    const { container } = renderWithProviders(
      <Form aria-label="Invite">
        <TextField label="Email" name="email" type="email" />
      </Form>,
    );
    await expectNoA11yViolations(container);
  });

  it("Progress", async () => {
    const { container } = renderWithProviders(
      <Progress label="Sync" value={47} />,
    );
    await expectNoA11yViolations(container);
  });

  it("FileUpload", async () => {
    const { container } = renderWithProviders(
      <FileUpload label="Brand assets" buttonLabel="Choose files" />,
    );
    await expectNoA11yViolations(container);
  });
});
