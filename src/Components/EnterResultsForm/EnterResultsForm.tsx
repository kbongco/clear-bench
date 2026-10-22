import { useState } from "react";
import type { SampleDetail } from "../../types/Results/results";
import type { ProductSpec } from "../../types/Specs/specs";
import { buildResultValues, cellKey, isComplete, type CellValues } from "../../utils/resultCells";
import formatLimit from "../../utils/formatLimit";
import TextArea from "../Textarea/Textarea";
import Input from "../Input/Input";
import ResultCell from "./ResultCell";
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
  const nameFor = (testType: string) => specFor(testType)?.parameter_name ?? testType;
  const limitFor = (testType: string) => {
    const spec = specFor(testType);
    return spec ? formatLimit(spec) : "";
  };

  const setCell = (testType: string, condition: string, value: string) =>
    setCells((prev) => ({ ...prev, [cellKey(testType, condition)]: value }));

  const renderCell = (testType: string, condition: string) => (
    <ResultCell
      spec={specFor(testType)}
      label={`${nameFor(testType)} at ${condition}`}
      value={cells[cellKey(testType, condition)] ?? ""}
      onChange={(value) => setCell(testType, condition, value)}
    />
  );

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
    <form onSubmit={handleSubmit}>
      {/* Tablet and desktop: one row per test, one column per condition */}
      <table className="hidden w-full border-collapse text-left md:table">
        <thead>
          <tr className="border-b border-gray-200">
            <th scope="col" className="py-2 pr-4 text-sm font-semibold text-gray-600">
              Test
            </th>
            {sample.temperature.map((condition) => (
              <th
                key={condition}
                scope="col"
                className="py-2 pr-4 text-sm font-semibold text-gray-600"
              >
                {condition}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sample.test_types.map((testType) => (
            <tr key={testType}>
              <th scope="row" className="py-3 pr-4 align-top font-medium">
                {nameFor(testType)}
                <span className="block text-sm font-normal text-gray-500">
                  {limitFor(testType)}
                </span>
              </th>
              {sample.temperature.map((condition) => (
                <td key={condition} className="py-3 pr-4 align-top">
                  {renderCell(testType, condition)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phones: one card per condition */}
      <div className="space-y-4 md:hidden">
        {sample.temperature.map((condition) => (
          <section key={condition} className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 font-semibold">{condition}</h3>
            <ul className="divide-y divide-gray-100">
              {sample.test_types.map((testType) => (
                <li
                  key={testType}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3"
                >
                  <div>
                    <p className="font-medium">{nameFor(testType)}</p>
                    <p className="text-sm text-gray-500">{limitFor(testType)}</p>
                  </div>
                  {renderCell(testType, condition)}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Input
          id="test_method"
          label="Test method (optional)"
          name="test_method"
          type="text"
          value={details.test_method}
          onChange={(e) => setDetails((prev) => ({ ...prev, test_method: e.target.value }))}
        />
        <Input
          id="instrument_used"
          label="Instrument (optional)"
          name="instrument_used"
          type="text"
          value={details.instrument_used}
          onChange={(e) => setDetails((prev) => ({ ...prev, instrument_used: e.target.value }))}
        />
        <Input
          id="batch_number"
          label="Batch (optional)"
          name="batch_number"
          type="text"
          value={details.batch_number}
          onChange={(e) => setDetails((prev) => ({ ...prev, batch_number: e.target.value }))}
        />
      </div>

      <TextArea
        id="analyst_comments"
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
        className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50 md:w-auto"
      >
        {submitting ? "Saving…" : "Save results"}
      </button>
    </form>
  );
}
