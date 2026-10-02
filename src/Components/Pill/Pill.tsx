import { formatStatus } from "../../utils/formatStatus";
import { statusStyles } from "../../utils/formatStyle";
import { type PillInterface, type SampleStatus } from "../ComponentInterfaces/PillInterface";

export default function Pill({ status }: PillInterface) {
  const style = statusStyles[status as SampleStatus] ?? "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${style}`}>
      {formatStatus(status)}
    </span>
  );
}