import type { Options } from "../../Components/ComponentInterfaces/SelectInterface";
import Input from "../../Components/Input/Input";
import SelectComponent from "../../Components/Select/Select";
import Table from "../../Components/Table/Table";

export default function ScientistAllSamples() {
  const statusOptions: Options[] = [
    { value: "", label: "All statuses" },
    { value: "in_progress", label: "In progress" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
  ];

  const tableHeaders = ["Name", "Scientist", "Status", "Due"];
  return (
      <div className="flex justify-around flex-col pt-4">
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
            data={[]}
          />
        </div>
      </div>
  );
}
