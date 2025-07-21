import { useState } from "react";
import Table from "../../Components/Table/Table";
import { mockSamples } from "../../mockData/sampleData"
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";

export default function DashBoard() {
  const [filteredSamples, setFilteredSamples] = useState(mockSamples);
  const [searchValue, setSearchValue] = useState('');
  console.log(mockSamples);
  const tableTitle = "Sample Dashboard"
  const filterMe = "Filter By"
  const titles = Object.keys(mockSamples[0]);
  const searchLabel = 'Filter by a specific value'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filterBySpecValue = () => {
    if (searchValue.trim() === '') {
      setFilteredSamples(mockSamples); 
      return;
    }
  
    const filtered = mockSamples.filter(sample =>
      sample.sampleType.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredSamples(filtered);
    console.log('filtered by spec with value:', searchValue);
  };


  return (
    <>
      <div className='display: flex justify-content: center items-center flex-col'>
        <Input label={searchLabel} type='text' placeholder='Test' value={searchValue} onChange={handleInputChange} name='Function'/> 
        <Button buttonText={filterMe} onClick={filterBySpecValue} />
        <Table tableTitle={tableTitle} tableHeader={titles} data={filteredSamples} />
      </div>
    </>
  )
}