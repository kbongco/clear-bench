import { useState } from "react";
import Table from "../../Components/Table/Table";
import { mockSamples } from "../../mockData/sampleData"
import { sortOptions } from "../../mockData/SortOptions";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import SelectComponent from "../../Components/Select/Select";

export default function DashBoard() {
  const [filteredSamples, setFilteredSamples] = useState(mockSamples);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const tableTitle = "All Samples in Test"
  const filterMe = "Filter By"
  const titles = Object.keys(mockSamples[0]);
  const searchLabel = 'Filter by a specific value'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortedSamples = sortSamples(filteredSamples, e.target.value);
    setFilteredSamples(sortedSamples);
    setSortValue(e.target.value);
    console.log('Sorted by:', e.target.value);
  };
  const sortSamples = (samples: any, sortBy: string): any[] => {
    switch (sortBy) {
      case 'dateAsc':
        return [...samples].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'dateDesc':
        return [...samples].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'nameAsc':
        return [...samples].sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return [...samples].sort((a, b) => b.name.localeCompare(a.name));
      case 'totalAsc':
        return [...samples].sort((a, b) => a.total - b.total);
      case 'totalDesc':
        return [...samples].sort((a, b) => b.total - a.total);
      default:
        return samples;
    }
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
        <div>
        <Input label={searchLabel} type='text' placeholder='Search Value' value={searchValue} onChange={handleInputChange} name='Function'/> 
          <Button buttonText={filterMe} onClick={filterBySpecValue} />
          <SelectComponent
            label="Sort by"
            name="Sort"
            value={sortValue}
            options={sortOptions}
            onChange={(e) => {
              setSortValue(e.target.value);
              console.log('Sort selected:', e.target.value);
            }} />
        </div>
        <Table tableTitle={tableTitle} tableHeader={titles} data={filteredSamples} />
      </div>
    </>
  )
}