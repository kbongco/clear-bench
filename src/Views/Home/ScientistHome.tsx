import type { SampleAPI } from "../../types/Samples/sample";
import summarizeSamples from "../../utils/summarizeSamples";

type ScientistHomeProps = {
  name: string;
  samples: SampleAPI[];
  loading: boolean;
  error: string | null;
};

export default function ScientistHome({ name, samples, loading, error }: ScientistHomeProps) {
  // const summary = summarizeSamples(samples);
  // console.log(samples)
  // console.log(summary)
  // console.log('test')

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {name}</h1>
      {/* loading / error / empty state */}
      {/* tiles: Pending, In progress, Completed, Out of spec */}
      {/* needs attention */}
      {/* links: Submit a sample, View all samples */}
    </div>
  );
}
