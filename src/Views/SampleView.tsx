import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";
import Tabs from "../Components/Tabs/Tabs";

export default function SampleView({ data }: any) {
  // console.log(data[0].sample.name, 'data')
  console.log(data[0]?.sample?.out_of_spec, 'datas');
  const sample = data?.[0]?.sample;

  if (!sample) {
    // Optionally show a loading state
    return <p>Loading...</p>;
  }

  const scientistName = sample.scientist?.name || "N/A";
  const labTechName = sample.lab_tech?.name || "N/A";
  const outOfSpecStats = sample.out_of_spec ? "True" : "False";
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
          <div></div> {/* empty div to maintain grid structure */}
        </div>
      </div>

      <div className='p-10'>
        <Tabs/>
      </div>
    </>
  )
  
}