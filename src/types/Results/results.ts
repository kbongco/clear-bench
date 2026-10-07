import type { SampleWithOwner } from "../Samples/sample";

export interface TestResult {
  id: number;
  result_id: number;
  parameter_name: string;
  measured_value: number;
  unit: string;
  expected_range_min: number | null;
  expected_range_max: number | null;
  specification_limit: number | null;
  is_within_spec: boolean;
  notes: string | null;
}

export interface ResultBase {
  sample_id: number;
  test_completed_date: string | null;
  tested_by: number | null;
  reviewed_by: number | null;
  reviewed_date: string | null;
  overall_status: string;
  is_out_of_spec: boolean;
  test_method: string | null;
  instrument_used: string | null;
  batch_number: string | null;
  analyst_comments: string | null;
  reviewer_comments: string | null;
  raw_data_file_path: string | null;
}

export interface Result extends ResultBase {
  id: number;
  created_at: string;
  updated_at: string;
  test_results: TestResult[];
}

export interface LabTechSummary {
  id: number;
  name: string;
}

export interface SampleDetail extends SampleWithOwner {
  lab_tech: LabTechSummary | null;
  results: Result[];
  events: AuditEvent[];
}

export interface AuditEvent {
  id: number;
  action: string;
  actor_role: string;
  actor_id: string;
  actor_name: string;
  from_status: string | null;
  to_status: string | null;
  note: string | null;
  created_at: string | null;
}
