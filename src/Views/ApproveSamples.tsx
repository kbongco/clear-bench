import type { SampleWithOwner } from "../types/Samples/sample";

interface ApproveSamplesProps {
  samples: SampleWithOwner[];
}

export default function ApproveSamples({ samples }: ApproveSamplesProps) {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Approve samples</h1>
      <p className="text-gray-600 mt-1">{samples.length} waiting for review</p>

      {samples.length === 0 ? (
        <p className="mt-6 text-gray-500">No samples waiting to be approved</p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {samples.map((sample) => (
            <li key={sample.id} className="bg-white border border-gray-200 rounded-lg p-4">
              {sample.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
