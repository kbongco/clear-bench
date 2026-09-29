import { formatStatus } from "../../utils/formatStatus";
import { statusStyles, type SampleStatus } from "../ComponentInterfaces/PillInterface";

export default function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status as SampleStatus] ?? "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${style}`}>
      {formatStatus(status)}
    </span>
  );
}