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
      <h1>{tableTitle}</h1>
      <table>
        <TableHeader header={tableHeader || []} />
        <TableBody data={data} headers={tableHeader} />
      </table>
    </>
  )
}