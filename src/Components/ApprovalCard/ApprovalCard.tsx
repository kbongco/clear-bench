import { Link } from "react-router-dom";
import type { ApprovalCardProps } from "../ComponentInterfaces/ApprovalCardInterface";
import Pill from "../Pill/Pill";
import { useState } from "react";

export default function ApprovalCard({ sample, onApprove, onReject }: ApprovalCardProps) {
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [reason, setReason] = useState("");

  function handleCancel() {
    setIsRejecting(true);
    setReason("");
  }

  const reasonId = `reject-reason-${sample.id}`;

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

      {isRejecting ? (
        <div className="flex flex-col gap-2">
          <label htmlFor={reasonId} className="text-sm font-medium">
            Reason for rejecting
          </label>
          <textarea
            id={reasonId}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 p-2"
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              disabled={reason.trim() === ""}
              onClick={() => onReject(sample.id, reason)}
              className="flex-1 rounded-md bg-red-600 px-4 py-2 font-medium text-white disabled:opacity-50"
            >
              Confirm reject
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-md border px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => onApprove(sample.id)}
            className="flex-1 rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Approve
          </button>
          <button
            className="flex-1 rounded-md border border-red-600 px-4 py-2 font-medium text-red-600 hover:bg-red-50"
            type="button"
            onClick={() => setIsRejecting(false)}
          >
            Reject
          </button>
        </div>
      )}
    </article>
  );
}
