import type { Options } from "../../Components/ComponentInterfaces/SelectInterface";
import Input from "../../Components/Input/Input";
import SelectComponent from "../../Components/Select/Select";
import Table from "../../Components/Table/Table";
import type { SampleWithOwner } from "../../types/Samples/sample";
import { toSampleRows } from "../../utils/toSampleRows";

export default function ScientistAllSamples({ department, samples }: { department: string, samples:SampleWithOwner[] }) {
  const statusOptions: Options[] = [
    { value: "", label: "All statuses" },
    { value: "in_progress", label: "In progress" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
  ];

  const tableHeaders = ["Name", "Scientist", "Status", "Due"];
  const rows = toSampleRows(samples);
  return (
    <div className="flex justify-around flex-col pt-4">
      <h1>{department}</h1>
        <div className="flex justify-around">
          <Input
            type={"text"}
            placeholder={"Search by name or scientist"}
            value={""}
            onChange={() => {}}
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
          <Table
            tableTitle="Your team's samples"
            tableHeader={tableHeaders}
            data={rows}
          />
        </div>
      </div>
  );
}
