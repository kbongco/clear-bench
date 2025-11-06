from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models
from datetime import date, datetime

# Ensure all tables exist
Base.metadata.create_all(bind=engine)

# ------------------------
# Seed data
# ------------------------

scientists_db = [
    { "name": "Dr. Alice Nguyen", "department": "Food Safety", "manager_id": None, "email": "alice.nguyen@example.com" },
    { "name": "Dr. Marcus Lee", "department": "Cosmetics", "manager_id": None, "email": "marcus.lee@example.com" },
    { "name": "Dr. Priya Patel", "department": "Microbiology", "manager_id": None, "email": "priya.patel@example.com" },
    { "name": "Dr. Jamal Rivera", "department": "Food Safety", "manager_id": 1, "email": "jamal.rivera@example.com" },
    { "name": "Dr. Sophia Chen", "department": "Food Safety", "manager_id": 1, "email": "sophia.chen@example.com" },
    { "name": "Dr. Ethan Kim", "department": "Food Safety", "manager_id": 1, "email": "ethan.kim@example.com" },
    { "name": "Dr. Maya Thompson", "department": "Food Safety", "manager_id": 1, "email": "maya.thompson@example.com" },
    { "name": "Dr. David Wu", "department": "Cosmetics", "manager_id": 2, "email": "david.wu@example.com" },
    { "name": "Dr. Olivia Martinez", "department": "Microbiology", "manager_id": 3, "email": "olivia.martinez@example.com" },
    { "name": "Dr. Liam Johnson", "department": "Food Safety", "manager_id": 1, "email": "liam.johnson@example.com" }
]

labtechs_db = [
    {"name": "Sarah Lin"},
    {"name": "James Patel"},
    {"name": "Amina Youssef"},
]

samples_db = [
    {"name": "Sample A1", "scientist_id": 1, "lab_tech_id": 1, "sample_type": "Food Safety", "test_status": "in-progress", "test_start": date(2025,8,1), "due_date": date(2025,8,15), "test_duration": "2 weeks", "out_of_spec": False, "totalBottles": 5},
    {"name": "Sample A2", "scientist_id": 1, "lab_tech_id": 2, "sample_type": "Food Safety", "test_status": "completed", "test_start": date(2025,7,20), "due_date": date(2025,8,3), "test_duration": "2 weeks", "out_of_spec": True, "totalBottles": 3},
    {"name": "Sample B1", "scientist_id": 2, "lab_tech_id": 3, "sample_type": "Cosmetics", "test_status": "pending", "test_start": date(2025,8,10), "due_date": date(2025,8,24), "test_duration": "2 weeks", "out_of_spec": False, "totalBottles": 4},
    {"name": "Sample C1", "scientist_id": 3, "lab_tech_id": 1, "sample_type": "Microbiology", "test_status": "in-progress", "test_start": date(2025,8,5), "due_date": date(2025,8,19), "test_duration": "2 weeks", "out_of_spec": False, "totalBottles": 2},
    {"name": "Sample D1", "scientist_id": 4, "lab_tech_id": 2, "sample_type": "Food Safety", "test_status": "completed", "test_start": date(2025,7,25), "due_date": date(2025,8,8), "test_duration": "2 weeks", "out_of_spec": True, "totalBottles": 6},
    {"name": "Sample D2", "scientist_id": 4, "lab_tech_id": 3, "sample_type": "Food Safety", "test_status": "in-progress", "test_start": date(2025,8,2), "due_date": date(2025,8,16), "test_duration": "2 weeks", "out_of_spec": False, "totalBottles": 4},
    {"name": "Sample E1", "scientist_id": 5, "lab_tech_id": 1, "sample_type": "Food Safety", "test_status": "pending", "test_start": date(2025,8,12), "due_date": date(2025,8,26), "test_duration": "2 weeks", "out_of_spec": False, "totalBottles": 3},
    {"name": "Sample F1", "scientist_id": 6, "lab_tech_id": 2, "sample_type": "Food Safety", "test_status": "completed", "test_start": date(2025,7,28), "due_date": date(2025,8,11), "test_duration": "2 weeks", "out_of_spec": True, "totalBottles": 5},
    {"name": "Sample G1", "scientist_id": 7, "lab_tech_id": 3, "sample_type": "Food Safety", "test_status": "in-progress", "test_start": date(2025,8,3), "due_date": date(2025,8,17), "test_duration": "2 weeks", "out_of_spec": False, "totalBottles": 2},
    {"name": "Sample H1", "scientist_id": 10, "lab_tech_id": 1, "sample_type": "Food Safety", "test_status": "pending", "test_start": date(2025,8,14), "due_date": date(2025,8,28), "test_duration": "2 weeks", "out_of_spec": False, "totalBottles": 1}
]

