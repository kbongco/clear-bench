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

  const tableHeaders = ["Name", "Scientist", "Team", "Status", "Due"];
  return (
    <>
      <div className="flex justify-around flex-col pt-4">
        <div className="flex justify-around">
          <Input
            type={""}
            placeholder={""}
            value={""}
            onChange={() => {}}
            name={""}
            label="Search Items"
          />
          <SelectComponent
            label={"Team"}
            name={"Team"}
            onChange={() => {}}
            value={""}
            options={statusOptions}
          />
        </div>
        <div>
          <Table
            tableTitle="Your samples"
            tableHeader={tableHeaders}
            data={[]}
          />
        </div>
      </div>
    </>
  );
}
