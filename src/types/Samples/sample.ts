import type { Scientist } from "../Users/users";

export type 

export interface Sample {
  id: number;
  name: string;
  owner: Scientist
  outOfSpec: boolean;
  testStart: Date;
  totalSamples: number;
  typeOfTest: Tests;
}

export interface Tests{
  typeOfTest: string;
  lengthOfTest: string;
}