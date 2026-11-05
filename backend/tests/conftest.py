import os

# Point the app at a throwaway database before it's imported, so tests
# never touch your real one (and still work where there's no .env).
os.environ["DATABASE_URL"] = "sqlite://"
os.environ["SECRET_KEY"] = "test-only-secret-key-at-least-32-bytes-long"
os.environ["COOKIE_SECURE"] = "false"  # the test client talks plain http

from datetime import date

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import models
from database import Base, get_db
from main import app
from security import hash_password

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
    sarah = models.LabTech(name="Sarah")
    db.add_all([alice, marcus, sarah])
    db.flush()

    db.add_all(
        [
            models.Sample(
                name="Yogurt",
                scientist_id=alice.id,
                test_status="pending",
                due_date=date(2025, 8, 20),
            ),
            models.Sample(
                name="Granola",
                scientist_id=alice.id,
                test_status="in_progress",
                due_date=date(2025, 8, 10),
            ),
            models.Sample(
                name="Lotion",
                scientist_id=marcus.id,
                test_status="pending",
                due_date=date(2025, 8, 15),
            ),
        ]
    )
    db.commit()


@pytest.fixture
def auth_data(db, sample_data):
    """Create login accounts for Alice, Marcus, and Sarah."""
    alice = db.query(models.Scientist).filter_by(name="Alice").one()
    marcus = db.query(models.Scientist).filter_by(name="Marcus").one()
    sarah = db.query(models.LabTech).filter_by(name="Sarah").one()

    alice_user = models.User(
        email="alice@test.com",
        password_hash=hash_password("alice-password"),
        role="scientist",
        scientist_id=alice.id,
    )

    marcus_user = models.User(
        email="marcus@test.com",
        password_hash=hash_password("marcus-password"),
        role="scientist",
        scientist_id=marcus.id,
    )

    sarah_user = models.User(
        email="sarah@test.com",
        password_hash=hash_password("sarah-password"),
        role="lab_tech",
        lab_tech_id=sarah.id,
    )

    db.add_all([alice_user, marcus_user, sarah_user])
    db.commit()

    return {
        "alice": alice,
        "marcus": marcus,
        "sarah": sarah,
        "alice_user": alice_user,
        "marcus_user": marcus_user,
        "sarah_user": sarah_user,
    }