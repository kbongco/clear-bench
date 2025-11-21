import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { getStatusColor } from "../../utils/sampleView";

export default function SampleStatus({ status }: any) {

    const getStatusIcon = (status: any) => {
      switch (status.toLowerCase()) {
        case 'completed':
          return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'in progress':
          return <Clock className="w-4 h-4 text-yellow-500" />;
        case 'pending':
          return <AlertCircle className="w-4 h-4 text-gray-400" />;
        case 'failed':
          return <XCircle className="w-4 h-4 text-red-500" />;
        default:
          return null;
      }
    };
  return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Testing Status</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {getStatusIcon(status.overall)}
              <span className={`px-4 py-2 rounded-full font-medium ${getStatusColor(status.overall)}`}>
                {status.overall}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{status.completedTests} of {status.totalTests} tests completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${status.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
  )
}