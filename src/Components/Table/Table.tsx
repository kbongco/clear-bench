import type { Table } from "../ComponentInterfaces/TableInterface";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function Table({ tableTitle, data, tableHeader, tableBody }: Table) {
  console.log(data);
  const testTitles = ["ID", "Name", "Team Name", "Email"];
  const testData = [
  {
    ID: "01",
    Name: "Chibi Skye",
    "Team Name": "Cosmetics",
    Email: "mail@mail.com",
  },
  {
    ID: "02",
    Name: "Alex Luna",
    "Team Name": "Food",
    Email: "alex@example.com",
  },
];
  return (
    <>
      <h1 className='text-3xl font-bold text-blue-600 text-center mb-4'>{tableTitle}</h1>
      <table className="shadow-lg bg-white">
        <TableHeader header={tableHeader || []} />
        <TableBody data={data} headers={tableHeader} />
      </table>
    </>
  )
}