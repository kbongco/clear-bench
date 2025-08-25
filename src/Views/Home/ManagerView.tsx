import Chips from "../../Components/Chips/Chips";

export default function ManagerView({ scientist, samples }: any) {

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
    return {
      ...manager,
      samples: reportsSamples.filter(s => s.scientist_id === manager.id),
    };
  });
  
  return (
    <>
      <div className='p-4'>
        <h1 className='text-center text-2xl'>Current Direct Reports</h1>
      </div>
      <div className="flex flex-wrap gap-6 p-6 justify-start">
        {teamSamples.map((manager: any) => {
          const ownedSamples = manager.samples.filter((sample: any) => 
            sample.scientist_id === manager.id
          );

          const managerSpecificContent = (
            <div>
              {ownedSamples.length > 0 ? (
                <ul className="list-disc list-inside">
                  {ownedSamples.map((sample: any) => (
                    <li key={sample.id}>
                      {sample.name} - Status: {sample.test_status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No samples owned by this scientist</p>
              )}
            </div>
          );

          return (
            <div key={manager.id} className="min-w-64 max-w-80">
              <Chips 
                title={manager.name} 
                subTitle={`Owned samples (${ownedSamples.length})`}
                content={managerSpecificContent} 
              />
            </div>
          );
        })}
      </div>
    </>
  );
}