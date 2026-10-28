import { Link } from "react-router-dom";
import type { SampleWithOwner } from "../../types/Samples/sample";
import { byDueDate } from "../../utils/needsAttention";
import StatTile from "../../Components/StatTile/StatTile";
import Panel from "../../Components/Panel/Panel";

type LabTechHomeProps = {
  name: string;
  pending: SampleWithOwner[];
  inTesting: SampleWithOwner[];
  loading: boolean;
  error: string | null;
};

export default function LabTechHome({
  name,
  pending,
  inTesting,
  loading,
  error,
}: LabTechHomeProps) {
  const dueSoonest = [...inTesting].sort(byDueDate).slice(0, 5);

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Welcome, {name}</h1>
        <Link
          to="/approve-samples"
          className="w-full rounded bg-blue-600 px-4 py-2 text-center text-white md:w-auto"
        >
          Approve samples
        </Link>
      </div>

      {loading ? (
        <p role="status" className="mt-6 text-gray-600">
          Loading your samples…
        </p>
      ) : error ? (
        <p role="alert" className="mt-6 text-red-600">
          {error}
        </p>
      ) : pending.length === 0 && inTesting.length === 0 ? (
        <p className="mt-6 text-gray-600">Nothing to approve or test right now.</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <StatTile label="To approve" value={pending.length} />
            <StatTile label="In testing (yours)" value={inTesting.length} />
          </div>

          <Panel title="Due soonest" className="mt-6">
            {dueSoonest.length === 0 ? (
              <p className="text-gray-600">You have no samples in testing.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {dueSoonest.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/samples/${s.id}`}
                      className="flex flex-wrap items-center justify-between gap-2 py-3 hover:bg-gray-50"
                    >
                      <span className="font-medium">{s.name}</span>
                      <span className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{s.scientist.name}</span>
                        <span>{s.due_date ? `Due ${s.due_date}` : "No due date"}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/view-samples"
              className="inline-block py-2 text-sm text-blue-600 hover:underline"
            >
              View all samples →
            </Link>
          </Panel>
        </>
      )}
    </div>
  );
}
