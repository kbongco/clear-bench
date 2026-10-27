import { Link } from "react-router-dom";
import type { SampleAPI } from "../../types/Samples/sample";
import summarizeSamples from "../../utils/summarizeSamples";
import StatTile from "../../Components/StatTile/StatTile";

type ScientistHomeProps = {
  name: string;
  samples: SampleAPI[];
  loading: boolean;
  error: string | null;
};

export default function ScientistHome({ name, samples, loading, error }: ScientistHomeProps) {
  const summary = summarizeSamples(samples);

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
        </div>
      )}
    </div>
  );
}
