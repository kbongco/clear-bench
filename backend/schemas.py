from pydantic import BaseModel
from datetime import date
from typing import Optional

class Scientist(BaseModel):
  id: int
  name: str
  department: str
  email: str
  manager_id: Optional[int]

class LabTech(BaseModel):
  id: int
  name: str


class Sample(BaseModel):
  name: str
  scientist_id: str
  lab_tech_id: Optional[int]
  sample_type: Optional[str]
  test_status: Optional[str]
  test_start: Optional[date]
  due_data: Optional[date]
  test_duration: Optional[str]
  out_of_spec: Optional[bool] = False


class getSample(BaseModel):
  id: int