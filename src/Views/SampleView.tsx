import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";

export default function SampleView({ data }: any) {
  // console.log(data[0].sample.name, 'data')
  console.log(data[0]?.sample?.out_of_spec, 'datas');
  const sample = data?.[0]?.sample;
    const outOfSpecStats = sample ? (sample.out_of_spec ? "True" : "False") : "N/A"
  console.log(data, 'datas');
  return ( 
    <>
      <div className='p-10 flex justify-between'>
        <h1 className='text-5xl'>{data[0]?.sample?.name}</h1>
        <div className='flex content-center items-center gap-3'>
          <SpecIndicator stats={outOfSpecStats} />
        </div>
      </div>
    </>
  )
}