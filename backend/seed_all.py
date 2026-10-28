import sys
from datetime import date, datetime

from sqlalchemy.orm import Session

import models
from database import Base, SessionLocal, engine
from utils.audit import log_event
from utils.spec import check_value

# Ensure all tables exist
Base.metadata.create_all(bind=engine)

# ------------------------
# Seed data
# ------------------------

scientists_db = [
    {
        "name": "Dr. Alice Nguyen",
        "department": "Food Safety",
        "manager_id": None,
        "email": "alice.nguyen@example.com",
    },
    {
        "name": "Dr. Marcus Lee",
        "department": "Cosmetics",
        "manager_id": None,
        "email": "marcus.lee@example.com",
    },
    {
        "name": "Dr. Priya Patel",
        "department": "Microbiology",
        "manager_id": None,
        "email": "priya.patel@example.com",
    },
    {
        "name": "Dr. Jamal Rivera",
        "department": "Food Safety",
        "manager_id": 1,
        "email": "jamal.rivera@example.com",
    },
    {
        "name": "Dr. Sophia Chen",
        "department": "Food Safety",
        "manager_id": 1,
        "email": "sophia.chen@example.com",
    },
    {
        "name": "Dr. Ethan Kim",
        "department": "Food Safety",
        "manager_id": 1,
        "email": "ethan.kim@example.com",
    },
    {
        "name": "Dr. Maya Thompson",
        "department": "Food Safety",
        "manager_id": 1,
        "email": "maya.thompson@example.com",
    },
    {
        "name": "Dr. David Wu",
        "department": "Cosmetics",
        "manager_id": 2,
        "email": "david.wu@example.com",
    },
    {
        "name": "Dr. Olivia Martinez",
        "department": "Microbiology",
        "manager_id": 3,
        "email": "olivia.martinez@example.com",
    },
    {
        "name": "Dr. Liam Johnson",
        "department": "Food Safety",
        "manager_id": 1,
        "email": "liam.johnson@example.com",
    },
]

labtechs_db = [
    {"name": "Sarah Lin"},
    {"name": "James Patel"},
    {"name": "Amina Youssef"},
]

