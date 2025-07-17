import type { Scientist } from "../Users/users";
import type {
  Sample,
  Milestone,
  Tests,
  TestDuration,
  TestStatus,
  SampleType,
  MilestoneTestEntry
} from "./types"; // adjust path as needed

// Scientists
export const mockScientists: Scientist[] = [
  { id: 1, name: "Dr. Alice Nguyen", department: "R&D" },
  { id: 2, name: "Dr. Jamal Ortega", department: "Microbiology" },
  { id: 3, name: "Dr. Lin Zhang", department: "Quality Assurance" }
];

// ✅ Sample 1: Food Sample - In Progress
export const sample1: Sample = {
  id: 1,
  name: "Tomato Sauce Batch A",
  owner: mockScientists[0],
  outOfSpec: false,
  testStart: new Date("2025-07-01"),
  totalSamples: 10,
  typeOfTest: {
    typeOfTest: "ph",
    lengthOfTest: "4-week"
  },
  sampleType: "food",
  testStatus: "in-progress",
  testDuration: "4-week",
  dueDate: new Date("2025-07-29")
};

export const milestones1: Milestone[] = [
  {
    week: "1-week",
    dueDate: new Date("2025-07-08"),
    tests: [
      {
        testType: { typeOfTest: "ph", lengthOfTest: "4-week" },
        unit: "pH",
        testedBy: mockScientists[1],
        inSpec: true,
        isComplete: true
      }
    ]
  },
  {
    week: "2-week",
    dueDate: new Date("2025-07-15"),
    tests: [
      {
        testType: { typeOfTest: "ph", lengthOfTest: "4-week" },
        unit: "pH",
        testedBy: mockScientists[2],
        inSpec: true,
        isComplete: true
      }
    ]
  }
];

// ✅ Sample 2: Cosmetic Sample - Completed
export const sample2: Sample = {
  id: 2,
  name: "Moisturizer Lot B",
  owner: mockScientists[2],
  outOfSpec: false,
  testStart: new Date("2025-06-01"),
  totalSamples: 5,
  typeOfTest: {
    typeOfTest: "stability",
    lengthOfTest: "8-week"
  },
  sampleType: "cosmetic",
  testStatus: "completed",
  testDuration: "8-week",
  dueDate: new Date("2025-07-27")
};

export const milestones2: Milestone[] = [
  {
    week: "4-week",
    dueDate: new Date("2025-06-29"),
    tests: [
      {
        testType: { typeOfTest: "stability", lengthOfTest: "8-week" },
        unit: "Color Change",
        testedBy: mockScientists[0],
        inSpec: true,
        isComplete: true
      }
    ]
  },
  {
    week: "8-week",
    dueDate: new Date("2025-07-27"),
    tests: [
      {
        testType: { typeOfTest: "stability", lengthOfTest: "8-week" },
        unit: "Viscosity",
        testedBy: mockScientists[1],
        inSpec: true,
        isComplete: true
      }
    ]
  }
];

// ❌ Sample 3: Food - Out of Spec
export const sample3: Sample = {
  id: 3,
  name: "Spicy Sauce Batch C",
  owner: mockScientists[1],
  outOfSpec: true,
  testStart: new Date("2025-06-01"),
  totalSamples: 20,
  typeOfTest: {
    typeOfTest: "microbial",
    lengthOfTest: "12-week"
  },
  sampleType: "food",
  testStatus: "in-progress",
  testDuration: "12-week",
  dueDate: new Date("2025-08-24")
};

export const milestones3: Milestone[] = [
  {
    week: "1-week",
    dueDate: new Date("2025-06-08"),
    tests: [
      {
        testType: { typeOfTest: "microbial", lengthOfTest: "12-week" },
        unit: "CFU/g",
        testedBy: mockScientists[2],
        inSpec: false,
        isComplete: true
      }
    ]
  },
  {
    week: "2-week",
    dueDate: new Date("2025-06-15"),
    tests: [
      {
        testType: { typeOfTest: "microbial", lengthOfTest: "12-week" },
        unit: "CFU/g",
        testedBy: mockScientists[2],
        inSpec: true,
        isComplete: true
      }
    ]
  }
];

// ❌ Sample 4: Cosmetic - Out of Spec
export const sample4: Sample = {
  id: 4,
  name: "Face Cream - Lot 004",
  owner: mockScientists[0],
  outOfSpec: true,
  testStart: new Date("2025-05-15"),
  totalSamples: 15,
  typeOfTest: {
    typeOfTest: "stability",
    lengthOfTest: "12-week"
  },
  sampleType: "cosmetic",
  testStatus: "in-progress",
  testDuration: "12-week",
  dueDate: new Date("2025-08-07")
};

export const milestones4: Milestone[] = [
  {
    week: "1-week",
    dueDate: new Date("2025-05-22"),
    tests: [
      {
        testType: { typeOfTest: "stability", lengthOfTest: "12-week" },
        unit: "Visual/Color Change",
        testedBy: mockScientists[1],
        inSpec: false,
        isComplete: true
      }
    ]
  },
  {
    week: "2-week",
    dueDate: new Date("2025-05-29"),
    tests: [
      {
        testType: { typeOfTest: "stability", lengthOfTest: "12-week" },
        unit: "Odor",
        testedBy: mockScientists[1],
        inSpec: true,
        isComplete: true
      }
    ]
  }
];

// ✅ Export all
export const allSamples: Sample[] = [sample1, sample2, sample3, sample4];

export const allMilestones: Record<number, Milestone[]> = {
  1: milestones1,
  2: milestones2,
  3: milestones3,
  4: milestones4
};
