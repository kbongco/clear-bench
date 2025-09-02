from fastapi import FastAPI, HTTPException, Query
from typing import List, Optional
from schemas import Scientist, LabTech, SamplesResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import crud

app = FastAPI()

# Allow React app (usually running on localhost:3000) to access backend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI backend!"}

@app.get("/scientists", response_model=List[Scientist])
def get_scientists():
  return crud.get_scientists()

@app.get('/lab-techs', response_model=List[LabTech])
def get_labtech():
  return crud.get_labtechs()

@app.get('/scientists/{scientist_id}/samples', response_model=SamplesResponse)
def get_scientist_samples(
    scientist_id: int,
    status: Optional[str] = Query(None),
    out_of_spec: Optional[bool] = Query(None)
):
    return crud.get_samples_by_scientist(scientist_id, status, out_of_spec)

@app.get("/samples/results/{sample_id}")
def get_sample_results(sample_id: int):
    data = crud.get_samples_result_by_id(sample_id)
    if not data:
        raise HTTPException(status_code=404, detail="Sample not found")
    return data


