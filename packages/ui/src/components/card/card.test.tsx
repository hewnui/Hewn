import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Card } from "./card";

describe("Card", () => {
  it("renders compound regions", () => {
    render(
      <Card>
        <Card.Header>Latency</Card.Header>
        <Card.Body>p95 is 211ms.</Card.Body>
      </Card>,
    );
    expect(document.body.textContent).toContain("Latency");
    expect(document.body.textContent).toContain("p95 is 211ms.");
  });
});
