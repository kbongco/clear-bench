import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, AlertCircle, XCircle, Beaker } from 'lucide-react';
import SampleInfoCard from './SampleDetailComponents/SampleInfoCard';

export default function SampleView () {
  const [activeBottle, setActiveBottle] = useState('bottle-1');
  const [activeTest, setActiveTest] = useState('pH');

  const sampleInfo = {
    id: 'SMP-2024-001234',
    name: 'Ground Beef Sample - Lot #4527',
    type: 'Food',
    collectionDate: '2024-11-08',
    receivedDate: '2024-11-09',
    priority: 'High',
    analyst: 'Dr. Sarah Chen',
    location: 'Processing Plant - Line 2'
  };

  const status = {
    overall: 'In Progress',
    completedTests: 7,
    totalTests: 18,
    progress: 39
  };

  // Structure: bottles/conditions -> tests within each bottle
  const bottles = {
    'bottle-1': {
      id: 'BTL-001',
      name: 'Bottle 1 - Microbiology',
      condition: 'Refrigerated (4°C)',
      preservative: 'None',
      expirationDate: '2024-11-15',
      tests: {
        'total-coliform': {
          name: 'Total Coliform',
          result: '<1',
          unit: 'CFU/100mL',
          status: 'Completed',
          acceptableRange: '< 1',
          method: 'EPA 1603',
          analyst: 'Dr. Sarah Chen',
          completedDate: '2024-11-10',
          notes: 'Sample processed within hold time',
          isTimeSeries: false
        },
        'e-coli': {
          name: 'E. Coli',
          result: '<1',
          unit: 'CFU/100mL',
          status: 'Completed',
          acceptableRange: '< 1',
          method: 'EPA 1603',
          analyst: 'Dr. Sarah Chen',
          completedDate: '2024-11-10',
          notes: null
        },
        'heterotrophic': {
          name: 'Heterotrophic Plate Count',
          result: null,
          unit: 'CFU/mL',
          status: 'In Progress',
          acceptableRange: '< 500',
          method: 'SM 9215',
          analyst: 'John Smith',
          completedDate: null,
          notes: 'Incubation in progress',
          isTimeSeries: false
        },
        'legionella': {
          name: 'Legionella Monitoring',
          result: null,
          unit: 'CFU/mL',
          status: 'In Progress',
          acceptableRange: '< 100',
          method: 'ISO 11731',
          analyst: 'Dr. Sarah Chen',
          completedDate: null,
          notes: 'Multi-week monitoring program',
          isTimeSeries: true,
          timeSeriesData: [
            {
              week: 'Week 1',
              weekNumber: 1,
              testDate: '2024-11-04',
              result: 45,
              status: 'Completed',
              analyst: 'Dr. Sarah Chen',
              notes: 'Baseline reading'
            },
            {
              week: 'Week 2',
              weekNumber: 2,
              testDate: '2024-11-11',
              result: 38,
              status: 'Completed',
              analyst: 'Dr. Sarah Chen',
              notes: 'Trending down'
            },
            {
              week: 'Week 4',
              weekNumber: 4,
              testDate: '2024-11-25',
              result: null,
              status: 'Scheduled',
              analyst: 'Dr. Sarah Chen',
              notes: 'Scheduled for testing'
            },
            {
              week: 'Week 12',
              weekNumber: 12,
              testDate: '2025-01-20',
              result: null,
              status: 'Scheduled',
              analyst: 'Dr. Sarah Chen',
              notes: 'Long-term monitoring'
            },
            {
              week: 'Week 16',
              weekNumber: 16,
              testDate: '2025-02-17',
              result: null,
              status: 'Scheduled',
              analyst: 'Dr. Sarah Chen',
              notes: 'Final monitoring point'
            }
          ]
        }
      }
    },
    'bottle-2': {
      id: 'BTL-002',
      name: 'Bottle 2 - Chemistry',
      condition: 'Refrigerated (4°C)',
      preservative: 'H2SO4',
      expirationDate: '2024-11-22',
      tests: {
        'pH': {
          name: 'pH',
          result: 7.2,
          unit: 'pH units',
          status: 'Completed',
          acceptableRange: '6.5 - 8.5',
          method: 'EPA 150.1',
          analyst: 'Lisa Martinez',
          completedDate: '2024-11-09',
          notes: null,
          isTimeSeries: false
        },
        'turbidity': {
          name: 'Turbidity',
          result: 2.3,
          unit: 'NTU',
          status: 'Completed',
          acceptableRange: '< 5.0',
          method: 'EPA 180.1',
          analyst: 'Lisa Martinez',
          completedDate: '2024-11-09',
          notes: null,
          isTimeSeries: false
        },
        'chlorine': {
          name: 'Total Chlorine',
          result: 1.8,
          unit: 'mg/L',
          status: 'Completed',
          acceptableRange: '0.5 - 2.0',
          method: 'SM 4500-Cl',
          analyst: 'Lisa Martinez',
          completedDate: '2024-11-09',
          notes: 'Within acceptable range',
          isTimeSeries: false
        },
        'alkalinity': {
          name: 'Alkalinity',
          result: 120,
          unit: 'mg/L as CaCO3',
          status: 'Completed',
          acceptableRange: '20 - 200',
          method: 'SM 2320B',
          analyst: 'Lisa Martinez',
          completedDate: '2024-11-10',
          notes: null,
          isTimeSeries: false
        },
        'bod': {
          name: 'Biochemical Oxygen Demand (BOD)',
          result: null,
          unit: 'mg/L',
          status: 'In Progress',
          acceptableRange: '< 30',
          method: 'SM 5210B',
          analyst: 'Lisa Martinez',
          completedDate: null,
          notes: '5-day incubation test',
          isTimeSeries: true,
          timeSeriesData: [
            {
              week: 'Day 1',
              weekNumber: 0,
              testDate: '2024-11-08',
              result: 8.2,
              status: 'Completed',
              analyst: 'Lisa Martinez',
              notes: 'Initial DO reading'
            },
            {
              week: 'Day 5',
              weekNumber: 1,
              testDate: '2024-11-13',
              result: null,
              status: 'Scheduled',
              analyst: 'Lisa Martinez',
              notes: 'Final DO reading scheduled'
            }
          ]
        }
      }
    },
    'bottle-3': {
      id: 'BTL-003',
      name: 'Bottle 3 - Metals',
      condition: 'Refrigerated (4°C)',
      preservative: 'HNO3',
      expirationDate: '2024-12-08',
      tests: {
        'lead': {
          name: 'Lead',
          result: null,
          unit: 'µg/L',
          status: 'Pending',
          acceptableRange: '< 15',
          method: 'EPA 200.8',
          analyst: 'Michael Brown',
          completedDate: null,
          notes: 'Awaiting ICP-MS analysis',
          isTimeSeries: false
        },
        'copper': {
          name: 'Copper',
          result: null,
          unit: 'µg/L',
          status: 'Pending',
          acceptableRange: '< 1300',
          method: 'EPA 200.8',
          analyst: 'Michael Brown',
          completedDate: null,
          notes: 'Awaiting ICP-MS analysis',
          isTimeSeries: false
        },
        'arsenic': {
          name: 'Arsenic',
          result: null,
          unit: 'µg/L',
          status: 'Pending',
          acceptableRange: '< 10',
          method: 'EPA 200.8',
          analyst: 'Michael Brown',
          completedDate: null,
          notes: 'Awaiting ICP-MS analysis',
          isTimeSeries: false
        }
      }
    }
  };

  const trendData = [
    { date: '11/01', pH: 7.1, turbidity: 2.1, chlorine: 1.7 },
    { date: '11/03', pH: 7.3, turbidity: 2.4, chlorine: 1.9 },
    { date: '11/05', pH: 7.0, turbidity: 2.0, chlorine: 1.6 },
    { date: '11/07', pH: 7.2, turbidity: 2.2, chlorine: 1.8 },
    { date: '11/10', pH: 7.2, turbidity: 2.3, chlorine: 1.8 }
  ];

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBottleTestStats = (bottleKey) => {
    const tests = Object.values(bottles[bottleKey].tests);
    const completed = tests.filter(t => t.status.toLowerCase() === 'completed').length;
    return { completed, total: tests.length };
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
                    {currentTests[activeTest].timeSeriesData.filter(d => d.result !== null).length > 1 && (
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
                    )}
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

