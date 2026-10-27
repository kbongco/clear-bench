from contextlib import asynccontextmanager
from datetime import datetime
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload

import crud
import models
from auth import authenticate_user
from database import Base, engine, get_db
from schemas import (
    AllSamplesResponse,
    ApproveSample,
    EnterResults,
    LabTech,
    NewSample,
    ProductSpec,
    RejectSample,
    Sample,
    SampleCreateResponse,
    SampleDetail,
    SamplesResponse,
    Scientist,
    UpdateSample,
)
from utils.audit import log_event
from utils.dates import calculate_due_date
from utils.spec import check_value


# Create tables on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(lifespan=lifespan)


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


@app.get("/scientists/{scientist_id}/samples", response_model=SamplesResponse)
def get_scientist_samples(
    scientist_id: int,
    status: Optional[str] = Query(None),
    out_of_spec: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
):
    return crud.get_samples_by_scientist(
        db=db, scientist_id=scientist_id, status=status, out_of_spec=out_of_spec
    )


# TODO: once auth exists, scope results to the current user's access
# instead of trusting the status/department query params.
@app.get("/samples", response_model=AllSamplesResponse)
def get_all_samples(
    status: Optional[str] = Query(None),
    department: Optional[str] = Query(None),
    lab_tech_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Sample).options(joinedload(models.Sample.scientist))
    if status:
        query = query.filter(models.Sample.test_status == status)
    if lab_tech_id is not None:
        query = query.filter(models.Sample.lab_tech_id == lab_tech_id)
    if department:
        query = query.join(models.Sample.scientist).filter(
            models.Scientist.department == department
        )
    samples = query.order_by(models.Sample.due_date).all()
    return {"total": len(samples), "samples": samples}


@app.get("/lab-techs", response_model=List[LabTech])
def get_labtechs(db: Session = Depends(get_db)):
    return db.query(models.LabTech).all()


