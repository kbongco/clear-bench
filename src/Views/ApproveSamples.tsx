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

export default function ApproveSamples({
  status,
  samples,
  onApprove,
  onReject,
  onStatusChange,
  loading,
  error,
}: ApproveSamplesProps) {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Approve samples</h1>
      {loading ? (
        <p className="mt-6 text-gray-500">Loading samples…</p>
      ) : error ? (
        <p className="mt-6 text-red-600">{error}</p>
      ) : samples.length === 0 ? (
        <p className="mt-6 text-gray-500">{""}</p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">…</ul>
      )}
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
      <p className="text-gray-600 mt-1">
        {samples.filter((s) => s.test_status === "pending").length} waiting for review
      </p>

      {samples.length === 0 ? (
        <p className="mt-6 text-gray-500">No samples waiting to be approved</p>
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
