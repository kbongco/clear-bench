import { Link } from "react-router-dom";
import type { SampleAPI } from "../../types/Samples/sample";
import summarizeSamples from "../../utils/summarizeSamples";
import StatTile from "../../Components/StatTile/StatTile";
import Panel from "../../Components/Panel/Panel";
import needsAttention from "../../utils/needsAttention";
import Pill from "../../Components/Pill/Pill";

type ScientistHomeProps = {
  name: string;
  samples: SampleAPI[];
  loading: boolean;
  error: string | null;
};

export default function ScientistHome({ name, samples, loading, error }: ScientistHomeProps) {
  const summary = summarizeSamples(samples);
  const needsAttentionSamples = needsAttention(samples);
  console.log(needsAttentionSamples);

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Welcome, {name}</h1>
        <Link
          to="/submit-samples"
          className="w-full rounded bg-blue-600 px-4 py-2 text-center text-white md:w-auto"
        >
          Submit a sample
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
      ) : samples.length === 0 ? (
        <p className="mt-6 text-gray-600">You haven't submitted any samples yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatTile label="Pending" value={summary.pending} />
          <StatTile label="In progress" value={summary.in_progress} />
          <StatTile label="Completed" value={summary.completed} />
          <StatTile
            label="Out of spec"
            value={summary.out_of_spec}
            highlight={summary.out_of_spec > 0}
          />
          <Panel title="Needs attention" className="mt-6">
            {needsAttentionSamples.length === 0 ? (
              <p className="text-gray-600">Nothing needs your attention right now.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {needsAttentionSamples.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/samples/${s.id}`}
                      className="flex flex-wrap items-center justify-between gap-2 py-3 hover:bg-gray-50"
                    >
                      <span className="font-medium">{s.name}</span>
                      <span className="flex items-center gap-3 text-sm text-gray-600">
                        <Pill status={s.test_status ?? "pending"} />
                        {s.out_of_spec && (
                          <span className="font-medium text-red-600">Out of spec</span>
                        )}
                        <span>{s.due_date ? `Due ${s.due_date}` : "No due date"}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/view-samples"
              className="mt-4 inline-block text-sm text-blue-600 hover:underline"
            >
              View all samples →
            </Link>
          </Panel>
        </div>
      )}
    </div>
  );
}
