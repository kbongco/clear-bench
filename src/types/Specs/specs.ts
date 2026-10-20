export type SpecKind = "numeric" | "pass_fail";

export interface ProductSpec {
  id: number;
  sample_type: string;
  test_type: string;
  parameter_name: string;
  kind: string;
  unit: string;
  min_value: number;
  max_value: number;
}

export interface ResultValue {
  test_type: string;
  condition: string;
  measured_value?: number;
  passed?: boolean;
}

export interface EnterResults {
  model_config: boolean;
  lab_tech_id: number;
  test_method?: string;
  instrument_used: string;
  batch_number?: string;
  analyst_comments?: string;
  values: string[];
}
