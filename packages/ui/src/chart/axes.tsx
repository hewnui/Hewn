import { formatTick } from "./status";

type AxisScale = {
  ticks?: (count?: number) => number[];
  domain: () => Array<number | string>;
  bandwidth?: () => number;
  (value: number | string): number | undefined;
};

export function GridLines({
  x,
  y,
  width,
  height,
  pad,
}: {
  x: AxisScale;
  y: AxisScale;
  width: number;
  height: number;
  pad: { top: number; right: number; bottom: number; left: number };
}) {
  const yTicks = y.ticks?.(4) ?? [];
  return (
    <g aria-hidden>
      {yTicks.map((tick) => {
        const py = y(tick) ?? 0;
        return (
          <line
            key={`y-${tick}`}
            x1={pad.left}
            x2={width - pad.right}
            y1={py}
            y2={py}
            stroke="var(--kp-border)"
            strokeWidth={1}
          />
        );
      })}
      <line
        x1={pad.left}
        x2={pad.left}
        y1={pad.top}
        y2={height - pad.bottom}
        stroke="var(--kp-border)"
        strokeWidth={1}
      />
      <line
        x1={pad.left}
        x2={width - pad.right}
        y1={height - pad.bottom}
        y2={height - pad.bottom}
        stroke="var(--kp-border)"
        strokeWidth={1}
      />
    </g>
  );
}

export function AxisLabels({
  x,
  y,
  height,
  pad,
  xIsBand,
}: {
  x: AxisScale;
  y: AxisScale;
  height: number;
  pad: { top: number; right: number; bottom: number; left: number };
  xIsBand?: boolean;
}) {
  const yTicks = y.ticks?.(4) ?? [];
  const xDomain = x.domain();
  const xLabels =
    xIsBand || xDomain.length <= 8
      ? xDomain
      : [xDomain[0], xDomain[Math.floor(xDomain.length / 2)], xDomain.at(-1)].filter(
          (v): v is number | string => v !== undefined,
        );

  return (
    <g aria-hidden className="tabular-nums">
      {yTicks.map((tick) => (
        <text
          key={`yl-${tick}`}
          x={pad.left - 8}
          y={(y(tick) ?? 0) + 4}
          textAnchor="end"
          className="fill-muted-foreground"
          style={{ fontSize: 10, fontFamily: "var(--kp-font-mono)" }}
        >
          {formatTick(tick)}
        </text>
      ))}
      {xLabels.map((label) => {
        const px = (x(label) ?? 0) + (x.bandwidth?.() ?? 0) / 2;
        return (
          <text
            key={`xl-${String(label)}`}
            x={px}
            y={height - pad.bottom + 16}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ fontSize: 10, fontFamily: "var(--kp-font-mono)" }}
          >
            {formatTick(label)}
          </text>
        );
      })}
    </g>
  );
}
