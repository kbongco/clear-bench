interface SampleInfo {
  id: string;
  name: string;
  type: string;
  collectionDate: string;
  receivedDate: string;
  priority: string;
  analyst: string;
  location: string;
}

export default function SampleInfoCard({ sampleInfo }: { sampleInfo: SampleInfo }) {
  const { id, name, type, collectionDate, receivedDate, priority, analyst, location } = sampleInfo;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Sample Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Sample ID</p>
          <p className="text-lg font-medium text-gray-900">{id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Sample Name</p>
          <p className="text-lg font-medium text-gray-900">{name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Type</p>
          <p className="text-lg font-medium text-gray-900">{type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Collection Date</p>
          <p className="text-lg font-medium text-gray-900">{collectionDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Received Date</p>
          <p className="text-lg font-medium text-gray-900">{receivedDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Priority</p>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-full">
            {priority}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-600">Lab Tech</p>
          <p className="text-lg font-medium text-gray-900">{analyst}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Location</p>
          <p className="text-lg font-medium text-gray-900">{location}</p>
        </div>
      </div>
    </div>
  )
}
