from fastapi import FastAPI, HTTPException
from typing import List
from schemas import Scientist
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
    allow_origins=origins,
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



# Example endpoint to get samples
# @app.get("/samples")
# def get_samples():
#     return [
#         {"id": 1, "name": "Sample A", "owner": "Dr. Sarah Lin"},
#         {"id": 2, "name": "Sample B", "owner": "Dr. Sarah Lin"},
#     ]
