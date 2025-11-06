from fastapi import FastAPI, HTTPException, Query, Depends
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

import models
from database import get_db, Base, engine
from schemas import Scientist, LabTech, SamplesResponse, Sample, NewSample, SampleCreateResponse, UpdateSample
from auth import authenticate_user


app = FastAPI()

# Create tables on startup
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to origins list if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI backend!"}


@app.get("/scientists", response_model=List[Scientist])
def get_scientists(db: Session = Depends(get_db)):
    return db.query(models.Scientist).all()

@app.get('/scientists/{scientist_id}/samples', response_model=SamplesResponse)
def get_scientist_samples(
    scientist_id: int,
    status: Optional[str] = Query(None),
    out_of_spec: Optional[bool] = Query(None),
    db: Session = Depends(get_db)
):
    return crud.get_samples_by_scientist(
        db=db,
        scientist_id=scientist_id,
        status=status,
        out_of_spec=out_of_spec
    )



@app.get('/lab-techs', response_model=List[LabTech])
def get_labtechs(db: Session = Depends(get_db)):
    return db.query(models.LabTech).all()


@app.get("/samples/results/{sample_id}")
def get_sample_results(sample_id: int, db: Session = Depends(get_db)):
    result = db.query(models.Result).filter(models.Result.sample_id == sample_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Sample not found")
    return result


@app.post("/samples", response_model=SampleCreateResponse)
def api_create_sample(sample: NewSample, db: Session = Depends(get_db)):
    new_sample = models.Sample(
        name=sample.name,
        scientist_id=sample.scientist_id,
        sample_type=sample.sample_type,
        test_start=sample.test_start,
        test_duration=sample.test_duration,
        totalBottles=sample.totalBottles,
        temperature=sample.temperature,
        notes=sample.notes,
        test_status="pending",
        due_date=None,
        lab_tech_id=None,
    )
    db.add(new_sample)
    db.commit()
    db.refresh(new_sample)
    return {"message": "Sample created successfully", "sample": new_sample}


@app.patch('/samples/{sample_id}', response_model=Sample)
def api_update_sample(sample_id: int, sample_update: UpdateSample, db: Session = Depends(get_db)):
    sample = db.query(models.Sample).filter(models.Sample.id == sample_id).first()
    if not sample:
        raise HTTPException(status_code=404, detail="Sample not found")
    
    for field, value in sample_update.dict(exclude_unset=True).items():
        setattr(sample, field, value)
    
    db.commit()
    db.refresh(sample)
    return sample


@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    return {"status": "✅ Database connection working"}


@app.get("/protected")
async def protected_route(current_user: str = Depends(authenticate_user)):
    return {"message": f"Hello {current_user}, this is a protected route!"}