samples_db = [
    {
        "name": "Sample A1",
        "temperature": ["25C", "40C"],
        "scientist_id": 1,
        "lab_tech_id": 1,
        "sample_type": "Food",
        "test_status": "in_progress",
        "test_start": date(2025, 8, 1),
        "due_date": date(2025, 8, 15),
        "test_duration": "2-week",
        "totalBottles": 5,
        "test_types": ["ph", "microbial"],
    },
    {
        "name": "Sample A2",
        "temperature": ["25C", "40C"],
        "scientist_id": 1,
        "lab_tech_id": 2,
        "sample_type": "Food",
        "test_status": "completed",
        "test_start": date(2025, 7, 20),
        "due_date": date(2025, 8, 3),
        "test_duration": "2-week",
        "totalBottles": 3,
        "test_types": ["ph", "visual"],
    },
    {
        "name": "Sample B1",
        "temperature": ["25C", "35C", "40C"],
        "scientist_id": 2,
        "lab_tech_id": 3,
        "sample_type": "Cosmetics",
        "test_status": "pending",
        "test_start": date(2025, 8, 10),
        "due_date": date(2025, 8, 24),
        "test_duration": "2-week",
        "totalBottles": 4,
        "test_types": ["viscosity", "visual"],
    },
    {
        "name": "Sample C1",
        "temperature": ["25C"],
        "scientist_id": 3,
        "lab_tech_id": 1,
        "sample_type": "Environmental",
        "test_status": "in_progress",
        "test_start": date(2025, 8, 5),
        "due_date": date(2025, 8, 19),
        "test_duration": "2-week",
        "totalBottles": 2,
        "test_types": ["microbial"],
    },
    {
        "name": "Sample D1",
        "temperature": ["25C", "40C"],
        "scientist_id": 4,
        "lab_tech_id": 2,
        "sample_type": "Food",
        "test_status": "completed",
        "test_start": date(2025, 7, 25),
        "due_date": date(2025, 8, 8),
        "test_duration": "2-week",
        "totalBottles": 6,
        "test_types": ["microbial", "waterActivity"],
    },
    {
        "name": "Sample D2",
        "temperature": ["25C", "40C"],
        "scientist_id": 4,
        "lab_tech_id": 3,
        "sample_type": "Food",
        "test_status": "in_progress",
        "test_start": date(2025, 8, 2),
        "due_date": date(2025, 8, 16),
        "test_duration": "2-week",
        "totalBottles": 4,
        "test_types": ["sensory"],
    },
    {
        "name": "Sample E1",
        "temperature": ["25C", "40C"],
        "scientist_id": 5,
        "lab_tech_id": 1,
        "sample_type": "Supplement",
        "test_status": "pending",
        "test_start": date(2025, 8, 12),
        "due_date": date(2025, 8, 26),
        "test_duration": "2-week",
        "totalBottles": 3,
        "test_types": ["ph", "waterActivity", "microbial"],
    },
    {
        "name": "Sample F1",
        "temperature": ["25C", "40C"],
        "scientist_id": 6,
        "lab_tech_id": 2,
        "sample_type": "Food",
        "test_status": "completed",
        "test_start": date(2025, 7, 28),
        "due_date": date(2025, 8, 11),
        "test_duration": "2-week",
        "totalBottles": 5,
        "test_types": ["waterActivity"],
    },
    {
        "name": "Sample G1",
        "temperature": ["25C", "40C"],
        "scientist_id": 7,
        "lab_tech_id": 3,
        "sample_type": "Food",
        "test_status": "in_progress",
        "test_start": date(2025, 8, 3),
        "due_date": date(2025, 8, 17),
        "test_duration": "2-week",
        "totalBottles": 2,
        "test_types": ["visual", "sensory"],
    },
    {
        "name": "Sample H1",
        "temperature": ["Frozen", "25C"],
        "scientist_id": 10,
        "lab_tech_id": 1,
        "sample_type": "Food",
        "test_status": "pending",
        "test_start": date(2025, 8, 14),
        "due_date": date(2025, 8, 28),
        "test_duration": "2-week",
        "totalBottles": 1,
        "test_types": ["ph", "viscosity"],
    },
]

# Results for completed samples, keyed by sample name.
# Only the measured values are typed in: the seed looks up each spec and
# calls check_value, the same way POST /samples/{id}/results does.
# Numeric tests take a number; pass/fail tests take True or False.
completed_results_db = {
    "Sample A2": {
        "result": {
            "test_completed_date": datetime(2025, 8, 3, 14, 30),
            "reviewed_by": 1,
            "reviewed_date": datetime(2025, 8, 4, 10, 0),
            "test_method": "pH meter",
            "instrument_used": "Mettler Toledo SevenCompact",
            "batch_number": "BATCH-2025-08-01",
            "analyst_comments": "pH drifted up at 40C.",
            "reviewer_comments": "Confirmed out of spec at 40C.",
        },
        "values": {
            ("ph", "25C"): 4.2,
            ("ph", "40C"): 4.9,  # above 4.6: out of spec
            ("visual", "25C"): True,
            ("visual", "40C"): True,
        },
    },
    "Sample D1": {
        "result": {
            "test_completed_date": datetime(2025, 8, 8, 16, 0),
            "reviewed_by": 4,
            "reviewed_date": datetime(2025, 8, 9, 9, 30),
            "test_method": "Plate count + water activity meter",
            "instrument_used": "AquaLab 4TE",
            "batch_number": "BATCH-2025-07-25",
            "analyst_comments": "High plate count at 40C.",
            "reviewer_comments": "Agreed, retest the 40C bottles.",
        },
        "values": {
            ("microbial", "25C"): 20,
            ("microbial", "40C"): 150,  # above 100: out of spec
            ("waterActivity", "25C"): 0.78,
            ("waterActivity", "40C"): 0.82,
        },
    },
    "Sample F1": {
        "result": {
            "test_completed_date": datetime(2025, 8, 11, 13, 45),
            "reviewed_by": 6,
            "reviewed_date": datetime(2025, 8, 12, 11, 15),
            "test_method": "Water activity meter",
            "instrument_used": "AquaLab 4TE",
            "batch_number": "BATCH-2025-07-28",
            "analyst_comments": "Stable at both conditions.",
            "reviewer_comments": "Looks fine.",
        },
        "values": {
            ("waterActivity", "25C"): 0.80,
            ("waterActivity", "40C"): 0.83,
        },
    },
}


