import { foodTestDropdownOptions } from "../constants/formOptions";

export default function formatTestType(value: string): string {
  const option = foodTestDropdownOptions.find((o) => o.value === value);
  return option?.label ?? value;
}
