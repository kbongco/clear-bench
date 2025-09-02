from pydantic import BaseModel
from datetime import date
from typing import Optional, List

class Scientist(BaseModel):
  id: int
  name: str
  department: str
  email: str
  manager_id: Optional[int]

class LabTech(BaseModel):
  id: int
  name: str

class NewSample(BaseModel):
  name: str
  scientist_id: int
  sample_type: Optional[str]
  test_start: Optional[date]
  test_duration: Optional[str]
  totalBottles: int = 1
  temperature: Optional[str]
  notes: Optional[str]

class Sample(BaseModel):
    id: int
    name: str
    scientist_id: int
    lab_tech_id: Optional[int] = None
    sample_type: Optional[str] = None
    test_status: Optional[str] = "pending"
    test_start: Optional[date] = None
    due_date: Optional[date] = None
    test_duration: Optional[str] = None
    out_of_spec: Optional[bool] = False
    totalBottles: int = 1
    temperature: Optional[str] = None
    notes: Optional[str] = None

class SampleCreateResponse(BaseModel):
    message: str
    sample: Sample

class SamplesResponse(BaseModel):
    total: int
    samples: List[Sample]

class TestResultBase(BaseModel):
    parameter_name: str
    measured_value: float
    unit: str
    expected_range_min: Optional[float] = None
    expected_range_max: Optional[float] = None
    specification_limit: Optional[float] = None
    is_within_spec: bool
    notes: Optional[str] = None


class TestResultCreate(TestResultBase):
    pass


class TestResult(TestResultBase):
    id: int
    result_id: int

    class Config:
        orm_mode = True


class ResultBase(BaseModel):
    sample_id: int
    test_completed_date: Optional[date] = None
    tested_by: Optional[int] = None
    reviewed_by: Optional[int] = None
    reviewed_date: Optional[date] = None
    overall_status: str  # pass, fail, inconclusive, pending_review
    is_out_of_spec: bool
    test_method: Optional[str] = None
    instrument_used: Optional[str] = None
    batch_number: Optional[str] = None
    analyst_comments: Optional[str] = None
    reviewer_comments: Optional[str] = None
    raw_data_file_path: Optional[str] = None


class ResultCreate(ResultBase):
    test_results: list[TestResultCreate] = []


class Result(ResultBase):
    id: int
    created_at: date
    updated_at: date
    test_results: list[TestResult] = []

    class Config:
        orm_mode = True
