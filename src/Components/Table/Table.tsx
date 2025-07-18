import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function Table() {
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
      <h1>Table Component</h1>
      <table>
      <TableHeader header={testTitles} />
        <TableBody data={testData} headers={testTitles} />
        </table>
    </>
  )
}