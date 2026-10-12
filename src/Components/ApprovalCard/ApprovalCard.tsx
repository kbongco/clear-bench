import { Link } from "react-router-dom";
import type { ApprovalCardProps } from "../ComponentInterfaces/ApprovalCardInterface";
import Pill from "../Pill/Pill";

export default function ApprovalCard({ sample, onApprove }: ApprovalCardProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Link to={`/samples/${sample.id}`} className="font-semibold text-blue-600 hover:underline">
          {sample.name}
        </Link>
        <Pill status={sample.test_status ?? "pending"} />
      </div>

      <p className="text-sm text-gray-700">
        {sample.scientist.name} · {sample.scientist.department}
      </p>
      <p className="text-sm text-gray-700">
        {sample.sample_type} · {sample.test_types.join(", ")}
      </p>
      <p className="text-sm text-gray-500">Due {sample.due_date}</p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => onApprove(sample.____)}
          className="flex-1 rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
        >
          Approve
        </button>
        <button
          type="button"
          className="flex-1 rounded-md border border-red-600 px-4 py-2 font-medium text-red-600 hover:bg-red-50"
        >
          Reject
        </button>
      </div>
    </article>
  );
}
