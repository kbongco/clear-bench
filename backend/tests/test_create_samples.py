import pytest

import models


@pytest.fixture(autouse=True)
def logged_in_as_alice(db, sample_data, login_as):
    alice = db.query(models.Scientist).filter(models.Scientist.name.contains("Alice")).first()
    login_as(alice)


def test_create_sample_success(client, sample_data):

    payload = {
        "name": "Sample 001",
        "sample_type": "Stability",
        "test_start": "2026-10-01",
        "test_duration": "4-week",
        "totalBottles": 10,
        "temperature": ["25C"],
        "test_types": ["Appearance", "pH"],
        "notes": "Test sample",
    }

    response = client.post("/samples", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "Sample created successfully"
    assert data["sample"]["name"] == "Sample 001"
    assert data["sample"]["test_types"] == ["Appearance", "pH"]
    assert data["sample"]["test_status"] == "pending"
    assert data["sample"]["due_date"] == "2026-10-29"


def test_create_sample_missing_name(client, sample_data):

    payload = {
        "sample_type": "Stability",
        "test_start": "2026-10-01",
        "test_duration": "4-week",
        "totalBottles": 10,
        "temperature": ["25C"],
        "test_types": ["Appearance", "pH"],
        "notes": "Test sample",
    }

    response = client.post("/samples", json=payload)

    assert response.status_code == 422


def test_create_sample_bad_date(client, sample_data):

    payload = {
        "name": "Sample 001",
        "sample_type": "Stability",
        "test_start": "10/01/2026",
        "test_duration": "4-week",
        "totalBottles": 10,
        "temperature": ["25C"],
        "test_types": ["Appearance", "pH"],
        "notes": "Test sample",
    }

    response = client.post("/samples", json=payload)

    assert response.status_code == 422


def test_create_sample_empty_test_types(client, sample_data):

    payload = {
        "name": "Sample 001",
        "sample_type": "Stability",
        "test_start": "2026-10-01",
        "test_duration": "4-week",
        "totalBottles": 10,
        "temperature": ["25C"],
        "test_types": [],
        "notes": "Test sample",
    }

    response = client.post("/samples", json=payload)

    assert response.status_code == 422
