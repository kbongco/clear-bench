import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";
import Table from "../Components/Table/Table";
import TabLayout from "../Components/Tabs/TabLayout";
import Tabs from "../Components/Tabs/Tabs";

export default function SampleView({ data }: any) {
  console.log(data[0]?.sample?.out_of_spec, 'datas');
  const sample = data?.[0]?.sample;
  const results = data?.[0]?.results;
  console.log(data?.[0]?.sample, 'sample');
  console.log(data?.[0]?.results);

  if (!sample) {
    return <p>Loading...</p>;
  }

  if (!results) {
    return <p>Loading...</p>;
  }

  const scientistName = sample.scientist?.name || "N/A";
  const labTechName = sample.lab_tech?.name || "N/A";
  const outOfSpecStats = sample.out_of_spec ? "True" : "False";
  const resultsTable = 'Sample Results'
  const mockData = [
    {
      expected_range_max: 7.5,
      expected_range_min: 6.5,
      id: 1,
      is_within_spec: false,
      measured_value: 6.2,
      notes: "Low pH detected.",
      parameter_name: "pH",
      result_id: 1,
      specification_limit: 6.5,
      unit: ""
    },
    {
      expected_range_max: 110,
      expected_range_min: 100,
      id: 2,
      is_within_spec: false,
      measured_value: 120.5,
      notes: "Exceeds upper limit.",
      parameter_name: "Concentration",
      result_id: 1,
      specification_limit: 110,
      unit: "mg/L"
    }
  ];
  console.log(data[0]?.results, 'res')
  const minPh = data?.[0]?.results.expected_range_min;
  const maxPh = results.expected_range_max;
  console.log(minPh, maxPh, 'minMax');
  console.log(data);
  return (
    <>
      <div className='pt-10 px-10 pb-5'>
        <div className="grid grid-cols-3 gap-4 items-center">
          <h1 className='text-5xl'>{data[0]?.sample?.name}</h1>
          <div></div>
          <div className='flex content-center items-center gap-3 justify-end'>
            <SpecIndicator stats={outOfSpecStats} />
          </div>
        </div>
      </div>

      <div className="px-10">
        <div className="grid grid-cols-3 gap-4 text-3xl">
          <h2>{data[0]?.sample?.id}</h2>
          <h2>{data[0]?.sample?.test_start}</h2>
          <h2>{data[0]?.sample?.due_date}</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 text-2xl pt-5">
          <h2>{scientistName}</h2>
          <h2>{labTechName}</h2>
          <div />
        </div>
      </div>

      <div className='p-10'>
        <Tabs>
          <TabLayout title="Overview">
            <div className='py-10'>
              <h1 className='text-3xl'>{data[0]?.sample?.name}</h1>
              <h2 className='text-3xl py-2'>{data[0]?.sample?.test_start} - {data[0]?.sample?.due_date}</h2>
              <h3 className='text-3xl'>Type of Test: {data[0]?.sample.sample_type}</h3>
            </div>
            <div className='py-5'>
              <h3 className='text-3xl'>Current Status: {data[0]?.sample.test_status}</h3>
            </div>
            <div className='py-4'>
              <h3 className='text-3xl'>Sample Specifications:</h3>
              <h4 className='text-3xl'> Min pH:{data[0]?.results?.expected_range_min} </h4>
              <h4 className='text-3xl'> Max pH:{data[0]?.results?.expected_range_min} </h4>
            </div>
          </TabLayout>
          <TabLayout title="Results">
            <div className='py-5'>
            </div>
                  <table className="w-full table-auto bg-white border-collapse border border-gray-200">
              <Table tableTitle={resultsTable} tableHeader={['ID', 'Name', 'Value', 'Unit', 'Min Range', 'Max Range']} data={mockData} />
              </table>
          </TabLayout>
          <TabLayout title="Graphs"><div className='py-10'>This is a test of the Content that is here</div></TabLayout>
          <TabLayout title="History"><div className='py-10'>This is a test of the Content that is here</div></TabLayout>
        </Tabs>
      </div>
    </>
  )

}