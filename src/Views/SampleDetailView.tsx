import { Link } from "react-router-dom";
import DetailList from "../Components/DetailList/DetailList";
import Panel from "../Components/Panel/Panel";
import Pill from "../Components/Pill/Pill";
import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";
import type { SampleDetail as SampleDetailData } from "../types/Results/results";

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-semibold">{sample.name}</h1>
          <Link className='text-sm text-blue-600 hover:underline'to='/view-sample'>Go back</Link>
          </div>
        <div className="flex gap-4">
          <Pill status={sample.test_status ?? "pending"} />
          <div>
            <SpecIndicator outOfSpec={sample.out_of_spec ?? false} />
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
