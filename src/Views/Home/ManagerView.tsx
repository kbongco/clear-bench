import { useState } from "react";
import Chips from "../../Components/Chips/Chips";



export default function ManagerView({ scientist, labTechs, samples }: any) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(samples, 'sam')

  const manager = scientist.filter(s => s.manager_id === 1);
  // Need to dynamically set the manager id above ^^ 


const scientistWithSamples = manager.map(sc => {
  const scSamples = Object.keys(samples)
    .flatMap(key =>
      samples[key]
        .filter((s: any) => s.scientist_id === sc.id) // samples for this scientist
        .map((s: any) => ({
          ...s,
          scientist: sc,
          labTech: labTechs.find((lt: any) => lt.id === s.lab_tech_id)
        }))
    );

  return {
    ...sc,
    samples: scSamples
  };
});

console.log(scientistWithSamples, 'scientistWithSamples');



  // Chips should be individual for each manager
  // Right now the chip only takes in X amount of information
  // We need to make it dynamic and just not take in everything
  // We need to do the data manipulation in this Manager View
  // Inside the Chip component we need a picutre and the data 
  // Make it similar to the card component 

return (
  <>
    <div className='p-4'>
      <h1 className='text-center text-2xl'>Current Direct Reports</h1>
    </div>
    <Chips manager={manager} samples={scientistWithSamples} />
    {/* <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <img
            src={manager?.avatar || "https://i.pravatar.cc/100?img=1"}
            alt={manager?.name || "Manager"}
            className="w-12 h-12 rounded-full"
          />
            <h2 className="text-lg font-semibold">{manager?.name || "Manager"}</h2>
            <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {directReports.map((report: any) => (
            <div
              key={report.id}
              className="flex items-center space-x-3 bg-gray-100 p-2 rounded-md"
            >
              <img
                src={report.avatar || "https://i.pravatar.cc/100?img=2"}
                alt={report.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{report.name}</p>
                <p className="text-sm text-gray-600">{report.role}</p>
              </div>
            </div>
          ))}
          {directReports.length === 0 && (
            <p className="text-gray-500 text-sm">No direct reports</p>
          )}
        </div>
      )}
      </div> */}
  </>
);
}
