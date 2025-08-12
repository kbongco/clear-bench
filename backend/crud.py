from typing import List
from schemas import Scientist
from schemas import LabTech

scientists_db = [
  { "id": 1, "name": "Dr. Alice Nguyen", "department": "Food Safety", "manager_id": None },
  { "id": 2, "name": "Dr. Marcus Lee", "department": "Cosmetics", "manager_id": None },
  { "id": 3, "name": "Dr Priya Patel", "department": "Microbiology", "manager_id": None },
  { "id": 4, "name": "Dr. Jamal Rivera", "department": "Food Safety", "manager_id": 1 }
]

labtechs_db = [
  {"id": 1, "name": "Sarah Lin"},
  {"id": 2, "name": "James Patel"},
  {"id": 3, "name": "Amina Youssef"},
]

def get_scientists() -> List[Scientist]:
  return [Scientist(**s) for s in scientists_db]

def get_labtechs() -> List[LabTech]:
  return [LabTech(**l) for l in labtechs_db]

def get_scientist_id(scientist_id: int) -> Scientist:
  for s in scientists_db:
    if s["id"] == scientist_id:
      return Scientist(**s)
    return None
