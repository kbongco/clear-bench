import type { Options } from "../../Components/ComponentInterfaces/SelectInterface";
import Input from "../../Components/Input/Input";
import SelectComponent from "../../Components/Select/Select";

export default function LabTechAllSamples() {
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
  return (<>
    <h1>All Samples Here</h1>
    <div className='flex justify-around'>

    <Input type={""} placeholder={""} value={""} onChange={() => { }} name={""} label={""} />
    <SelectComponent label={"Team"} name={""} onChange={() => { }} value={""} options={teamOptions} />
    <SelectComponent label={"Status"} name={""} onChange={() => { }} value={""} options={statusOptions} />
    </div>
  </>)
}