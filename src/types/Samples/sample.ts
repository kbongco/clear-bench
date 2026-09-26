import type { Scientist } from "../Users/users";

export type SampleType = "food" | "cosmetic";
export type FoodTests = 'ph' | 'microbial' | 'wateractivity' | 'sensory'| 'viscosity'
export type CosmeticTests = 'ph' | 'microbial' | 'wateractivity' | 'sensory' | 'stability' | 'viscosity';
export type TestDuration = "1-week" | "2-week" | "3-week" | "4-week" | "5-week" | "6-week" | "8-week" | "12-week" | "6-months" | "1-year";
export type TestStatus = "in_progress" | "completed" | "pending";
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

export interface SampleAPI {
  id: number;
  name: string;
  scientist_id: number;
  lab_tech_id: number | null;
  sample_type: string | null;
  test_status: string | null;
  test_start: string | null;
  due_date: string | null;
  test_duration: string | null;
  out_of_spec: boolean | null;
  totalBottles: number;
  temperature: string[];
  notes: string | null;
}

export interface ScientistSummary {
  id: number;
  name: string;
  department: string | null;
}

export interface SampleWithOwner extends SampleAPI {
  scientist: ScientistSummary;
}

export interface AllSamplesResponse {
  total: number;
  samples: SampleWithOwner[];
}