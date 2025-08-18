import { useState } from "react";
import Chips from "../../Components/Chips/Chips";



export default function ManagerView({ scientist, labTechs }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const manager = scientist.find(s => s.manager_id === 1);
  console.log(manager, 'manager');

  const directReports = labTechs.filter(lt => lt.manager_id === manager?.id);
  console.log(directReports, 'direct');
  return (
    <>
      <div className='p-4'>
        <h1 className='text-center text-2xl'>Current Direct Reports</h1>
      </div>
      <Chips manager={manager} />
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
