import { storageConditions } from "../constants/formOptions";

export default function formatConditions(value: string): string {
  const option = storageConditions.find((o) => o.value === value);
  return option?.label ?? value;
}
