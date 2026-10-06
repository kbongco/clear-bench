import { useMemo, useState } from "react";
import type { Options } from "../../Components/ComponentInterfaces/SelectInterface";
import Input from "../../Components/Input/Input";
import SelectComponent from "../../Components/Select/Select";
import Table from "../../Components/Table/Table";
import type { SampleWithOwner } from "../../types/Samples/sample";
import { filterSamples } from "../../utils/filterSamples";
import { toSampleRows } from "../../utils/toSampleRows";
import { Link } from "react-router-dom";

export default function LabTechAllSamples({
  samples,
  status,
  onStatusChange,
  department,
  onDepartmentChange,
  teams,
}: {
  samples: SampleWithOwner[];
  status: string;
  onStatusChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  teams: string[];
}) {
  const [search, setSearch] = useState("");

  const teamOptions: Options[] = [
    { value: "", label: "All teams" },
    ...teams.map((team) => ({ value: team, label: team })),
  ];

  const statusOptions: Options[] = [
    { value: "", label: "All statuses" },
    { value: "in_progress", label: "In progress" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
  ];
  const searchedSamples = useMemo(() => filterSamples(samples, search), [samples, search]);

  const rows = toSampleRows(searchedSamples).map((row) => ({
    ...row,
    Name: (
      <Link to={`/samples/${row.id}`} className="text-blue-600 hover:underline">
        {row.Name}
      </Link>
    ),
  }));

  const tableHeaders = ["Name", "Scientist", "Team", "Status", "Due"];
  return (
    <>
      <div className="flex justify-around flex-col pt-4">
        <div className="flex justify-around">
          <Input
            type={""}
            placeholder={""}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            name={""}
            label="Search Items"
          />
          <SelectComponent
            label={"Team"}
            name={"Team"}
            onChange={(e) => {
              onDepartmentChange(e.target.value);
            }}
            value={department}
            options={teamOptions}
          />
          <SelectComponent
            label={"Status"}
            name={"Status"}
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            options={statusOptions}
          />
        </div>
        <div>
          {rows.length === 0 ? (
            <p>No samples match your search.</p>
          ) : (
            <Table tableTitle="Lab Tech Samples" tableHeader={tableHeaders} data={rows} />
          )}
        </div>
      </div>
    </>
  );
}
