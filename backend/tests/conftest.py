import os

# Point the app at a throwaway database before it's imported, so tests
# never touch your real one (and still work where there's no .env).
os.environ["DATABASE_URL"] = "sqlite://"

from datetime import date

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import models
from database import Base, get_db
from main import app

# One in-memory SQLite database shared by every connection in a test.
engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture
def db():
    """A fresh, empty database for each test."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client(db):
    """A test client whose routes use the test database."""
    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture
def sample_data(db):
    """Two scientists on different teams and three samples."""
    alice = models.Scientist(name="Alice", department="Food Safety", email="alice@test.com")
    marcus = models.Scientist(name="Marcus", department="Cosmetics", email="marcus@test.com")
    db.add_all([alice, marcus])
    db.flush()

    db.add_all([
        models.Sample(name="Yogurt", scientist_id=alice.id, test_status="pending", due_date=date(2025, 8, 20)),
        models.Sample(name="Granola", scientist_id=alice.id, test_status="in_progress", due_date=date(2025, 8, 10)),
        models.Sample(name="Lotion", scientist_id=marcus.id, test_status="pending", due_date=date(2025, 8, 15)),
    ])
    db.commit()
