import TableHeader from "./TableHeader";

export default function Table() {
  const testTitles = ["ID", "Name", "Team Name", "Email"];
  return (
    <>
      <h1>Table Component</h1>
      <TableHeader header={testTitles} />
    </>
  )
}