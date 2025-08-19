import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Chips({ manager, samples }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSamples = samples.filter(((s: any) => manager.id === s.scientist_id));


  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
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
            <a href={`mailto:${manager?.email}`} className="text-gray hover:text-gray-200">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
          <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className=''>
            <div className="mt-4 space-y-2">
            <h2>Recent samples in test</h2>
              {currentSamples.map((sample: any) => (
                <div
                  key={sample.id}
                  className="flex items-center space-x-3 bg-gray-100 p-2 rounded-md"
                >
                  <div>
                    <p className="font-medium">{sample.name}</p>
                    <p className="text-sm text-gray-600">{sample.sample_type}</p>
                    <p className="text-sm text-gray-600">Assigned to: {sample.labTech?.name || "Unassigned"}</p>
                    <p className="text-sm text-gray-600">Status: {sample.test_status}</p>
                  </div>
                </div>
              ))}
              {currentSamples.length === 0 && (
                <p className="text-gray-500 text-sm">No samples assigned</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>)
}