def add_results(db, sample, entry, specs):
    """Create a Result and its TestResults for a completed sample. Returns the audit note."""
    expected = {(t, c) for t in sample.test_types for c in sample.temperature}
    if set(entry["values"]) != expected:
        raise ValueError(f"{sample.name}: values must cover {sorted(expected)}")

    checked = []
    for (test_type, condition), value in entry["values"].items():
        spec = specs[(sample.sample_type, test_type)]
        if spec.kind == "pass_fail":
            measured_value, passed = None, value
        else:
            measured_value, passed = value, None
        ok = check_value(spec, measured_value, passed)
        checked.append((test_type, condition, measured_value, passed, spec, ok))

    passed_count = sum(1 for *_, ok in checked if ok)
    all_ok = passed_count == len(checked)

    result = models.Result(
        sample_id=sample.id,
        tested_by=sample.lab_tech_id,
        overall_status="pass" if all_ok else "fail",
        is_out_of_spec=not all_ok,
        **entry["result"],
    )
    db.add(result)
    db.flush()

    for test_type, condition, measured_value, passed, spec, ok in checked:
        db.add(
            models.TestResult(
                result_id=result.id,
                test_type=test_type,
                condition=condition,
                parameter_name=spec.parameter_name,
                measured_value=measured_value,
                passed=passed,
                unit=spec.unit,
                expected_range_min=spec.min_value,
                expected_range_max=spec.max_value,
                is_within_spec=ok,
            )
        )

    sample.out_of_spec = not all_ok
    return f"{passed_count} of {len(checked)} in spec"


product_specs_db = [
    # Food
    {
        "sample_type": "Food",
        "test_type": "ph",
        "parameter_name": "pH",
        "kind": "numeric",
        "unit": None,
        "min_value": 3.5,
        "max_value": 4.6,
    },
    {
        "sample_type": "Food",
        "test_type": "waterActivity",
        "parameter_name": "Water activity",
        "kind": "numeric",
        "unit": "aw",
        "min_value": None,
        "max_value": 0.85,
    },
    {
        "sample_type": "Food",
        "test_type": "microbial",
        "parameter_name": "Total plate count",
        "kind": "numeric",
        "unit": "CFU/g",
        "min_value": None,
        "max_value": 100,
    },
    {
        "sample_type": "Food",
        "test_type": "viscosity",
        "parameter_name": "Viscosity",
        "kind": "numeric",
        "unit": "cP",
        "min_value": 1000,
        "max_value": 5000,
    },
    {
        "sample_type": "Food",
        "test_type": "visual",
        "parameter_name": "Appearance",
        "kind": "pass_fail",
        "unit": None,
        "min_value": None,
        "max_value": None,
    },
    {
        "sample_type": "Food",
        "test_type": "sensory",
        "parameter_name": "Taste and odor",
        "kind": "pass_fail",
        "unit": None,
        "min_value": None,
        "max_value": None,
    },
    # Cosmetics
    {
        "sample_type": "Cosmetics",
        "test_type": "ph",
        "parameter_name": "pH",
        "kind": "numeric",
        "unit": None,
        "min_value": 5.0,
        "max_value": 7.0,
    },
    {
        "sample_type": "Cosmetics",
        "test_type": "viscosity",
        "parameter_name": "Viscosity",
        "kind": "numeric",
        "unit": "cP",
        "min_value": 8000,
        "max_value": 12000,
    },
    {
        "sample_type": "Cosmetics",
        "test_type": "microbial",
        "parameter_name": "Total aerobic count",
        "kind": "numeric",
        "unit": "CFU/g",
        "min_value": None,
        "max_value": 100,
    },
    {
        "sample_type": "Cosmetics",
        "test_type": "visual",
        "parameter_name": "Appearance",
        "kind": "pass_fail",
        "unit": None,
        "min_value": None,
        "max_value": None,
    },
    # Supplement
    {
        "sample_type": "Supplement",
        "test_type": "ph",
        "parameter_name": "pH",
        "kind": "numeric",
        "unit": None,
        "min_value": 4.0,
        "max_value": 7.5,
    },
    {
        "sample_type": "Supplement",
        "test_type": "waterActivity",
        "parameter_name": "Water activity",
        "kind": "numeric",
        "unit": "aw",
        "min_value": None,
        "max_value": 0.6,
    },
    {
        "sample_type": "Supplement",
        "test_type": "microbial",
        "parameter_name": "Total plate count",
        "kind": "numeric",
        "unit": "CFU/g",
        "min_value": None,
        "max_value": 1000,
    },
    # Environmental
    {
        "sample_type": "Environmental",
        "test_type": "microbial",
        "parameter_name": "Surface swab count",
        "kind": "numeric",
        "unit": "CFU/cm²",
        "min_value": None,
        "max_value": 25,
    },
]


