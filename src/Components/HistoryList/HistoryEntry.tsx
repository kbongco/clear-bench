import { formatDateTime } from "../../utils/formatDateTime";
import { formatStatus } from "../../utils/formatStatus";
import type { HistoryInterface } from "../ComponentInterfaces/HistoryInterface";
import Pill from "../Pill/Pill";

export default function HistoryEntry({ event }: HistoryInterface) {
  return (
    <li className="py-4">
      <p className="font-medium">
        {formatStatus(event.action)} by {event.actor_role} · {formatStatus(event.actor_role)}
      </p>

      <div className="flex items-center gap-2 mt-1">
        {event.from_status && (
          <>
            <Pill status={event.from_status} />
            <span aria-hidden="true">→</span>
          </>
        )}
        {event.to_status && <Pill status={event.to_status} />}
      </div>

      <p className="text-sm text-gray-500 mt-1">{formatDateTime(event.created_at)}</p>

      {event.note && <p className="mt-1 text-gray-700">"{event.note}"</p>}
    </li>
  );
}
