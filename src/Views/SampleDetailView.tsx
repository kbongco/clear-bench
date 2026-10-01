import DetailList from "../Components/DetailList/DetailList";
import Panel from "../Components/Panel/Panel";
import Pill from "../Components/Pill/Pill";
import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";

export default function SampleDetailView() {
const list = [
  { label: "Owner", value: "Dr. Alice Nguyen" },
  { label: "Team", value: "Food Safety" },
  { label: "Lab tech", value: "James Patel" },
  { label: "Status", value: <Pill status="completed" /> },
  { label: "Sample type", value: "Food Safety" },
  { label: "Start", value: "2025-07-20" },
  { label: "Due", value: "2025-08-03" },
  { label: "Duration", value: "2 weeks" },
  { label: "Bottles", value: 3 },
  { label: "Storage", value: "4°C, 25°C" },
  { label: "Notes", value: null },
];
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1>Components Testing </h1>

      <Pill status='completed' />
      <Pill status='in_progress' />
      <Pill status='pending' />
      <Pill status='rejected' />
      <Pill status='on_hold'/>
      
      <SpecIndicator outOfSpec={false} />
      <SpecIndicator outOfSpec={true} />
      <Panel title='Test Panel'>
        <DetailList items={list} />
      </Panel>
      {/* <Card/> */}
    </div>
  )
}