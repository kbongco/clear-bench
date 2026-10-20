import type { ProductSpec } from "../../types/Specs/specs";
import formatLimit from "../../utils/formatLimit";

type SpecsView = {
  specs: ProductSpec[];
  loading: boolean;
  error: string | null;
};

export default function SpecsView({ specs, loading, error }: SpecsView) {
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Product specs</h1>

        {loading && <p role="status">Loading specs…</p>}
        {error && <p role="alert">{error}</p>}

        <ul>
          {specs.map((spec) => (
            <li key={spec.id}>
              {spec.sample_type} · {spec.parameter_name}: {formatLimit(spec)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
