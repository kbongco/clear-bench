import Table from "../../Components/Table/Table";
import { mockSamples } from "../../mockData/sampleData"

export default function DashBoard() {
  console.log(mockSamples);
  const namedSamples = mockSamples.map((name) => name.name);
  const titles = Object.keys(mockSamples[0]);
  console.log(titles);
  console.log(namedSamples);
  console.log(namedSamples.map((name)=> name.toUpperCase()));

  return (
    <>
      <Table />
      {/* <h1>Dashboard page</h1>
      <table>
        <thead>
          <tr>
            {titles.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockSamples.map((sample) => (
            <tr key={sample.id}>
              <td>{sample.id}</td>
              <td>{sample.name}</td>
              <td>{sample.owner.name}</td>
              <td>{sample.outOfSpec ? "Yes" : "No"}</td>
              <td>{sample.testStart.toLocaleDateString()}</td>
              <td>{sample.totalSamples}</td>
              <td>{sample.typeOfTest.typeOfTest}</td>
              <td>{sample.sampleType}</td>
              <td>{sample.testStatus}</td>
              <td>{sample.testDuration}</td>
              <td>{sample.dueDate.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  )
}