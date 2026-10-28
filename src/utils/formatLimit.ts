import type { ProductSpec } from "../types/Specs/specs";
import formatRange from "./formatRange";

export default function formatLimit(spec: ProductSpec): string {
  if (spec.kind === "pass_fail") {
    return "Pass / fail";
  }

  const range = formatRange(spec.min_value, spec.max_value);
  return spec.unit ? `${range} ${spec.unit}` : range;
}

const broken: number = "not a number";
console.log(broken);
