from typing import List
from schemas import Scientist
from schemas import LabTech

scientists_db = [
    { "id": 1, "name": "Dr. Alice Nguyen", "department": "Food Safety", "manager_id": None, "email": "alice.nguyen@example.com" },
    { "id": 2, "name": "Dr. Marcus Lee", "department": "Cosmetics", "manager_id": None, "email": "marcus.lee@example.com" },
    { "id": 3, "name": "Dr. Priya Patel", "department": "Microbiology", "manager_id": None, "email": "priya.patel@example.com" },
    { "id": 4, "name": "Dr. Jamal Rivera", "department": "Food Safety", "manager_id": 1, "email": "jamal.rivera@example.com" },
    { "id": 5, "name": "Dr. Sophia Chen", "department": "Food Safety", "manager_id": 1, "email": "sophia.chen@example.com" },
    { "id": 6, "name": "Dr. Ethan Kim", "department": "Food Safety", "manager_id": 1, "email": "ethan.kim@example.com" },
    { "id": 7, "name": "Dr. Maya Thompson", "department": "Food Safety", "manager_id": 1, "email": "maya.thompson@example.com" },
    { "id": 8, "name": "Dr. David Wu", "department": "Cosmetics", "manager_id": 2, "email": "david.wu@example.com" },
    { "id": 9, "name": "Dr. Olivia Martinez", "department": "Microbiology", "manager_id": 3, "email": "olivia.martinez@example.com" },
    { "id": 10, "name": "Dr. Liam Johnson", "department": "Food Safety", "manager_id": 1, "email": "liam.johnson@example.com" }
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
