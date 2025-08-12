from typing import List
from schemas import Scientist

scientists_db = [
  { "id": 1, "name": "Dr. Alice Nguyen", "department": "Food Safety", "manager_id": None },
  { "id": 2, "name": "Dr. Marcus Lee", "department": "Cosmetics", "manager_id": None },
  { "id": 3, "name": "Dr Priya Patel", "department": "Microbiology", "manager_id": None },
  { "id": 4, "name": "Dr. Jamal Rivera", "department": "Food Safety", "manager_id": 1 }
]

def get_scientists() -> List[Scientist]:
  return [Scientist(**s) for s in scientists_db]

