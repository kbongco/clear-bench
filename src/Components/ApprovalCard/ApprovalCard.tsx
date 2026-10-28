import { Link } from "react-router-dom";
import type { ApprovalCardProps } from "../ComponentInterfaces/ApprovalCardInterface";
import Pill from "../Pill/Pill";
import { useState } from "react";

export default function ApprovalCard({ sample, onApprove, onReject }: ApprovalCardProps) {
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleCancel() {
    setIsRejecting(false);
    setReason("");
  }

  async function run(action: () => Promise<void>) {
    setSubmitting(true);
    setError(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const reasonId = `reject-reason-${sample.id}`;

  if (sample.test_status !== "pending") {
    return (
      <div role="status" className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
        ✓ {sample.name} {sample.test_status === "rejected" ? "rejected" : "approved"} ·{" "}
        <Link to={`/samples/${sample.id}`} className="text-blue-600 hover:underline">
          View history
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Link
          to={`/samples/${sample.id}`}
          className="inline-block py-2 text-sm text-blue-600 hover:underline"
        >
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
              disabled={submitting || reason.trim() === ""}
              onClick={() => run(() => onReject(sample.id, reason))}
              className="flex-1 rounded-md bg-red-600 px-4 py-2 font-medium text-white disabled:opacity-50"
            >
              Confirm reject
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="flex-1 rounded-md border px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            disabled={submitting}
            type="button"
            onClick={() => run(() => onApprove(sample.id))}
            className="flex-1 rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Approve
          </button>
          <button
            disabled={submitting}
            className="flex-1 rounded-md border border-red-600 px-4 py-2 font-medium text-red-600 hover:bg-red-50"
            type="button"
            onClick={() => setIsRejecting(true)}
          >
            Reject
          </button>
        </div>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </article>
  );
}
