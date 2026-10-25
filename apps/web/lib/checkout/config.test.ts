import { describe, expect, it } from "vitest";
import {
  canRenderPreorder,
  getConfiguredPriceDisplay,
} from "@/lib/checkout/config";
import { getCheckoutProvider } from "@/lib/checkout";
import { getProMode } from "@/lib/pro/mode";

describe("pro mode + preorder price gate", () => {
  it("defaults to waitlist", () => {
    expect(getProMode({})).toBe("waitlist");
    expect(getProMode({ PRO_MODE: "waitlist" })).toBe("waitlist");
    expect(getProMode({ PRO_MODE: "preorder" })).toBe("preorder");
  });

  it("refuses placeholder or empty prices", () => {
    expect(getConfiguredPriceDisplay({})).toBeNull();
    expect(
      getConfiguredPriceDisplay({ PRO_PREORDER_PRICE_DISPLAY: "Price TBD" }),
    ).toBeNull();
    expect(
      getConfiguredPriceDisplay({ PRO_PREORDER_PRICE_DISPLAY: "tbd" }),
    ).toBeNull();
    expect(canRenderPreorder({ PRO_PREORDER_PRICE_DISPLAY: "" })).toBe(false);
  });

  it("accepts a configured display string", () => {
    expect(
      getConfiguredPriceDisplay({ PRO_PREORDER_PRICE_DISPLAY: "Early access" }),
    ).toBe("Early access");
  });

  it("does not expose checkout without mode + price", () => {
    expect(getCheckoutProvider({ PRO_MODE: "waitlist" })).toBeNull();
    expect(
      getCheckoutProvider({
        PRO_MODE: "preorder",
        PRO_PREORDER_PRICE_DISPLAY: "",
      }),
    ).toBeNull();
    expect(
      getCheckoutProvider({
        PRO_MODE: "preorder",
        PRO_PREORDER_PRICE_DISPLAY: "Early access",
      })?.id,
    ).toBe("demo");
  });
});
