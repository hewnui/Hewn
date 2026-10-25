import { cn } from "../../utils/cn";
import type { BetaProps } from "../beta";

export function Alpha(props: BetaProps) {
  return <div className={cn("alpha")}>{props.children}</div>;
}
