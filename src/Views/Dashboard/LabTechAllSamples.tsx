import { useMemo, useState } from "react";
import type { Options } from "../../Components/ComponentInterfaces/SelectInterface";
import Input from "../../Components/Input/Input";
import SelectComponent from "../../Components/Select/Select";
import Table from "../../Components/Table/Table";
import type { SampleWithOwner } from "../../types/Samples/sample";
import { formatStatus } from "../../utils/formatStatus";
import { filterSamples } from "../../utils/filterSamples";

export default function LabTechAllSamples({ samples, status, onStatusChange }: { samples: SampleWithOwner[], status: string, onStatusChange: (value: string) => void }) {
  const [search, setSearch] = useState('');
  
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
  { value: 'pending', label: 'Pending' },
];
  const searchedSamples = useMemo(() => filterSamples(samples, search), [samples, search]);  

  const rows = searchedSamples.map((sample) => ({
  Name: sample.name ?? '-',
  Scientist: sample.scientist.name ?? '-',
  Team: sample.scientist.department ?? '-',
  Status: formatStatus(sample.test_status) ?? '-',
  Due: sample.due_date ?? '-',
  }));
  

  
  const tableHeaders = ['Name', 'Scientist', 'Team', 'Status', 'Due'];
  return (<>
    <h1>All Samples Here</h1>
    <div className='flex justify-around flex-col'>
      <div className='flex justify-around'>
    <Input type={""} placeholder={""} value={search} onChange={(e) => {setSearch(e.target.value) }} name={""} label="Search Items" />
    <SelectComponent label={"Team"} name={""} onChange={() => { }} value={""} options={teamOptions} />
        <SelectComponent label={"Status"} name={""} value={status} onChange={(e) => onStatusChange(e.target.value)} options={statusOptions} />
        </div>
      <div>
       {rows.length === 0 ? (
  <p>No samples match your search.</p>
) : (
  <Table tableTitle="Lab Tech Samples" tableHeader={tableHeaders} data={rows} />
)}
      </div>
    </div>
  </>)
}