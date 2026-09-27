def names(response):
    return [sample["name"] for sample in response.json()["samples"]]


def test_returns_all_samples(client, sample_data):
    response = client.get("/samples")

    assert response.status_code == 200
    assert response.json()["total"] == 3


def test_includes_scientist_name_and_team(client, sample_data):
    response = client.get("/samples")

    lotion = next(s for s in response.json()["samples"] if s["name"] == "Lotion")
    assert lotion["scientist"] == {"id": 2, "name": "Marcus", "department": "Cosmetics"}


def test_orders_by_due_date(client, sample_data):
    response = client.get("/samples")

    assert names(response) == ["Granola", "Lotion", "Yogurt"]


def test_filters_by_status(client, sample_data):
    response = client.get("/samples", params={"status": "pending"})

    assert response.json()["total"] == 2
    assert all(s["test_status"] == "pending" for s in response.json()["samples"])


def test_filters_by_department(client, sample_data):
    response = client.get("/samples", params={"department": "Cosmetics"})

    assert response.json()["total"] == 1
    assert names(response) == ["Lotion"]


def test_combines_filters(client, sample_data):
    response = client.get("/samples", params={"department": "Food Safety", "status": "pending"})

    assert names(response) == ["Yogurt"]


def test_ignores_empty_filters(client, sample_data):
    response = client.get("/samples", params={"status": "", "department": ""})

    assert response.json()["total"] == 3


def test_no_matches_returns_empty(client, sample_data):
    response = client.get("/samples", params={"department": "Astrophysics"})

    assert response.status_code == 200
    assert response.json() == {"total": 0, "samples": []}
