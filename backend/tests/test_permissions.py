import pytest

import models

# -------------------------------------------------------------------
# 1. Every write requires authentication.
# -------------------------------------------------------------------


@pytest.mark.parametrize(
    "method,path",
    [
        ("post", "/samples"),
        ("post", "/samples/1/approve"),
        ("post", "/samples/1/reject"),
        ("post", "/samples/1/results"),
    ],
)
def test_sample_writes_require_login(client, method, path):
    response = getattr(client, method)(path, json={})

    assert response.status_code == 401


# -------------------------------------------------------------------
# 2. Every read requires authentication.
# -------------------------------------------------------------------


@pytest.mark.parametrize(
    "path",
    [
        "/scientists",
        "/scientists/1/samples",
        "/samples",
        "/lab-techs",
        "/samples/results/1",
        "/samples/1",
        "/specs",
    ],
)
def test_sample_reads_require_login(client, path):
    response = client.get(path)

    assert response.status_code == 401


# -------------------------------------------------------------------
# 3. Root endpoint remains public.
# -------------------------------------------------------------------


def test_root_is_public(client):
    response = client.get("/")

    assert response.status_code == 200


# -------------------------------------------------------------------
# 4. Scientists cannot approve, reject, or enter results.
# -------------------------------------------------------------------


@pytest.mark.parametrize(
    "path",
    [
        "/samples/1/approve",
        "/samples/1/reject",
        "/samples/1/results",
    ],
)
def test_scientist_cannot_perform_lab_tech_actions(client, auth_data, path):
    login_response = client.post(
        "/auth/login",
        json={
            "email": "alice@test.com",
            "password": "alice-password",
        },
    )
    assert login_response.status_code == 200

    response = client.post(path, json={})

    assert response.status_code == 403


# -------------------------------------------------------------------
# 5. Lab techs cannot submit samples.
# -------------------------------------------------------------------


def test_labtech_cannot_submit_samples(client, auth_data):
    login_response = client.post(
        "/auth/login",
        json={
            "email": "sarah@test.com",
            "password": "sarah-password",
        },
    )
    assert login_response.status_code == 200

    response = client.post("/samples", json={})

    assert response.status_code == 403


# -------------------------------------------------------------------
# 6. A forbidden approval attempt changes nothing.
# -------------------------------------------------------------------


def test_forbidden_approval_does_not_change_sample_or_audit(client, db, auth_data):
    sample = db.query(models.Sample).filter_by(name="Yogurt").first()
    assert sample is not None

    original_status = sample.test_status
    original_event_count = db.query(models.AuditEvent).filter_by(sample_id=sample.id).count()

    login_response = client.post(
        "/auth/login",
        json={
            "email": "alice@test.com",
            "password": "alice-password",
        },
    )
    assert login_response.status_code == 200

    response = client.post(f"/samples/{sample.id}/approve", json={})

    assert response.status_code == 403

    db.refresh(sample)

    assert sample.test_status == original_status == "pending"

    new_event_count = db.query(models.AuditEvent).filter_by(sample_id=sample.id).count()
    assert new_event_count == original_event_count


# -------------------------------------------------------------------
# 7. Approve ignores a lab_tech_id supplied in the request body.
# -------------------------------------------------------------------


def test_approve_uses_logged_in_labtech_not_body_id(client, db, auth_data):
    sample = db.query(models.Sample).filter_by(name="Yogurt").first()
    assert sample is not None

    login_response = client.post(
        "/auth/login",
        json={
            "email": "sarah@test.com",
            "password": "sarah-password",
        },
    )
    assert login_response.status_code == 200

    response = client.post(
        f"/samples/{sample.id}/approve",
        json={"lab_tech_id": 999},
    )

    assert response.status_code == 200

    db.refresh(sample)

    assert sample.lab_tech_id == auth_data["sarah"].id


# -------------------------------------------------------------------
# 8. A new sample belongs to the logged-in scientist.
# -------------------------------------------------------------------


def test_new_sample_uses_logged_in_scientist_not_body_id(client, db, auth_data):
    alice_id = auth_data["alice"].id
    marcus_id = auth_data["marcus"].id

    login_response = client.post(
        "/auth/login",
        json={
            "email": "alice@test.com",
            "password": "alice-password",
        },
    )
    assert login_response.status_code == 200

    response = client.post(
        "/samples",
        json={
            "name": "Ownership Test Sample",
            "test_types": ["ph"],
            "scientist_id": marcus_id,
        },
    )

    assert response.status_code == 200

    sample = db.query(models.Sample).filter_by(name="Ownership Test Sample").first()
    assert sample is not None
    assert sample.scientist_id == alice_id
    assert sample.scientist_id != marcus_id
