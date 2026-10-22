import { useState } from "react";
import type { SampleDetail } from "../../types/Results/results";
import type { ProductSpec } from "../../types/Specs/specs";
import { buildResultValues, cellKey, isComplete, type CellValues } from "../../utils/resultCells";
import formatLimit from "../../utils/formatLimit";
import TextArea from "../Textarea/Textarea";
import Input from "../Input/Input";
import { CURRENT_LAB_TECH_ID } from "../../services/currentUser";
import { enterResults } from "../../services/samples";

type EnterResultsFormProps = {
  sample: SampleDetail;
  specs: ProductSpec[];
  onSaved: (updated: SampleDetail) => void;
};

export default function EnterResultsForm({ sample, specs, onSaved }: EnterResultsFormProps) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop the browser from reloading the page
    setSubmitting(true);
    setError(null);
    try {
      const updated = await enterResults(sample.id, {
        lab_tech_id: CURRENT_LAB_TECH_ID,
        ...details,
        values: buildResultValues(cells, sample.test_types, sample.temperature, specs),
      });
      onSaved(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save results");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="py-2 pr-4" scope="col">
                Test
              </th>
              {sample.temperature.map((condition) => (
                <th className="py-2 pr-4 font-medium" key={condition} scope="col">
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
                  <th className="py-2 pr-4 font-medium" scope="row">
                    {spec?.parameter_name ?? testType}
                    <span className="block text-sm text-gray-500">
                      {spec ? formatLimit(spec) : ""}
                    </span>
                  </th>
                  {sample.temperature.map((condition) => (
                    <td key={condition} className="py-2 pr-4">
                      {spec?.kind === "pass_fail" ? (
                        <div
                          role="group"
                          aria-label={`${spec.parameter_name} at ${condition}`}
                          className="flex gap-2"
                        >
                          <button
                            className={`rounded border px-3 py-1 ${
                              cells[cellKey(testType, condition)] === "pass"
                                ? "border-green-600 bg-green-600 text-white"
                                : "border-gray-300"
                            }`}
                            type="button"
                            aria-pressed={cells[cellKey(testType, condition)] === "pass"}
                            onClick={() =>
                              setCells((prev) => ({
                                ...prev,
                                [cellKey(testType, condition)]: "pass",
                              }))
                            }
                          >
                            Pass
                          </button>
                          <button
                            className={`rounded border px-3 py-1 ${
                              cells[cellKey(testType, condition)] === "fail"
                                ? "border-red-600 bg-red-600 text-white"
                                : "border-gray-300"
                            }`}
                            type="button"
                            aria-pressed={cells[cellKey(testType, condition)] === "fail"}
                            onClick={() =>
                              setCells((prev) => ({
                                ...prev,
                                [cellKey(testType, condition)]: "fail",
                              }))
                            }
                          >
                            Fail
                          </button>
                        </div>
                      ) : (
                        <input
                          className="w-24 rounded border border-gray-300 px-2 py-1"
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
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Input
            label="Test method (optional)"
            name="test_method"
            type="text"
            value={details.test_method}
            onChange={(e) => setDetails((prev) => ({ ...prev, test_method: e.target.value }))}
          />
          {/* Instrument and Batch: same pattern, with their own keys */}
        </div>

        <TextArea
          label="Comments (optional)"
          name="analyst_comments"
          value={details.analyst_comments}
          onChange={(e) => setDetails((prev) => ({ ...prev, analyst_comments: e.target.value }))}
        />
        {error && (
          <p role="alert" className="mt-4 text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!isComplete(cells, sample.test_types, sample.temperature) || submitting}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save results"}
        </button>
      </form>
    </>
  );
}
