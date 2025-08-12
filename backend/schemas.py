from pydantic import BaseModel
from typing import Optional

class Scientist(BaseModel):
  id: int
  name: str
  department: str
  manager_id: Optional[int]