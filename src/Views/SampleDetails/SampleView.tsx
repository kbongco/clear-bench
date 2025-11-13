import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, AlertCircle, XCircle, Beaker } from 'lucide-react';
import SampleInfoCard from './SampleDetailComponents/SampleInfoCard';
import { getBottleTestStats, getStatusColor } from '../../utils/sampleView';
import { bottles, sampleInfo, status } from '../../mockData/sampleDetails';

export default function SampleView () {
  const [activeBottle, setActiveBottle] = useState('bottle-1');
  const [activeTest, setActiveTest] = useState('pH');

  const getStatusIcon = (status) => {
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

  // Get current active test
  const currentBottle = bottles[activeBottle];
  const currentTests = currentBottle.tests;
  const testKeys = Object.keys(currentTests);
  
  // Set first test as active if current test doesn't exist in new bottle
  if (!currentTests[activeTest] && testKeys.length > 0) {
    setActiveTest(testKeys[0]);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sample Details</h1>
          <p className="text-gray-600 mt-1">View and manage sample test results across multiple bottles</p>
        </div>
        {/* Sample Information Card */}
        <SampleInfoCard sampleInfo={sampleInfo} />

        {/* Overall Status Card */}
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

        {/* Bottles/Conditions Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {Object.entries(bottles).map(([key, bottle]) => {
                const stats = getBottleTestStats(key);
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveBottle(key);
                      setActiveTest(Object.keys(bottle.tests)[0]);
                    }}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                      activeBottle === key
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Beaker className="w-4 h-4" />
                      <span>{bottle.name}</span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        {stats.completed}/{stats.total}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottle Details */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Bottle ID</p>
                <p className="font-medium text-gray-900">{currentBottle.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Storage Condition</p>
                <p className="font-medium text-gray-900">{currentBottle.condition}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Preservative</p>
                <p className="font-medium text-gray-900">{currentBottle.preservative}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expiration Date</p>
                <p className="font-medium text-gray-900">{currentBottle.expirationDate}</p>
              </div>
            </div>
          </div>

          {/* Test Tabs within Bottle */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto px-6">
              {Object.entries(currentTests).map(([key, test]) => (
                <button
                  key={key}
                  onClick={() => setActiveTest(key)}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTest === key
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {test.name}
                    {getStatusIcon(test.status)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Test Details */}
          <div className="p-6">
            {currentTests[activeTest] && (
              <div>
                {/* Check if this is a time-series test */}
                {currentTests[activeTest].isTimeSeries ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Time-Series Test Results</h3>
                    
                    {/* Test Info Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Method</p>
                          <p className="font-medium text-gray-900">{currentTests[activeTest].method}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Acceptable Range</p>
                          <p className="font-medium text-gray-900">{currentTests[activeTest].acceptableRange} {currentTests[activeTest].unit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Primary Analyst</p>
                          <p className="font-medium text-gray-900">{currentTests[activeTest].analyst}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Overall Status</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentTests[activeTest].status)}`}>
                            {currentTests[activeTest].status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Time Series Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100 border-b-2 border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time Point</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Test Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Result</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Analyst</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {currentTests[activeTest].timeSeriesData.map((dataPoint, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {dataPoint.week}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {dataPoint.testDate}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {dataPoint.result !== null 
                                  ? `${dataPoint.result} ${currentTests[activeTest].unit}`
                                  : '-'}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(dataPoint.status)}`}>
                                  {getStatusIcon(dataPoint.status)}
                                  {dataPoint.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {dataPoint.analyst}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {dataPoint.notes || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Time Series Chart */}
                    {/* {currentTests[activeTest].timeSeriesData.filter(d => d.result !== null).length > 1 && (
                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Trend Over Time</h4>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={currentTests[activeTest].timeSeriesData.filter(d => d.result !== null)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis label={{ value: currentTests[activeTest].unit, angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="result" 
                              stroke="#3b82f6" 
                              strokeWidth={2}
                              dot={{ fill: '#3b82f6', r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )} */}
                  </div>
                ) : (
                  // Regular single-result test display
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentTests[activeTest].status)}`}>
                            {currentTests[activeTest].status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Result:</span>
                          <span className="font-medium text-gray-900">
                            {currentTests[activeTest].result !== null 
                              ? `${currentTests[activeTest].result} ${currentTests[activeTest].unit}` 
                              : 'Pending'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Acceptable Range:</span>
                          <span className="font-medium text-gray-900">{currentTests[activeTest].acceptableRange}</span>
                        </div>
                        {currentTests[activeTest].notes && (
                          <div className="pt-2 border-t border-gray-200">
                            <p className="text-sm text-gray-600">Notes:</p>
                            <p className="text-sm text-gray-900 mt-1">{currentTests[activeTest].notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Method:</span>
                          <span className="font-medium text-gray-900">{currentTests[activeTest].method}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Analyst:</span>
                          <span className="font-medium text-gray-900">{currentTests[activeTest].analyst}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-medium text-gray-900">
                            {currentTests[activeTest].completedDate || 'Not completed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Trends Chart */}
        {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Historical Trends - Chemistry Parameters</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pH" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="turbidity" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="chlorine" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
      </div>
    </div>
  );
};

