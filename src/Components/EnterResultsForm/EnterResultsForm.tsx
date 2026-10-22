import { useState } from "react";
import type { SampleDetail } from "../../types/Results/results";
import type { ProductSpec } from "../../types/Specs/specs";
import { cellKey, type CellValues } from "../../utils/resultCells";
import formatLimit from "../../utils/formatLimit";

type EnterResultsFormProps = {
  sample: SampleDetail;
  specs: ProductSpec[];
};

export default function EnterResultsForm({ sample, specs }: EnterResultsFormProps) {
  const [cells, setCells] = useState<CellValues>({});
  const [details, setDetails] = useState({
    test_method: "",
    instrument_used: "",
    batch_number: "",
    analyst_comments: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const specFor = (testType: string) => specs.find((s) => s.test_type === testType);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">Test</th>
            {sample.temperature.map((condition) => (
              <th key={condition} scope="col">
                {condition}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sample.test_types.map((testType) => {
            const spec = specFor(testType);
            return (
              <tr key={testType}>
                <th scope="row">
                  {spec?.parameter_name ?? testType}
                  <span className="block text-sm text-gray-500">
                    {spec ? formatLimit(spec) : ""}
                  </span>
                </th>
                {sample.temperature.map((condition) => (
                  <td key={condition.id}>
                    <input
                      type="number"
                      step="any"
                      aria-label={`${spec?.parameter_name ?? testType} at ${condition}`}
                      value={cells[cellKey(testType, condition)] ?? ""}
                      onChange={(e) =>
                        setCells((prev) => ({
                          ...prev,
                          [cellKey(testType, condition)]: e.target.value,
                        }))
                      }
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
