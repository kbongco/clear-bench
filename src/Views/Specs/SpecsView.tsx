import Panel from "../../Components/Panel/Panel";
import type { ProductSpec } from "../../types/Specs/specs";
import formatLimit from "../../utils/formatLimit";
import groupBySampleType from "../../utils/groupBySampleType";

type SpecsView = {
  specs: ProductSpec[];
  loading: boolean;
  error: string | null;
};

export default function SpecsView({ specs, loading, error }: SpecsView) {
  const grouped = groupBySampleType(specs);
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Product specs</h1>
        {loading && <p role="status">Loading specs…</p>}
        {error && <p role="alert">{error}</p>}
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(grouped).map(([sampleType, items]) => (
            <Panel key={sampleType} title={sampleType}>
              <ul className="divide-y divide-gray-100">
                {items.map((spec) => (
                  <li key={spec.id} className="flex items-baseline justify-between gap-4 py-2">
                    <div>
                      <p className="font-medium">{spec.parameter_name}</p>
                      <p className="text-sm text-gray-500">{spec.test_type}</p>
                    </div>
                    <span className="text-right">{formatLimit(spec)}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </div>
    </>
  );
}
