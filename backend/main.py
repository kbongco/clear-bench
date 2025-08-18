from fastapi import FastAPI, HTTPException
from typing import List
from schemas import Scientist, LabTech
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

@app.get('/scientists/{scientist_id}/samples', response_model=List[dict])
def get_scientist_samples(scientist_id: int):
    # Check if scientist exists
    scientist_exist = any(s.id == scientist_id for s in crud.get_scientists())
    if not scientist_exist:
        raise HTTPException(status_code=404, detail="Scientist not found")
    
    # Get samples for that scientist
    samples = crud.get_samples_by_scientist(scientist_id)
    return samples


# app.get('/scientists/{scientist_id}/samples', response_model=List[dict])
# def read_scientist_samples(scientist_id: int):
#     samples = crud.get_samples_by_scientist(scientist_id)
#     if samples is None:
#         raise HTTPException(status_code=404, detail="Scientist not found")
#     return samples


# Example endpoint to get samples
# @app.get("/samples")
# def get_samples():
#     return [
#         {"id": 1, "name": "Sample A", "owner": "Dr. Sarah Lin"},
#         {"id": 2, "name": "Sample B", "owner": "Dr. Sarah Lin"},
#     ]
