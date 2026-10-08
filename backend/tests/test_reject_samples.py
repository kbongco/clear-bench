import models


def test_reject_pending_sample_works(client, sample_data):
    response = client.post(
        "/samples/1/reject",
        json={
            "lab_tech_id": 1,
            "reason": "Bottle cracked",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["test_status"] == "rejected"
    assert data["lab_tech_id"] == 1


def test_reject_sample_logs_event_with_reason(client, sample_data):
    response = client.post(
        "/samples/1/reject",
        json={
            "lab_tech_id": 1,
            "reason": "Bottle cracked",
        },
    )

    assert response.status_code == 200

    response = client.get("/samples/1")

    assert response.status_code == 200

    events = response.json()["events"]

    assert len(events) == 1
    assert events[0]["action"] == "rejected"
    assert events[0]["actor_name"] == "Sarah"
    assert events[0]["from_status"] == "pending"
    assert events[0]["to_status"] == "rejected"
    assert events[0]["note"] == "Bottle cracked"


def test_reject_non_pending_sample_returns_400(client, sample_data):
    response = client.post(
        "/samples/2/reject",
        json={
            "lab_tech_id": 1,
            "reason": "Bottle cracked",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == ("Only pending samples can be rejected")


def test_reject_unknown_sample_returns_404(client, sample_data):
    response = client.post(
        "/samples/999/reject",
        json={
            "lab_tech_id": 1,
            "reason": "Bottle cracked",
        },
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Sample not found"


def test_reject_with_unknown_lab_tech_returns_404(client, sample_data):
    response = client.post(
        "/samples/1/reject",
        json={
            "lab_tech_id": 999,
            "reason": "Bottle cracked",
        },
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Lab tech not found"


def test_reject_with_blank_reason_returns_422(client, sample_data):
    response = client.post(
        "/samples/1/reject",
        json={
            "lab_tech_id": 1,
            "reason": "",
        },
    )

    assert response.status_code == 422


def test_reject_with_whitespace_reason_returns_422(client, sample_data):
    response = client.post(
        "/samples/1/reject",
        json={
            "lab_tech_id": 1,
            "reason": "   ",
        },
    )

    assert response.status_code == 422


def test_reject_without_reason_returns_422(client, sample_data):
    response = client.post(
        "/samples/1/reject",
        json={
            "lab_tech_id": 1,
        },
    )

    assert response.status_code == 422


def test_reject_reason_is_trimmed_when_saved(client, sample_data):
    response = client.post(
        "/samples/1/reject",
        json={
            "lab_tech_id": 1,
            "reason": "  Bottle cracked  ",
        },
    )

    assert response.status_code == 200

    response = client.get("/samples/1")

    assert response.status_code == 200

    events = response.json()["events"]

    assert len(events) == 1
    assert events[0]["note"] == "Bottle cracked"


def test_failed_reject_does_not_change_sample(client, db, sample_data):
    # Blank reason should fail validation before the endpoint changes anything.
    response = client.post(
        "/samples/1/reject",
        json={
            "lab_tech_id": 1,
            "reason": "",
        },
    )

    assert response.status_code == 422

    sample = db.query(models.Sample).filter(models.Sample.id == 1).first()

    assert sample is not None
    assert sample.test_status == "pending"

    events = db.query(models.AuditEvent).filter(models.AuditEvent.sample_id == 1).all()

    assert len(events) == 0
