import { useMemo, useState } from "react";
import type { Options } from "../../Components/ComponentInterfaces/SelectInterface";
import Input from "../../Components/Input/Input";
import SelectComponent from "../../Components/Select/Select";
import Table from "../../Components/Table/Table";
import type { SampleWithOwner } from "../../types/Samples/sample";
import { filterSamples } from "../../utils/filterSamples";
import { toSampleRows } from "../../utils/toSampleRows";

export default function ScientistAllSamples({
  department,
  samples,
}: {
  department: string;
  samples: SampleWithOwner[];
}) {
  const statusOptions: Options[] = [
    { value: "", label: "All statuses" },
    { value: "in_progress", label: "In progress" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
  ];
  const [search, setSearch] = useState("");

  const searchedSamples = useMemo(
    () => filterSamples(samples, search),
    [samples, search],
  );

  const tableHeaders = ["Name", "Scientist", "Status", "Due"];
  const rows = toSampleRows(searchedSamples);
  return (
    <div className="flex justify-around flex-col pt-4">
      <h1>{department}</h1>
      <div className="flex justify-around">
        <Input
          type={"text"}
          placeholder={"Search by name or scientist"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          name={""}
          label="Search Items"
        />
        <SelectComponent
          label={"Status"}
          name={"Status"}
          onChange={() => {}}
          value={""}
          options={statusOptions}
        />
      </div>
      <div>
        {rows.length === 0 ? (
          <p>No samples match your search.</p>
        ) : (
          <Table
            tableTitle="Your team's samples"
            tableHeader={tableHeaders}
            data={rows}
          />
        )}
      </div>
    </div>
  );
}
