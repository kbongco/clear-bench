  export const sampleInfo = {
    id: 'SMP-2024-001234',
    name: 'Ground Beef Sample - Lot #4527',
    type: 'Food',
    collectionDate: '2024-11-08',
    receivedDate: '2024-11-09',
    priority: 'High',
    analyst: 'Dr. Sarah Chen',
    location: 'Processing Plant - Line 2'
  };

  export const status = {
    overall: 'In Progress',
    completedTests: 7,
    totalTests: 18,
    progress: 39
  };

  // Structure: bottles/conditions -> tests within each bottle
  export const bottles = {
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

  export const trendData = [
    { date: '11/01', pH: 7.1, turbidity: 2.1, chlorine: 1.7 },
    { date: '11/03', pH: 7.3, turbidity: 2.4, chlorine: 1.9 },
    { date: '11/05', pH: 7.0, turbidity: 2.0, chlorine: 1.6 },
    { date: '11/07', pH: 7.2, turbidity: 2.2, chlorine: 1.8 },
    { date: '11/10', pH: 7.2, turbidity: 2.3, chlorine: 1.8 }
  ];
