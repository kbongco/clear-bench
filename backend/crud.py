from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime
import models
from schemas import Scientist, LabTech, Sample, NewSample, UpdateSample


def get_scientists(db: Session) -> List[Scientist]:
    db_scientists = db.query(models.Scientist).all()
    return [Scientist.from_orm(s) for s in db_scientists]

def get_scientist_by_id(scientist_id: int, db: Session) -> Optional[Scientist]:
    s = db.query(models.Scientist).filter(models.Scientist.id == scientist_id).first()
    return Scientist.from_orm(s) if s else None


def get_labtechs(db: Session) -> List[LabTech]:
    db_labtechs = db.query(models.LabTech).all()
    return [LabTech.from_orm(l) for l in db_labtechs]


# def get_samples_by_scientist(
#     scientist_id: int,
#     db: Session,
#     status: Optional[str] = None,
#     out_of_spec: Optional[bool] = None
# ) -> dict:
#     query = db.query(models.Sample).filter(models.Sample.scientist_id == scientist_id)
    
#     if status:
#         query = query.filter(models.Sample.test_status == status)
#     if out_of_spec is not None:
#         query = query.filter(models.Sample.out_of_spec == out_of_spec)
    
#     samples = query.all()
#     return {"total": len(samples), "samples": [Sample.from_orm(s) for s in samples]}

from schemas import Sample

def get_samples_by_scientist(
    db: Session, 
    scientist_id: int, 
    status: Optional[str] = None, 
    out_of_spec: Optional[bool] = None
):
    query = db.query(models.Sample).filter(models.Sample.scientist_id == scientist_id)

    if status:
        query = query.filter(models.Sample.test_status == status)

    if out_of_spec is not None:
        query = query.filter(models.Sample.out_of_spec == out_of_spec)

    results = query.all()

    return {
        "total": len(results),
        "samples": [Sample.from_orm(s) for s in results]  # ✅ convert to Pydantic
    }



def get_sample_by_id(sample_id: int, db: Session) -> Optional[Sample]:
    s = db.query(models.Sample).filter(models.Sample.id == sample_id).first()
    return Sample.from_orm(s) if s else None

def create_sample(sample_data: NewSample, db: Session) -> Sample:
    new_sample = models.Sample(
        name=sample_data.name,
        scientist_id=sample_data.scientist_id,
        lab_tech_id=getattr(sample_data, "lab_tech_id", None),
        sample_type=sample_data.sample_type,
        test_status="pending",
        test_start=sample_data.test_start,
        due_date=getattr(sample_data, "due_date", None),
        test_duration=sample_data.test_duration,
        totalBottles=sample_data.totalBottles,
        temperature=getattr(sample_data, "temperature", None),
        notes=getattr(sample_data, "notes", None),
        out_of_spec=False
    )
    db.add(new_sample)
    db.commit()
    db.refresh(new_sample)
    return Sample.from_orm(new_sample)

def update_sample(sample_id: int, sample_update: UpdateSample, db: Session) -> Optional[Sample]:
    sample = db.query(models.Sample).filter(models.Sample.id == sample_id).first()
    if not sample:
        return None
    
    update_data = sample_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(sample, field, value)
    
    db.commit()
    db.refresh(sample)
    return Sample.from_orm(sample)

def get_samples_result_by_id(sample_id: int, db: Session) -> Optional[List[dict]]:
    sample = db.query(models.Sample).filter(models.Sample.id == sample_id).first()
    if not sample:
        return None
    
    results = db.query(models.Result).filter(models.Result.sample_id == sample_id).all()
    
    return [{
        "sample": Sample.from_orm(sample),
        "results": [r.__dict__ for r in results]
    }]
