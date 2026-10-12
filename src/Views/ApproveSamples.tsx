import ApprovalCard from "../Components/ApprovalCard/ApprovalCard";
import { FILTERS } from "../constants/formOptions";
import type { ApprovalFilter, SampleWithOwner } from "../types/Samples/sample";

interface ApproveSamplesProps {
  samples: SampleWithOwner[];
  status: ApprovalFilter;
  onStatusChange: (status: ApprovalFilter) => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number, reason: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const SUMMARY: Record<ApprovalFilter, (count: number) => string> = {
  pending: (n) => `${n} waiting for review`,
  in_progress: (n) => `${n} approved`,
  rejected: (n) => `${n} rejected`,
};

const EMPTY_MESSAGE: Record<ApprovalFilter, string> = {
  pending: "No samples waiting. You're all caught up.",
  in_progress: "No approved samples yet.",
  rejected: "No rejected samples.",
};

export default function ApproveSamples({
  samples,
  status,
  onStatusChange,
  onApprove,
  onReject,
  loading,
  error,
}: ApproveSamplesProps) {
  const count =
    status === "pending"
      ? samples.filter((s) => s.test_status === "pending").length
      : samples.length;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Approve samples</h1>

      <div
        role="group"
        aria-label="Filter by status"
        className="mt-4 inline-flex rounded-md border border-gray-300 overflow-hidden"
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={status === f.value}
            onClick={() => onStatusChange(f.value)}
            className={`px-4 py-2 text-sm font-medium ${
              status === f.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {!loading && !error && <p className="text-gray-600 mt-2">{SUMMARY[status](count)}</p>}

      {loading ? (
        <p className="mt-6 text-gray-500">Loading samples…</p>
      ) : error ? (
        <p className="mt-6 text-red-600">{error}</p>
      ) : samples.length === 0 ? (
        <p className="mt-6 text-gray-500">{EMPTY_MESSAGE[status]}</p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {samples.map((sample) => (
            <li key={sample.id}>
              <ApprovalCard sample={sample} onApprove={onApprove} onReject={onReject} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
