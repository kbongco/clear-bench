import { Link } from "react-router-dom";
import DetailList from "../Components/DetailList/DetailList";
import Panel from "../Components/Panel/Panel";
import Pill from "../Components/Pill/Pill";
import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";
import type { Result, SampleDetail as SampleDetailData } from "../types/Results/results";
import Table from "../Components/Table/Table";
import formatRange from "../utils/formatRange";
import Tabs from "../Components/Tabs/Tabs";
import TabLayout from "../Components/Tabs/TabLayout";

export default function SampleDetailView({ sample }: { sample: SampleDetailData }) {
  const items = [
    { label: "Owner", value: sample.scientist.name },
    { label: "Team", value: sample.scientist.department },
    { label: "Lab tech", value: sample.lab_tech?.name },
    { label: "Sample type", value: sample.sample_type },
    { label: "Start", value: sample.test_start },
    { label: "Due", value: sample.due_date },
    { label: "Duration", value: sample.test_duration },
    { label: "Bottles", value: sample.totalBottles },
    { label: "Storage", value: sample.temperature.join(", ") },
    { label: "Notes", value: sample.notes },
  ];

  const resultItems = (result: Result) => [
    { label: "Outcome", value: result.overall_status === "pass" ? "Pass" : "Fail" },
    { label: "Method", value: result.test_method },
    { label: "Instrument", value: result.instrument_used },
    { label: "Batch", value: result.batch_number },
    { label: "Tested", value: result.test_completed_date?.slice(0, 10) },
    { label: "Reviewed", value: result.reviewed_date?.slice(0, 10) },
    { label: "Analyst comments", value: result.analyst_comments },
    { label: "Reviewer comments", value: result.reviewer_comments },
  ];

  const testHeaders = ["Parameter", "Measured", "Expected", "In spec"];

  const testRows = (result: Result) =>
    result.test_results.map((t) => ({
      Parameter: t.parameter_name,
      Measured: `${t.measured_value} ${t.unit}`.trim(),
      Expected: formatRange(t.expected_range_min, t.expected_range_max),
      "In spec": t.is_within_spec ? "✓" : "✗",
    }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{sample.name}</h1>
          <Link className="text-sm text-blue-600 hover:underline" to="/view-samples">
            Go back
          </Link>
        </div>
        <div className="flex gap-4">
          <Pill status={sample.test_status ?? "pending"} />
          <div>
            <SpecIndicator outOfSpec={sample.out_of_spec ?? false} />
          </div>
        </div>
      </div>

      {/* <Panel title="Sample Information">
        <DetailList items={items} />
      </Panel>
      <div className="mt-4">
        <Panel title="Results">
          {sample.results.length === 0 ? (
            <p className="text-gray-500">No results yet.</p>
          ) : (
            sample.results.map((result) => (
              <div key={result.id} className="flex flex-col gap-4">
                <DetailList items={resultItems(result)} />
                <Table tableTitle="" tableHeader={testHeaders} data={testRows(result)} />
              </div>
            ))
          )}
        </Panel>
      </div> */}

      <Tabs label="test">
        <TabLayout title="Overview">
          <Panel title="Sample Information">
            <DetailList items={items} />
          </Panel>
        </TabLayout>
        <TabLayout title="Results">
          <div className="mt-4">
            <Panel title="Results">
              {sample.results.length === 0 ? (
                <p className="text-gray-500">No results yet.</p>
              ) : (
                sample.results.map((result) => (
                  <div key={result.id} className="flex flex-col gap-4">
                    <DetailList items={resultItems(result)} />
                    <Table tableTitle="" tableHeader={testHeaders} data={testRows(result)} />
                  </div>
                ))
              )}
            </Panel>
          </div>
        </TabLayout>
        <TabLayout title="History">
          {/* History stuff */}
          <h1>Test</h1>
        </TabLayout>
      </Tabs>
    </div>
  );
}
