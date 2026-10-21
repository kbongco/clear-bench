import Panel from "../../Components/Panel/Panel";
import SpecsList from "../../Components/SpecsList/SpecsList";
import type { ProductSpec } from "../../types/Specs/specs";
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
              <SpecsList items={items} />
            </Panel>
          ))}
        </div>
      </div>
    </>
  );
}
