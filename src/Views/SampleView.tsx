import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";
import TabLayout from "../Components/Tabs/TabLayout";
import Tabs from "../Components/Tabs/Tabs";

export default function SampleView({ data }: any) {
  console.log(data[0]?.sample?.out_of_spec, 'datas');
  const sample = data?.[0]?.sample;

  if (!sample) {
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
          <div/>
        </div>
      </div>

      <div className='p-10'>
        <Tabs>
          <TabLayout title="Overview"><div className='py-10'>This is a test of the Content that is here</div></TabLayout>
          <TabLayout title="Results"><div className='py-10'>This is a test of the Content that is here</div></TabLayout>
          <TabLayout title="Graphs"><div className='py-10'>This is a test of the Content that is here</div></TabLayout>
          <TabLayout title="History"><div className='py-10'>This is a test of the Content that is here</div></TabLayout>
        </Tabs>
      </div>
    </>
  )

}