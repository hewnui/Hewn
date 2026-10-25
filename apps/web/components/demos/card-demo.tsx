"use client";

import { Card } from "@hewnui/ui";

export function CardDemo() {
  return (
    <div className="not-prose my-6 max-w-md">
      <Card>
        <Card.Header>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            p95 latency
          </p>
          <p className="font-mono text-2xl tabular-nums">211ms</p>
        </Card.Header>
        <Card.Body>Median held at 47ms through the canary window.</Card.Body>
        <Card.Footer>
          <span className="font-mono text-xs tabular-nums text-accent">-14ms</span>
          <span className="text-xs text-muted-foreground">vs prior window</span>
        </Card.Footer>
      </Card>
    </div>
  );
}
