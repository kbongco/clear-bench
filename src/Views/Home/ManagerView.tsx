import Chips from "../../Components/Chips/Chips";



export default function ManagerView({ scientist, samples }: any) {

  console.log(samples, 'sam')


  // Make this dynamic eventually 
  const currentManager = scientist.filter(s => s.manager_id === 1);
  const allSamples = Object.entries(samples).flatMap(([scientistId, sampleArr]) => {
    return sampleArr.map(sample => ({
      ...sample,
      scientist_id: Number(scientistId)
    }));
  });

  const teamSamples = currentManager.map(manager => {
    const directReports = scientist.filter(s => s.manager_id === 1);
    const reportsSamples = allSamples.filter(s => directReports.some(r => r.id === s.scientist_id));
    console.log(reportsSamples, 'report')
    return {
      ...manager,
      samples: reportsSamples.filter(s => s.scientist_id === manager.id),
    };
  });

  const chipContent = (
    <div>
      {teamSamples.map((manager: any) => (
        <div key={manager.id}>
          {manager.samples.length > 0 ? (
            <ul className="list-disc list-inside">
              {manager.samples.map((sample: any) => (
                <li key={sample.id}>
                  {sample.name} - Status: {sample.test_status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No Samples in test</p>
          )}
        </div>
      ))}
    </div>
  )
  console.log('ManagerView rendering at:', Date.now());
  console.log('Computing expensive stuff...');
  return (
    <>
      <div className='p-4'>
        <h1 className='text-center text-2xl'>Current Direct Reports</h1>
      </div>
      <div className="flex flex-wrap gap-6 p-6 justify-start">
  {teamSamples.map((manager: any) => (
    <div key={manager.id} className="min-w-64 max-w-80">
      <Chips title={manager.name} subTitle='Samples in test' content={chipContent} />
    </div>
  ))}
</div>
    </>
  );
}