@app.get("/samples/results/{sample_id}")
def get_sample_results(sample_id: int, db: Session = Depends(get_db)):
    result = db.query(models.Result).filter(models.Result.sample_id == sample_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Sample not found")
    return result


@app.get("/samples/{sample_id}", response_model=SampleDetail)
def get_sample(sample_id: int, db: Session = Depends(get_db)):
    sample = (
        db.query(models.Sample)
        .options(
            joinedload(models.Sample.scientist),
            joinedload(models.Sample.lab_tech),
            joinedload(models.Sample.results).joinedload(models.Result.test_results),
            joinedload(models.Sample.events),
        )
        .filter(models.Sample.id == sample_id)
        .first()
    )
    if not sample:
        raise HTTPException(status_code=404, detail="Sample not found")
    return sample


@app.post("/samples", response_model=SampleCreateResponse)
def api_create_sample(sample: NewSample, db: Session = Depends(get_db)):
    scientist = (
        db.query(models.Scientist).filter(models.Scientist.id == sample.scientist_id).first()
    )
    if not scientist:
        raise HTTPException(status_code=404, detail="Scientist does not exist")
    new_sample = models.Sample(
        name=sample.name,
        scientist_id=sample.scientist_id,
        sample_type=sample.sample_type,
        test_start=sample.test_start,
        test_duration=sample.test_duration,
        totalBottles=sample.totalBottles,
        temperature=sample.temperature,
        test_types=sample.test_types,
        notes=sample.notes,
        test_status="pending",
        due_date=calculate_due_date(sample.test_start, sample.test_duration),
        lab_tech_id=None,
    )
    db.add(new_sample)
    log_event(
        db,
        new_sample,
        action="submitted",
        actor_role="scientist",
        actor_id=scientist.id,
        actor_name=scientist.name,
        from_status=None,
        to_status="pending",
        note=None,
    )
    db.commit()
    db.refresh(new_sample)
    return {"message": "Sample created successfully", "sample": new_sample}


@app.patch("/samples/{sample_id}", response_model=Sample)
def api_update_sample(sample_id: int, sample_update: UpdateSample, db: Session = Depends(get_db)):
    sample = db.query(models.Sample).filter(models.Sample.id == sample_id).first()
    if not sample:
        raise HTTPException(status_code=404, detail="Sample not found")

    for field, value in sample_update.model_dump(exclude_unset=True).items():
        setattr(sample, field, value)

    db.commit()
    db.refresh(sample)
    return sample


@app.post("/samples/{sample_id}/approve", response_model=Sample)
def approve_sample(sample_id: int, body: ApproveSample, db: Session = Depends(get_db)):
    sample = db.query(models.Sample).filter(models.Sample.id == sample_id).first()
    if not sample:
        raise HTTPException(status_code=404, detail="Sample not found")

    lab_tech = db.query(models.LabTech).filter(models.LabTech.id == body.lab_tech_id).first()
    if not lab_tech:
        raise HTTPException(status_code=404, detail="Lab tech not found")

    if sample.test_status != "pending":
        raise HTTPException(status_code=400, detail="Only pending samples can be approved")

    sample.test_status = "in_progress"
    sample.lab_tech_id = lab_tech.id

    log_event(
        db,
        sample,
        action="approved",
        actor_role="lab_tech",
        actor_id=lab_tech.id,
        actor_name=lab_tech.name,
        from_status="pending",
        to_status="in_progress",
        note=None,
    )
    db.commit()
    db.refresh(sample)
    return sample


@app.post("/samples/{sample_id}/reject", response_model=Sample)
def reject_sample(sample_id: int, body: RejectSample, db: Session = Depends(get_db)):
    sample = db.query(models.Sample).filter(models.Sample.id == sample_id).first()
    if not sample:
        raise HTTPException(status_code=404, detail="Sample not found")

    lab_tech = db.query(models.LabTech).filter(models.LabTech.id == body.lab_tech_id).first()
    if not lab_tech:
        raise HTTPException(status_code=404, detail="Lab tech not found")

    if sample.test_status != "pending":
        raise HTTPException(status_code=400, detail="Only pending samples can be rejected")

    sample.test_status = "rejected"
    sample.lab_tech_id = lab_tech.id

    log_event(
        db,
        sample,
        action="rejected",
        actor_role="lab_tech",
        actor_id=lab_tech.id,
        actor_name=lab_tech.name,
        from_status="pending",
        to_status="rejected",
        note=body.reason,
    )
    db.commit()
    db.refresh(sample)
    return sample


@app.get("/specs", response_model=List[ProductSpec])
def get_specs(sample_type: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(models.ProductSpec)
    if sample_type:
        query = query.filter(models.ProductSpec.sample_type == sample_type)
    return query.order_by(models.ProductSpec.sample_type, models.ProductSpec.test_type).all()


@app.post("/samples/{sample_id}/results", response_model=SampleDetail)
def enter_results(sample_id: int, body: EnterResults, db: Session = Depends(get_db)):
    sample = db.query(models.Sample).filter(models.Sample.id == sample_id).first()
    if not sample:
        raise HTTPException(status_code=404, detail="Sample not found")

    lab_tech = db.query(models.LabTech).filter(models.LabTech.id == body.lab_tech_id).first()
    if not lab_tech:
        raise HTTPException(status_code=404, detail="Lab tech not found")
    if sample.test_status != "in_progress":
        raise HTTPException(
            status_code=400, detail="Results can only be entered for samples in progress"
        )
    if not sample.temperature:
        raise HTTPException(status_code=400, detail="Sample has no storage conditions")

    specs = (
        db.query(models.ProductSpec)
        .filter(models.ProductSpec.sample_type == sample.sample_type)
        .all()
    )
    specs_by_type = {spec.test_type: spec for spec in specs}

    missing = [t for t in sample.test_types if t not in specs_by_type]
    if missing:
        raise HTTPException(
            status_code=400, detail=f"No spec for {sample.sample_type}: {', '.join(missing)}"
        )

    expected = {(t, c) for t in sample.test_types for c in sample.temperature}
    submitted = [(v.test_type, v.condition) for v in body.values]

    if len(submitted) != len(set(submitted)):
        raise HTTPException(
            status_code=422, detail="Each test and condition can only be entered once"
        )

    missing_cells = expected - set(submitted)
    extra_cells = set(submitted) - expected
    if missing_cells or extra_cells:
        raise HTTPException(
            status_code=422, detail=f"Missing: {sorted(missing_cells)} Extra: {sorted(extra_cells)}"
        )

    checked = []
    for v in body.values:
        spec = specs_by_type[v.test_type]
        try:
            ok = check_value(spec, v.measured_value, v.passed)
        except ValueError as e:
            raise HTTPException(status_code=422, detail=str(e))
        checked.append((v, spec, ok))

    # Stage E: save everything in one commit
    passed_count = sum(1 for v, spec, ok in checked if ok)
    all_ok = passed_count == len(checked)

    result = models.Result(
        sample_id=sample.id,
        tested_by=lab_tech.id,
        test_completed_date=datetime.now(),
        overall_status="pass" if all_ok else "fail",
        is_out_of_spec=not all_ok,
        test_method=body.test_method,
        instrument_used=body.instrument_used,
        batch_number=body.batch_number,
        analyst_comments=body.analyst_comments,
    )
    db.add(result)
    db.flush()

    for v, spec, ok in checked:
        db.add(
            models.TestResult(
                result_id=result.id,
                test_type=v.test_type,
                condition=v.condition,
                parameter_name=spec.parameter_name,
                measured_value=v.measured_value,
                passed=v.passed,
                unit=spec.unit,
                expected_range_min=spec.min_value,
                expected_range_max=spec.max_value,
                is_within_spec=ok,
            )
        )

    sample.out_of_spec = not all_ok
    sample.test_status = "completed"

    log_event(
        db,
        sample,
        action="results_entered",
        actor_role="lab_tech",
        actor_id=lab_tech.id,
        actor_name=lab_tech.name,
        from_status="in_progress",
        to_status="completed",
        note=f"{passed_count} of {len(checked)} in spec",
    )
    db.commit()
    return get_sample(sample_id, db)


@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    return {"status": "✅ Database connection working"}


@app.get("/protected")
async def protected_route(current_user: str = Depends(authenticate_user)):
    return {"message": f"Hello {current_user}, this is a protected route!"}
