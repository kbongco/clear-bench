import { useState } from "react";
import Table from "../../Components/Table/Table";
import { mockSamples } from "../../mockData/sampleData"
import Button from "../../Components/Button/Button";

export default function DashBoard() {
  const [filteredSamples, setFilteredSamples] = useState(mockSamples);
  console.log(mockSamples);
  const tableTitle = "Sample Dashboard"
  const filterMe = "Filter By"
  const titles = Object.keys(mockSamples[0]);

  const testFunction = () => {
    console.log('passing down works :) ')
  }


  return (
    <>
      <div className='display: flex justify-content: center items-center flex-col'>
        <Button buttonText={filterMe} onClick={testFunction} />
        <Table tableTitle={tableTitle} tableHeader={titles} data={filteredSamples} />
      </div>
    </>
  )
}