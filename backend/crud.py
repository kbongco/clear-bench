from typing import List
from schemas import Scientist
from schemas import LabTech
from datetime import date

samples_db = [
    {
        "id": 1,
        "name": "Sample A1",
        "scientist_id": 1,
        "lab_tech_id": 1,
        "sample_type": "Food Safety",
        "test_status": "in-progress",
        "test_start": date(2025, 8, 1),
        "due_date": date(2025, 8, 15),
        "test_duration": "2 weeks",
        "out_of_spec": False
    },
    {
        "id": 2,
        "name": "Sample A2",
        "scientist_id": 1,
        "lab_tech_id": 2,
        "sample_type": "Food Safety",
        "test_status": "completed",
        "test_start": date(2025, 7, 20),
        "due_date": date(2025, 8, 3),
        "test_duration": "2 weeks",
        "out_of_spec": True
    },
    {
        "id": 3,
        "name": "Sample B1",
        "scientist_id": 2,
        "lab_tech_id": 3,
        "sample_type": "Cosmetics",
        "test_status": "pending",
        "test_start": date(2025, 8, 10),
        "due_date": date(2025, 8, 24),
        "test_duration": "2 weeks",
        "out_of_spec": False
    },
    {
        "id": 4,
        "name": "Sample C1",
        "scientist_id": 3,
        "lab_tech_id": 1,
        "sample_type": "Microbiology",
        "test_status": "in-progress",
        "test_start": date(2025, 8, 5),
        "due_date": date(2025, 8, 19),
        "test_duration": "2 weeks",
        "out_of_spec": False
    },
    {
        "id": 5,
        "name": "Sample D1",
        "scientist_id": 4,
        "lab_tech_id": 2,
        "sample_type": "Food Safety",
        "test_status": "completed",
        "test_start": date(2025, 7, 25),
        "due_date": date(2025, 8, 8),
        "test_duration": "2 weeks",
        "out_of_spec": True
    },
    {
        "id": 6,
        "name": "Sample D2",
        "scientist_id": 4,
        "lab_tech_id": 3,
        "sample_type": "Food Safety",
        "test_status": "in-progress",
        "test_start": date(2025, 8, 2),
        "due_date": date(2025, 8, 16),
        "test_duration": "2 weeks",
        "out_of_spec": False
    },
    {
        "id": 7,
        "name": "Sample E1",
        "scientist_id": 5,
        "lab_tech_id": 1,
        "sample_type": "Food Safety",
        "test_status": "pending",
        "test_start": date(2025, 8, 12),
        "due_date": date(2025, 8, 26),
        "test_duration": "2 weeks",
        "out_of_spec": False
    },
    {
        "id": 8,
        "name": "Sample F1",
        "scientist_id": 6,
        "lab_tech_id": 2,
        "sample_type": "Food Safety",
        "test_status": "completed",
        "test_start": date(2025, 7, 28),
        "due_date": date(2025, 8, 11),
        "test_duration": "2 weeks",
        "out_of_spec": True
    },
    {
        "id": 9,
        "name": "Sample G1",
        "scientist_id": 7,
        "lab_tech_id": 3,
        "sample_type": "Food Safety",
        "test_status": "in-progress",
        "test_start": date(2025, 8, 3),
        "due_date": date(2025, 8, 17),
        "test_duration": "2 weeks",
        "out_of_spec": False
    },
    {
        "id": 10,
        "name": "Sample H1",
        "scientist_id": 10,
        "lab_tech_id": 1,
        "sample_type": "Food Safety",
        "test_status": "pending",
        "test_start": date(2025, 8, 14),
        "due_date": date(2025, 8, 28),
        "test_duration": "2 weeks",
        "out_of_spec": False
    },
]


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

def get_samples_by_scientist(scientist_id: int) -> List[dict]:
    return [s for s in samples_db if s["scientist_id"] == scientist_id]

def get_labtechs() -> List[LabTech]:
  return [LabTech(**l) for l in labtechs_db]

def get_scientist_id(scientist_id: int) -> Scientist:
  for s in scientists_db:
    if s["id"] == scientist_id:
      return Scientist(**s)
    return None
