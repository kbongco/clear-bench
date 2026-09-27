import type { Options } from "../../Components/ComponentInterfaces/SelectInterface";
import Input from "../../Components/Input/Input";
import SelectComponent from "../../Components/Select/Select";
import Table from "../../Components/Table/Table";
import type { SampleWithOwner } from "../../types/Samples/sample";

export default function LabTechAllSamples({ samples }: { samples: SampleWithOwner[] }) {
  const teamOptions: Options[] = [
  { value: '', label: 'All teams' },
  { value: 'Food', label: 'Food' },
  { value: 'Cosmetics', label: 'Cosmetics' },
  { value: 'Environmental', label: 'Environmental' },
];

const statusOptions: Options[] = [
  { value: '', label: 'All statuses' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'needs_attention', label: 'Needs attention' },
];
  
  const tableHeaders = ['Name', 'Scientist', 'Team', 'Status', 'Due'];
  return (<>
    <h1>All Samples Here</h1>
    <div className='flex justify-around flex-col'>
      <div className='flex justify-around'>
    <Input type={""} placeholder={""} value={""} onChange={() => { }} name={""} label="Search Items" />
    <SelectComponent label={"Team"} name={""} onChange={() => { }} value={""} options={teamOptions} />
        <SelectComponent label={"Status"} name={""} onChange={() => { }} value={""} options={statusOptions} />
        </div>
      <div>
        <Table tableTitle="Lab Tech Samples" tableHeader={tableHeaders} data={[]} />
      </div>
    </div>
  </>)
}