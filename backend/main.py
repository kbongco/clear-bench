from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

# Example endpoint to get samples
@app.get("/samples")
def get_samples():
    return [
        {"id": 1, "name": "Sample A", "owner": "Dr. Sarah Lin"},
        {"id": 2, "name": "Sample B", "owner": "Dr. Sarah Lin"},
    ]
