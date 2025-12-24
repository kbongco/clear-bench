import type { Scientist } from "../Users/users";

export type SampleType = "food" | "cosmetic";
export type FoodTests = 'ph' | 'microbial' | 'wateractivity' | 'sensory'| 'viscosity'
export type CosmeticTests = 'ph' | 'microbial' | 'wateractivity' | 'sensory' | 'stability' | 'viscosity';
export type TestDuration = "1-week" | "2-week" | "4-week" | "8-week" | "12-week";
export type TestStatus = "in-progress" | "completed" | "pending";
export type TestResults = "pass" | "fail" |"inconclusive";


export interface Sample {
  id: number;
  name: string;
  owner: Scientist
  outOfSpec: boolean;
  testStart: Date;
  totalSamples: number;
  typeOfTest: Tests;
  sampleType: SampleType;
  testStatus: TestStatus;
  testDuration: TestDuration;
  dueDate: Date;
}

export interface Tests{
  typeOfTest: FoodTests | CosmeticTests;
  lengthOfTest: string;
}

export interface MilestoneTestEntry {
  testType: Tests;
  unit: string;
  testedBy: Scientist;
  inSpec: boolean;
  isComplete: boolean;
}

export interface Milestone {
  week: TestDuration;
  dueDate: Date;
  tests: MilestoneTestEntry[];
}

export interface SampleInfo {
  id: string;                // Sample code like SMP-2024-001234
  name: string;              // Sample name / description
  type: string;              // Sample category (Food, Water, etc.)
  collectionDate: string;    // ISO date string
  receivedDate: string;      // ISO date string
  priority: 'Low' | 'Medium' | 'High'; // Priority enum
  analyst: string;           // Assigned scientist / analyst
  location: string;          // Storage or source location
}