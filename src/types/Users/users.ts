export interface Scientist {
  id: number;
  name: string;
  teamName: string;
  email: string;
  managerName?: string; 
}

 export interface LabTech {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedSamples: string[]; // list of sample IDs they're responsible for validating
}