# ------------------------
# Seed function
# ------------------------
def seed_all(db: Session | None = None):  # CHANGED: optional session, so tests can pass one in
    owns_session = db is None  # NEW
    if db is None:  # NEW
        db = SessionLocal()  # NEW
    try:
        # NEW: Only seed an empty database, so redeploys don't add duplicates.
        if db.query(models.Scientist).first() is not None:
            print("Database already has data, skipping seed.")
            return

        # Scientists
        for s in scientists_db:
            db.add(models.Scientist(**s))

        # LabTechs
        for lt in labtechs_db:
            db.add(models.LabTech(**lt))

        # Product specs
        specs = {}
        for spec in product_specs_db:
            row = models.ProductSpec(**spec)
            db.add(row)
            specs[(row.sample_type, row.test_type)] = row

        # Samples
        samples = []
        for s in samples_db:
            sample = models.Sample(**s)
            db.add(sample)
            samples.append(sample)

        db.flush()  # gives each sample an id and lets sample.scientist / sample.lab_tech load

        # Audit history for the seeded samples
        for sample in samples:
            log_event(
                db,
                sample,
                action="submitted",
                actor_role="scientist",
                actor_id=sample.scientist.id,
                actor_name=sample.scientist.name,
                to_status="pending",
            )

            if sample.test_status in ("in_progress", "completed"):
                log_event(
                    db,
                    sample,
                    action="approved",
                    actor_role="lab_tech",
                    actor_id=sample.lab_tech.id,
                    actor_name=sample.lab_tech.name,
                    from_status="pending",
                    to_status="in_progress",
                )

            if sample.test_status == "completed":
                note = add_results(db, sample, completed_results_db[sample.name], specs)
                log_event(
                    db,
                    sample,
                    action="results_entered",
                    actor_role="lab_tech",
                    actor_id=sample.lab_tech.id,
                    actor_name=sample.lab_tech.name,
                    from_status="in_progress",
                    to_status="completed",
                    note=note,
                )

        db.commit()
        print("Seeded all data successfully!")

    except Exception as e:
        db.rollback()
        print("Error seeding data:", e)

    finally:
        if owns_session:  # CHANGED: only close a session this function opened
            db.close()


# ------------------------
# Run the seed
# ------------------------
if __name__ == "__main__":
    if "--reset" in sys.argv:
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)
        print("Dropped and recreated all tables.")
    seed_all()