results_db = [
    {"sample_id": 2, "test_completed_date": datetime(2025,8,3,14,30), "tested_by":2, "reviewed_by":1, "reviewed_date": datetime(2025,8,4,10,0), "overall_status":"fail", "is_out_of_spec":True, "test_method":"HPLC","instrument_used":"Agilent 1100","batch_number":"BATCH-2025-08-01","analyst_comments":"Peak shift observed.","reviewer_comments":"Confirmed out of spec.","created_at":datetime(2025,8,3,14,35),"updated_at":datetime(2025,8,4,10,5),"raw_data_file_path":"/data/results/sample_A2_raw.csv"},
    {"sample_id": 5, "test_completed_date": datetime(2025,8,8,16,0), "tested_by":2, "reviewed_by":4, "reviewed_date": datetime(2025,8,9,9,30), "overall_status":"fail","is_out_of_spec":True,"test_method":"GC-MS","instrument_used":"Shimadzu GCMS-QP2020","batch_number":"BATCH-2025-07-25","analyst_comments":"Detected unexpected peaks.","reviewer_comments":"Confirm contamination present.","created_at":datetime(2025,8,8,16,5),"updated_at":datetime(2025,8,9,9,40),"raw_data_file_path":"/data/results/sample_D1_raw.csv"},
    {"sample_id": 8, "test_completed_date": datetime(2025,8,11,13,45), "tested_by":2, "reviewed_by":6, "reviewed_date": datetime(2025,8,12,11,15), "overall_status":"fail","is_out_of_spec":True,"test_method":"HPLC","instrument_used":"Waters Alliance","batch_number":"BATCH-2025-07-28","analyst_comments":"Impurity level exceeded.","reviewer_comments":"Agreed, requires retest.","created_at":datetime(2025,8,11,13,50),"updated_at":datetime(2025,8,12,11,20),"raw_data_file_path":"/data/results/sample_F1_raw.csv"},
    {"sample_id": 10, "test_completed_date": datetime(2025,8,15,12,0), "tested_by":3, "reviewed_by":5, "reviewed_date": datetime(2025,8,16,9,0), "overall_status":"pass","is_out_of_spec":False,"test_method":"HPLC","instrument_used":"Waters Alliance","batch_number":"BATCH-2025-08-10","analyst_comments":"All good","reviewer_comments":"Looks fine","created_at":datetime(2025,8,15,12,5),"updated_at":datetime(2025,8,16,9,10),"raw_data_file_path":"/data/results/sample_H1_raw.csv"},
]

test_results_db = [
    {"result_id": 1, "parameter_name":"pH","measured_value":6.2,"unit":"","expected_range_min":6.5,"expected_range_max":7.5,"specification_limit":6.5,"is_within_spec":False,"notes":"Low pH detected."},
    {"result_id": 1, "parameter_name":"Concentration","measured_value":120.5,"unit":"mg/L","expected_range_min":100.0,"expected_range_max":110.0,"specification_limit":110.0,"is_within_spec":False,"notes":"Exceeds upper limit."},
    {"result_id": 2, "parameter_name":"Impurity Level","measured_value":0.25,"unit":"%","expected_range_min":0.0,"expected_range_max":0.1,"specification_limit":0.1,"is_within_spec":False,"notes":"Excess impurity detected."},
    {"result_id": 3, "parameter_name":"Moisture","measured_value":15.0,"unit":"%","expected_range_min":10.0,"expected_range_max":14.0,"specification_limit":14.0,"is_within_spec":False,"notes":"Above moisture threshold."},
    {"result_id": 4, "parameter_name":"pH","measured_value":6.8,"unit":"","expected_range_min":6.5,"expected_range_max":7.5,"specification_limit":6.5,"is_within_spec":True,"notes":"Within expected pH range."},
    {"result_id": 4, "parameter_name":"Concentration","measured_value":105.0,"unit":"mg/L","expected_range_min":100.0,"expected_range_max":110.0,"specification_limit":110.0,"is_within_spec":True,"notes":"Concentration within acceptable range."},
    {"result_id": 4, "parameter_name":"Viscosity","measured_value":1500,"unit":"cP","expected_range_min":1000,"expected_range_max":2000,"specification_limit":2000,"is_within_spec":True,"notes":"Viscosity normal."},
]

# ------------------------
# Seed function
# ------------------------
def seed_all():
    db: Session = SessionLocal()
    try:
        # Scientists
        for s in scientists_db:
            db.add(models.Scientist(**s))
        
        # LabTechs
        for lt in labtechs_db:
            db.add(models.LabTech(**lt))
        
        # Samples
        for s in samples_db:
            db.add(models.Sample(**s))
        
        # Results
        for r in results_db:
            db.add(models.Result(**r))
        
        # TestResults
        for tr in test_results_db:
            db.add(models.TestResult(**tr))
        
        db.commit()
        print("Seeded all data successfully!")
    
    except Exception as e:
        db.rollback()
        print("Error seeding data:", e)
    
    finally:
        db.close()

# ------------------------
# Run the seed
# ------------------------
if __name__ == "__main__":
    seed_all()
