export type SpecKind = "numeric" | "pass_fail";

export interface ProductSpec {
  id: number;
  sample_type: string;
  test_type: string;
  parameter_name: string;
  kind: SpecKind;
  unit: string | null;
  min_value: number | null;
  max_value: number | null;
}

export interface ResultValue {
  test_type: string;
  condition: string;
  measured_value?: number;
  passed?: boolean;
}

export interface EnterResults {
  lab_tech_id: number;
  test_method?: string;
  instrument_used?: string;
  batch_number?: string;
  analyst_comments?: string;
  values: ResultValue[];
}
