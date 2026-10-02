import { Link } from "react-router-dom";
import DetailList from "../Components/DetailList/DetailList";
import Panel from "../Components/Panel/Panel";
import Pill from "../Components/Pill/Pill";
import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";
import type { SampleDetail as SampleDetailData } from "../types/Results/results";

export default function SampleDetailView({ samples }): SampleDetailData {
  console.log(samples);

  const items = [
  { label: "Owner", value: samples.scientist.name },
  { label: "Team", value: samples.scientist.department },
  { label: "Lab tech", value: samples.lab_tech?.name },
  { label: "Sample type", value: samples.sample_type },
  { label: "Start", value: samples.test_start },
  { label: "Due", value: samples.due_date },
  { label: "Duration", value: samples.test_duration },
  { label: "Bottles", value: samples.totalBottles },
  { label: "Storage", value: samples.temperature.join(", ") },
  { label: "Notes", value: samples.notes },
];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <div>
        <h1 className="text-5xl">{samples.name}</h1>
          <Link to='/view-samples'>Go back</Link>
          </div>
        <div className="flex gap-4">
          <Pill status={samples.test_status} />
          <div>
            <SpecIndicator outOfSpec={samples.outOfSpec} />
          </div>
        </div>
      </div>
      {/* <SpecIndicator outOfSpec={true} /> */}
      <Panel title="Test Panel">
        <DetailList items={items} />
      </Panel>
    </div>
  );
}
