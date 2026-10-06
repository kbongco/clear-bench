def test_create_sample_success(client, sample_data):

    payload = {
        "name": "Sample 001",
        "scientist_id": 1,
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
        "scientist_id": 1,
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
        "scientist_id": 1,
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


def test_create_sample_unknown_scientist(client):
    payload = {
        "name": "Sample 001",
        "scientist_id": 999999,
        "sample_type": "Stability",
        "test_start": "2026-10-01",
        "test_duration": "4-week",
        "totalBottles": 10,
        "temperature": ["25C"],
        "test_types": ["Appearance", "pH"],
        "notes": "Test sample",
    }

    response = client.post("/samples", json=payload)

    assert response.status_code == 404
    assert response.json()["detail"] == "Scientist does not exist"


def test_create_sample_empty_test_types(client, sample_data):

    payload = {
        "name": "Sample 001",
        "scientist_id": 1,
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
