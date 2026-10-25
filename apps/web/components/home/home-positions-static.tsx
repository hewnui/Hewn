import { positions } from "@/components/home/content";

/** Server-safe house-rules list — always present in HTML for SEO / no-JS. */
export function HomePositionsStatic() {
  return (
    <ul className="grid gap-10 md:grid-cols-3">
      {positions.map((item, i) => (
        <li key={item.id}>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {item.label}
            <span className="ml-2 tabular-nums">0{i + 1}</span>
          </p>
          <p className="mt-3 max-w-[28ch] text-xl font-semibold leading-snug tracking-tight text-balance md:text-2xl">
            {item.statement}
          </p>
        </li>
      ))}
    </ul>
  );
}
