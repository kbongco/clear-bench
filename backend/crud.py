from typing import List
from schemas import Scientist
from schemas import LabTech
from datetime import date
from datetime import datetime
from typing import Optional

results_db = [
    {
        "id": 1,
        "sample_id": 2,  # Sample A2
        "test_completed_date": datetime(2025, 8, 3, 14, 30),
        "tested_by": 2,
        "reviewed_by": 1,
        "reviewed_date": datetime(2025, 8, 4, 10, 0),
        "overall_status": "fail",
        "is_out_of_spec": True,
        "test_method": "HPLC",
        "instrument_used": "Agilent 1100",
        "batch_number": "BATCH-2025-08-01",
        "analyst_comments": "Peak shift observed.",
        "reviewer_comments": "Confirmed out of spec.",
        "created_at": datetime(2025, 8, 3, 14, 35),
        "updated_at": datetime(2025, 8, 4, 10, 5),
        "raw_data_file_path": "/data/results/sample_A2_raw.csv",
    },
    {
        "id": 2,
        "sample_id": 5,  # Sample D1
        "test_completed_date": datetime(2025, 8, 8, 16, 0),
        "tested_by": 2,
        "reviewed_by": 4,
        "reviewed_date": datetime(2025, 8, 9, 9, 30),
        "overall_status": "fail",
        "is_out_of_spec": True,
        "test_method": "GC-MS",
        "instrument_used": "Shimadzu GCMS-QP2020",
        "batch_number": "BATCH-2025-07-25",
        "analyst_comments": "Detected unexpected peaks.",
        "reviewer_comments": "Confirm contamination present.",
        "created_at": datetime(2025, 8, 8, 16, 5),
        "updated_at": datetime(2025, 8, 9, 9, 40),
        "raw_data_file_path": "/data/results/sample_D1_raw.csv",
    },
    {
        "id": 3,
        "sample_id": 8,  # Sample F1
        "test_completed_date": datetime(2025, 8, 11, 13, 45),
        "tested_by": 2,
        "reviewed_by": 6,
        "reviewed_date": datetime(2025, 8, 12, 11, 15),
        "overall_status": "fail",
        "is_out_of_spec": True,
        "test_method": "HPLC",
        "instrument_used": "Waters Alliance",
        "batch_number": "BATCH-2025-07-28",
        "analyst_comments": "Impurity level exceeded.",
        "reviewer_comments": "Agreed, requires retest.",
        "created_at": datetime(2025, 8, 11, 13, 50),
        "updated_at": datetime(2025, 8, 12, 11, 20),
        "raw_data_file_path": "/data/results/sample_F1_raw.csv",
    }
]

test_results_db = [
    # Linked to result 1 (Sample A2)
    {
        "id": 1,
        "result_id": 1,
        "parameter_name": "pH",
        "measured_value": 6.2,
        "unit": "",
        "expected_range_min": 6.5,
        "expected_range_max": 7.5,
        "specification_limit": 6.5,
        "is_within_spec": False,
        "notes": "Low pH detected."
    },
    {
        "id": 2,
        "result_id": 1,
        "parameter_name": "Concentration",
        "measured_value": 120.5,
        "unit": "mg/L",
        "expected_range_min": 100.0,
        "expected_range_max": 110.0,
        "specification_limit": 110.0,
        "is_within_spec": False,
        "notes": "Exceeds upper limit."
    },

    # Linked to result 2 (Sample D1)
    {
        "id": 3,
        "result_id": 2,
        "parameter_name": "Impurity Level",
        "measured_value": 0.25,
        "unit": "%",
        "expected_range_min": 0.0,
        "expected_range_max": 0.1,
        "specification_limit": 0.1,
        "is_within_spec": False,
        "notes": "Excess impurity detected."
    },

    # Linked to result 3 (Sample F1)
    {
        "id": 4,
        "result_id": 3,
        "parameter_name": "Moisture",
        "measured_value": 15.0,
        "unit": "%",
        "expected_range_min": 10.0,
        "expected_range_max": 14.0,
        "specification_limit": 14.0,
        "is_within_spec": False,
        "notes": "Above moisture threshold."
    }
]

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

# Add test results for Sample A1
test_results_db.extend([
    {
        "id": 5,
        "result_id": 11,  # unique ID for this sample’s result
        "parameter_name": "pH",
        "measured_value": 6.8,
        "unit": "",
        "expected_range_min": 6.5,
        "expected_range_max": 7.5,
        "specification_limit": 6.5,
        "is_within_spec": True,
        "notes": "Within expected pH range."
    },
    {
        "id": 6,
        "result_id": 11,
        "parameter_name": "Concentration",
        "measured_value": 105.0,
        "unit": "mg/L",
        "expected_range_min": 100.0,
        "expected_range_max": 110.0,
        "specification_limit": 110.0,
        "is_within_spec": True,
        "notes": "Concentration within acceptable range."
    },
    {
        "id": 7,
        "result_id": 11,
        "parameter_name": "Viscosity",
        "measured_value": 1500,
        "unit": "cP",
        "expected_range_min": 1000,
        "expected_range_max": 2000,
        "specification_limit": 2000,
        "is_within_spec": True,
        "notes": "Viscosity normal."
    }
])


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

def get_samples_result_by_id(sample_id: int) -> Optional[List[dict]]:
    # Find sample
    sample = next((s for s in samples_db if s["id"] == sample_id), None)
    if not sample:
        return None

    # Find related result
    result = next((r for r in results_db if r["sample_id"] == sample_id), None)

    # Find test results
    test_results = [tr for tr in test_results_db if result and tr["result_id"] == result["id"]]

    # Find scientist + lab tech
    scientist = next((sc for sc in scientists_db if sc["id"] == sample["scientist_id"]), None)
    lab_tech = next((lt for lt in labtechs_db if lt["id"] == sample["lab_tech_id"]), None)

    # Wrap in a list so it matches List[dict]
    return [{
        "sample": {
            **sample,
            "scientist": scientist,
            "lab_tech": lab_tech,
        },
        "results": [
            {
                "id": tr["id"],
                "result_id": tr["result_id"],
                "parameter_name": tr["parameter_name"],
                "measured_value": tr["measured_value"],
                "unit": tr["unit"],
                "expected_range_min": tr["expected_range_min"],
                "expected_range_max": tr["expected_range_max"],
                "specification_limit": tr["specification_limit"],
                "is_within_spec": tr["is_within_spec"],
                "notes": tr["notes"]
            }
            for tr in test_results
        ]
    }]


