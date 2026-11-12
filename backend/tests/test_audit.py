import pytest

import models
from models import Sample
from utils.audit import log_event


@pytest.fixture(autouse=True)
def logged_in_as_alice(db, sample_data, login_as):
    alice = db.query(models.Scientist).filter(models.Scientist.name.contains("Alice")).first()
    login_as(alice)


VALID = {
    "name": "Test Sample",
    "sample_type": "Food",
    "totalBottles": 2,
    "test_types": ["ph"],
    "test_duration": "4-week",
    "test_start": "2026-10-01",
    "notes": "Test sample",
    "temperature": ["25C"],
}


def test_creating_sample_logs_submitted_event(client, db, sample_data):
    response = client.post("/samples", json=VALID)

    assert response.status_code == 200

    sample_id = response.json()["sample"]["id"]

    response = client.get(f"/samples/{sample_id}")

    assert response.status_code == 200

    events = response.json()["events"]

    assert len(events) == 1
    assert events[0]["action"] == "submitted"
    assert events[0]["actor_role"] == "scientist"
    assert events[0]["actor_name"] == "Alice"
    assert events[0]["from_status"] is None
    assert events[0]["to_status"] == "pending"


def test_events_come_back_newest_first(client, db, sample_data):
    response = client.post("/samples", json=VALID)

    assert response.status_code == 200

    sample_id = response.json()["sample"]["id"]

    sample = db.query(Sample).filter(Sample.id == sample_id).first()

    assert sample is not None

    log_event(
        db,
        sample,
        action="approved",
        actor_role="lab_tech",
        actor_id=1,
        actor_name="Test Tech",
        from_status="pending",
        to_status="in_progress",
        note=None,
    )

    db.commit()

    response = client.get(f"/samples/{sample_id}")

    assert response.status_code == 200

    events = response.json()["events"]

    assert len(events) == 2
    assert events[0]["action"] == "approved"
    assert events[1]["action"] == "submitted"


def test_sample_with_no_events_returns_empty_list(client, db, sample_data):
    response = client.get("/samples/1")

    assert response.status_code == 200
    assert response.json()["events"] == []
