import type { Table } from "../ComponentInterfaces/TableInterface";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function Table({ tableTitle, data, tableHeader, renderRow }: Table) {
return (
  <div className="mx-auto max-w-6xl p-4">
    <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">{tableTitle}</h1>
    <div className="overflow-auto max-w-full shadow rounded-lg">
      <table className="w-full table-auto bg-white border-collapse border border-gray-200">
        <TableHeader header={tableHeader || []} />
        <TableBody data={data} headers={tableHeader} renderRow={renderRow} />
      </table>
    </div>
  </div>
);
}