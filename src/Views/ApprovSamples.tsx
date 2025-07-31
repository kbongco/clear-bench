import { useState } from "react";
import Card from "../Components/Card/Card";
import Table from "../Components/Table/Table";

export default function ApproveSamples({ data }: any) {
  // parse JSON string data or empty array
  const [rows, setRows] = useState(() => JSON.parse(data || "[]"));

  const labTechNotes = (
    <span>
      <ol>
        <li>All samples submitted must have uploaded a file</li>
        <li>If all of the above is selected, then all temperatures will be done</li>
        <li>Do not approve unless all items are there</li>
      </ol>
    </span>
  );

  // Headers including approve/reject columns
  const headers = ['Name', 'Owner', 'Status', 'Team Name', 'Approve', 'Reject'];

  // Map original data to desired shape, add status if missing
  const dataToApprove = rows.map(row => ({
    name: row.sampleName,
    owner: row.sampleOwner,
    status: row.status || 'pending',
    teamName: row.teamName,
  }));

  const handleAction = (index: number, status: string) => {
    const updated = [...rows];
    updated[index].status = status;
    setRows(updated);
  };

  // Custom render row with buttons
  const renderRow = (row: any, index: number) => (
    <tr key={index} className="border-b border-gray-200">
      <td className="text-center px-4 py-2">{row.name}</td>
      <td className="text-center px-4 py-2">{row.owner}</td>
      <td className="text-center px-4 py-2">{row.status}</td>
      <td className="text-center px-4 py-2">{row.teamName}</td>
      <td className="text-center px-4 py-2">
        <button
          onClick={() => handleAction(index, 'Approved')}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Approve
        </button>
      </td>
      <td className="text-center px-4 py-2">
        <button
          onClick={() => handleAction(index, 'Rejected')}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Reject
        </button>
      </td>
    </tr>
  );

  return (
    <div className="ml-4">
      <Card title="Reference sheet" description={labTechNotes} />
      <div>
        <Table
          tableTitle="Approve Samples"
          data={dataToApprove}
          tableHeader={headers}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
}
