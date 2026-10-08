import models

def test_approve_pending_sample_works(client, sample_data):
    response = client.post(
        "/samples/1/approve",
        json={"lab_tech_id": 1},
    )

    assert response.status_code == 200

    data = response.json()

    assert data["test_status"] == "in_progress"
    assert data["lab_tech_id"] == 1


def test_approve_sample_logs_event(client, sample_data):
    response = client.post(
        "/samples/1/approve",
        json={"lab_tech_id": 1},
    )

    assert response.status_code == 200

    response = client.get("/samples/1")

    assert response.status_code == 200

    events = response.json()["events"]

    assert len(events) == 1
    assert events[0]["action"] == "approved"
    assert events[0]["actor_name"] == "Sarah"
    assert events[0]["from_status"] == "pending"
    assert events[0]["to_status"] == "in_progress"


def test_approve_non_pending_sample_returns_400(client, sample_data):
    response = client.post(
        "/samples/2/approve",
        json={"lab_tech_id": 1},
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Only pending samples can be approved"


def test_approve_unknown_sample_returns_404(client, sample_data):
    response = client.post(
        "/samples/999/approve",
        json={"lab_tech_id": 1},
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Sample not found"


def test_approve_with_unknown_lab_tech_returns_404(client, sample_data):
    response = client.post(
        "/samples/1/approve",
        json={"lab_tech_id": 999},
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Lab tech not found"


def test_failed_approve_does_not_change_sample(client, db, sample_data):
    # Granola (sample 2) starts as in_progress.
    response = client.post(
        "/samples/2/approve",
        json={"lab_tech_id": 1},
    )

    assert response.status_code == 400

    # Verify the sample was not changed.
    sample = (
        db.query(models.Sample)
        .filter(models.Sample.id == 2)
        .first()
    )

    assert sample is not None
    assert sample.test_status == "in_progress"

    # Verify no audit event was created.
    events = (
        db.query(models.AuditEvent)
        .filter(models.AuditEvent.sample_id == 2)
        .all()
    )

    assert len(events) == 0