from pydantic import BaseModel, Field
from datetime import date
from typing import Optional, List
from enum import Enum

# --------------------
# Scientist & LabTech
# --------------------
class Scientist(BaseModel):
    id: int
    name: str
    department: str
    email: str
    manager_id: Optional[int] = None

    model_config = {"from_attributes": True}


class LabTech(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}


# --------------------
# Sample Schemas
# --------------------
class NewSample(BaseModel):
    name: str
    scientist_id: int
    team_name: Optional[str] = None
    sample_type: Optional[str] = None
    test_start: Optional[date] = None
    test_duration: Optional[str] = None
    totalBottles: int = 1
    temperature: List[str] = Field(default_factory=list)
    notes: Optional[str] = None


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
    temperature: List[str] = Field(default_factory=list)  # ✅ JSON list
    notes: Optional[str] = None

    # ✅ Pydantic v2 ORM mode
    model_config = {"from_attributes": True}


class SampleCreateResponse(BaseModel):
    message: str
    sample: Sample


class SampleStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    rejected = "rejected"
    completed = "completed"
    reviewed = "reviewed"
    archived = "archived"


class UpdateSample(BaseModel):
    lab_tech_id: int
    test_status: Optional[SampleStatus] = None
    notes: Optional[str] = None


class SamplesResponse(BaseModel):
    total: int
    samples: List[Sample]


# --------------------
# Result & Test Results
# --------------------
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

    model_config = {"from_attributes": True}


class ResultBase(BaseModel):
    sample_id: int
    test_completed_date: Optional[date] = None
    tested_by: Optional[int] = None
    reviewed_by: Optional[int] = None
    reviewed_date: Optional[date] = None
    overall_status: str
    is_out_of_spec: bool
    test_method: Optional[str] = None
    instrument_used: Optional[str] = None
    batch_number: Optional[str] = None
    analyst_comments: Optional[str] = None
    reviewer_comments: Optional[str] = None
    raw_data_file_path: Optional[str] = None


class ResultCreate(ResultBase):
    test_results: List[TestResultCreate] = Field(default_factory=list)


class Result(ResultBase):
    id: int
    created_at: date
    updated_at: date
    test_results: List[TestResult] = Field(default_factory=list)

    model_config = {"from_attributes": True}
