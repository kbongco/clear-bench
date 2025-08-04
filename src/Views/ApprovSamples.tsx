import { useState } from "react";
import Card from "../Components/Card/Card";
import Table from "../Components/Table/Table";
import Modal from "../Components/Modal/Modal";
import TextArea from "../Components/Textarea/Textarea";

export default function ApproveSamples({ data }: any) {
  // parse JSON string data or empty array
  const [rows, setRows] = useState(() => JSON.parse(data || "[]"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [labTechComment, setLabTechComment] = useState("");

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
  const headers = ['Name', 'Owner', 'Status', 'Team Name', 'Update Status'];

  // Map original data to desired shape, add status if missing
  const dataToApprove = rows.map(row => ({
    name: row.sampleName,
    owner: row.sampleOwner,
    status: row.status || 'pending',
    teamName: row.teamName,
  }));

  const handleStatusUpdate = (index: number, newStatus: string) => {
    const updatedRows = [...rows];
    updatedRows[index].status = newStatus;
    setRows(updatedRows);
    setIsModalOpen(false);
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
          onClick={() => { setIsModalOpen(true), console.log('Clicked'), setSelectedSample(row), console.log(row,'test') }}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Approve/Reject
        </button>
      </td>
    </tr>
  );

  return (
    <div className="ml-4">
      <Card title="Reference sheet" description={labTechNotes} />
      <div className="mt-6">
        <Table
          tableTitle="Approve Samples"
          data={dataToApprove}
          tableHeader={headers}
          renderRow={renderRow}
        />
      </div>

      {/* Modal for Approve/Reject */}
      {selectedSample && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">Approve or Reject</h2>
          <p>
            Are you sure you want to take action on{" "}
            <strong>{selectedSample.name}</strong> from{" "}
            <strong>{selectedSample.owner}</strong>?
          </p>
            <TextArea
              label="Reject"
  value={labTechComment}
  onChange={(e) => setLabTechComment(e.target.value)}
  placeholder="Enter reason for Rejection (if applicable)"
  className="w-full p-2 border border-gray-300 rounded mt-2"
/>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => handleStatusUpdate(selectedSample.originalIndex, "Approved")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusUpdate(selectedSample.originalIndex, "Rejected")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
